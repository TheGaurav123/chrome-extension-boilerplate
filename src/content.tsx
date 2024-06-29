import cssText from "data-text:~style.css"
import type { PlasmoCSConfig } from "plasmo"

import { ChatButton } from "~features/ChatButton"

export const config: PlasmoCSConfig = {
  matches: ["https://*.linkedin.com/*"]
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

const PlasmoOverlay = () => {
  return <ChatButton />
}

export default PlasmoOverlay
