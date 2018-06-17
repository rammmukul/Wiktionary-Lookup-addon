window.addEventListener('dblclick', wordSelected)
window.addEventListener('mouseup', popPopup)

let selection = window.getSelection()
let popupHost = document.createElement('div')
let def = document.createElement('div')
def.style.background = '#f4ecd8'
def.style.color = '#502020'
def.style.padding = '.5em'
def.style.fontSize = '1rem'
def.style.position = 'absolute'
def.style.width = '30em'
def.style.boxShadow = '1px 1px 5px black'
def.style.zIndex = '9999'
def.style.overflowWrap = 'break-word'
document.body.appendChild(popupHost)
popupHost.addEventListener('mouseup', e => e.stopPropagation())

function wordSelected (event) {
  selection = window.getSelection()
  let selectedText = selection.toString().trim()
  selectedText = selectedText.replace(/\s+/g, '_')
  if (selectedText.length > 0) {
    let message = {
      type: 'wordSelection',
      text: selectedText,
      from: event.target === def ? 'popup' : 'window'
    }
    browser.runtime.sendMessage(message)
    def.innerHTML = '<div style="background-color: #f4ecd8;">Loading...</div>'
    popupHost.appendChild(def)
    if (event.target !== def) {
      let range = selection.getRangeAt(0)
      let rect = range.getBoundingClientRect()
      def.style.left = 'calc(' + (rect.left + window.scrollX + rect.width / 2) + 'px - 15em)'
      def.style.top = 'calc(' + (rect.top + rect.height + window.scrollY) + 'px + .5em)'
      bound(def)
    }
  }
}

function popPopup () {
  selection = window.getSelection()
  let selectedText = selection.toString().trim()
  selectedText = selectedText.replace(/\s+/g, '_')
  if (selectedText.length === 0) {
    popupHost.innerHTML = ''
  }
}

browser.runtime.onMessage.addListener(bubble)

function bubble (data) {
  if (data.type !== 'definition') return
  let word = document.createElement('div')
  word.style.fontSize = '1.2rem'
  word.style.padding = '.2rem'
  word.style.fontWeight = 'bold'
  word.innerText = data.word
  let definition = document.createElement('div')
  definition.innerHTML = data.definition
  let more = document.createElement('div')
  let anchor = document.createElement('a')
  more.style.padding = '.2em'
  more.style.cssFloat = 'right'
  more.appendChild(anchor)
  anchor.innerText = 'more>>>'
  anchor.setAttribute('href', data.url)
  anchor.setAttribute('target', '_blank')
  def.innerHTML = ''
  def.appendChild(word)
  def.appendChild(definition)

  def.appendChild(more)
  popupHost.appendChild(def)
  console.log(def.getBoundingClientRect())
  if (data.from === 'window') {
    bound(def)
  }
}

function bound (element) {
  let rect = element.getBoundingClientRect()
  let bodyRect = document.body.getBoundingClientRect()
  if (rect.left < 0) {
    element.style.left = -bodyRect.left + 'px'
  }
  if (rect.right > bodyRect.right) {
    element.style.left = (bodyRect.width - rect.width) + 'px'
  }
  if (rect.bottom > bodyRect.bottom) {
    element.style.top = (bodyRect.height - rect.height) + 'px'
  }
}
