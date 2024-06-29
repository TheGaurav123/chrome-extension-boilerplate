import { useState } from "react"

import { CHAT_TYPES } from "~constants"

import "~style.css"

interface Props {
  insertChat: (message: string) => void
  setIsModalActive: (state: boolean) => void
}

interface ChatStructure {
  id: number
  from: string
  message: string
}

export default function PromptModal({ insertChat, setIsModalActive }: Props) {
  const [prompt, setPrompt] = useState<string>("")
  const [chat, setChat] = useState<ChatStructure[]>([])
  const [chatError, setChatError] = useState<string>("")

  const handleChatSubmit = (e: any) => {
    e.preventDefault()
    if (prompt) {
      const userPayload = {
        id: 1, //here we can use any third-party library to generate uniqueId
        from: CHAT_TYPES.USER,
        message: prompt
      }

      const dummyResponsePayload = {
        id: 2,
        from: CHAT_TYPES.BOT,
        message:
          "Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask."
      }

      setChat([...chat, userPayload, dummyResponsePayload])
      setPrompt("")
    }
  }

  const handleInsert = () => {
    const replyByBot = chat[chat.length - 1].message

    if (replyByBot) {
      insertChat(replyByBot)
      setIsModalActive(false)
    }
  }

  return (
    <div className="fixed flex flex-col gap-8 justify-center items-center h-[100vh] w-[100vw] bg-[#00000078]">
      <div className="relative flex flex-col gap-4 border w-1/3 rounded-lg bg-white py-4 px-5">
        {Array.isArray(chat) && chat.length ? (
          <section className="flex flex-col gap-6 overflow-auto h-[80%] py-5">
            {chat.map((msg) => {
              if (msg.from === CHAT_TYPES.BOT) {
                return (
                  <div key={msg.id} className="flex">
                    <span className="bg-[#DBEAFE] px-4 py-2 text-[#666D80] rounded-lg text-2xl">
                      {msg.message}
                    </span>
                  </div>
                )
              } else {
                return (
                  <div key={msg.id} className="text-end flex justify-end">
                    <span className="bg-[#DFE1E7] rounded-lg px-4 py-2 text-[#666D80] text-2xl">
                      {msg.message}
                    </span>
                  </div>
                )
              }
            })}
          </section>
        ) : (
          <></>
        )}

        <form id="generatePrompt" className="flex flex-col gap-5">
          <input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            required
            type="text"
            placeholder="Your prompt"
            className="border rounded shadow px-4 outline-none py-2 w-full text-xl"
          />
          {chatError ? (
            <span className="text-md text-red-700">{chatError}</span>
          ) : (
            <></>
          )}
          <div className="flex justify-end gap-4">
            {Array.isArray(chat) && chat.length ? (
              <>
                <button
                  type="button"
                  onClick={handleInsert}
                  className="flex items-center justify-center gap-3 bg-transparent text-[#666D80] px-4 py-2 text-xl rounded-lg border border-[#666D80]">
                  <img
                    className="w-4"
                    src={require("../../assets/DownArrow.png")}
                    alt="insert"
                  />
                  <span className="mb-1">Insert</span>
                </button>
                <button
                  type="submit"
                  form="generatePrompt"
                  className="flex items-center justify-center gap-3 bg-[#3B82F6] hover:bg-blue-700 text-white px-4 py-2 text-xl rounded-lg">
                  <img
                    className="w-4"
                    src={require("../../assets/Repeat.png")}
                    alt="regenerate"
                  />
                  <span className="mb-1">Regenerate</span>
                </button>
              </>
            ) : (
              <button
                onClick={(e) => handleChatSubmit(e)}
                type="submit"
                form="generatePrompt"
                className="flex items-center justify-center gap-3 bg-[#3B82F6] hover:bg-blue-700 text-white px-4 py-2 text-xl rounded-lg">
                <img
                  className="w-4"
                  src={require("../../assets/RightArrow.png")}
                  alt="generate"
                />
                <span className="mb-1">Generate</span>
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
