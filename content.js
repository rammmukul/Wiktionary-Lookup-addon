window.addEventListener('mouseup', wordSelected)

let selection = window.getSelection()
let popupHost = document.createElement('div')
document.body.appendChild(popupHost)

function wordSelected () {
  selection = window.getSelection()
  let selectedText = selection.toString().trim()
  selectedText = selectedText.replace(/\s+/g, '_')
  console.log(selectedText, selection)
  if (selectedText.length > 0) {
    let message = {
      type: 'wordSelection',
      text: selectedText
    }
    browser.runtime.sendMessage(message)
  } else {
    popupHost.innerHTML = ''
  }
}

browser.runtime.onMessage.addListener(bubble)

function bubble (data) {
  console.log('bubble', data)
  if (data.type !== 'definition') return
  let def = document.createElement('div')
  let more = document.createElement('div')
  let anchor = document.createElement('a')
  more.style.padding = '.2em'
  more.style.cssFloat = 'right'
  more.appendChild(anchor)
  anchor.innerText = 'more>>>'
  def.innerHTML = data.definition
  anchor.setAttribute('href', data.url)
  anchor.setAttribute('target', '_blank')
  let range = selection.getRangeAt(0)
  let rect = range.getBoundingClientRect()

  def.style.background = '#f4ecd8'
  def.style.padding = '.5em'
  def.style.fontSize = '1em'
  def.style.position = 'absolute'
  def.style.width = '30em'
  def.style.left = 'calc(' + (rect.left + window.scrollX + rect.width / 2) + 'px - 15em)'
  def.style.top = 'calc(' + (rect.top + rect.height + window.scrollY) + 'px + .5em)'
  def.style.boxShadow = '1px 1px 5px black'
  def.style.zIndex = '9999'

  def.appendChild(more)
  popupHost.appendChild(def)
}
