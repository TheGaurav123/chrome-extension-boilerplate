import { useEffect, useState } from "react"

import { PromptModal } from "~components"

import "~style.css"

export const ChatButton = () => {
  const [isModalActive, setIsModalActive] = useState<boolean>(false)
  const [linkedinMsgContainer, setLinkedinMsgContainer] = useState(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const loadState = () => {
    const linkedinMsgContainer = document.querySelector(
      'div[aria-label="Write a message…"]'
    )

    if (linkedinMsgContainer) {
      setLinkedinMsgContainer(linkedinMsgContainer)
      linkedinMsgContainer.addEventListener("focus", () => {
        const logo = document.createElement("img")
        logo.src = require("../../assets/chatIcon.png")
        logo.className = "absolute right-0 bottom-0 cursor-pointer"
        logo.id = "chatgpt-writer "
        logo.onclick = () => setIsModalActive(true)
        linkedinMsgContainer.appendChild(logo)
      })
      linkedinMsgContainer.addEventListener("blur", () => {
        linkedinMsgContainer.removeChild(linkedinMsgContainer.childNodes[1])
      })
    }
  }

  const handleInsertChat = (message: string) => {
    if (message) {
      linkedinMsgContainer.querySelector("p").innerHTML = message
    }
  }

  useEffect(() => {
    window.addEventListener("mousedown", async () => {
      setIsLoading(false)
    })

    return window.removeEventListener("mousedown", () => {})
  }, [])

  return (
    <>
      <button
        disabled={isLoading}
        onClick={() => loadState()}
        className={`flex items-center bg-white px-2 py-1.5 rounded-lg gap-2 shadow-lg ${linkedinMsgContainer && "hidden"}`}>
        <img
          src={require("../../assets/icon.png")}
          alt="ChatGPT-Writer"
          className="w-12"
        />
        <span className="font-bold">
          {isLoading ? "Loading" : "Open a chat and click here"}
        </span>
      </button>
      {isModalActive && (
        <PromptModal
          setIsModalActive={setIsModalActive}
          insertChat={handleInsertChat}
        />
      )}
    </>
  )
}
