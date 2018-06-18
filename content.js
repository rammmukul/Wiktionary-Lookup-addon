window.addEventListener('dblclick', wordSelected)
window.addEventListener('mouseup', popPopup)
let scrollBarWidth = window.innerWidth - document.getElementsByTagName('html')[0].clientWidth

let defStyle = {
  background: '#f4ecd8',
  color: '#502020',
  padding: '.5em',
  fontSize: '1rem',
  position: 'absolute',
  width: '30em',
  boxShadow: '1px 1px 5px black',
  zIndex: '9999',
  overflowWrap: 'break-word'
}

let wordStyle = {
  fontSize: '1.2rem',
  padding: '.2rem',
  fontWeight: 'bold'
}

let moreStyle = {
  padding: '.2em',
  cssFloat: 'right'
}

let selection = window.getSelection()
let popupHost = document.createElement('div')
let loading = document.createElement('div')
loading.innerText = 'Loading...'
loading.style.backgroundColor = '#f4ecd8'
let def = document.createElement('div')
Object.assign(def.style, defStyle)
let word = document.createElement('div')
Object.assign(word.style, wordStyle)
let definition = document.createElement('div')
let more = document.createElement('div')
Object.assign(more.style, moreStyle)
let anchor = document.createElement('a')
anchor.setAttribute('target', '_blank')
more.appendChild(anchor)
document.body.appendChild(popupHost)
popupHost.addEventListener('mouseup', e => e.stopPropagation())

function wordSelected (event) {
  selection = window.getSelection()
  let selectedText = selection.toString().trim()
  if (selectedText.length > 0) {
    let message = {
      type: 'wordSelection',
      text: selectedText,
      from: event.target === definition ? 'popup' : 'window'
    }
    browser.runtime.sendMessage(message)
    word.remove()
    definition.remove()
    more.remove()
    def.appendChild(loading)
    popupHost.appendChild(def)
    if (event.target !== definition) {
      let range = selection.getRangeAt(0)
      let rect = range.getBoundingClientRect()
      def.style.left = 'calc(' + (rect.left + window.scrollX + rect.width / 2) + 'px - 15em)'
      def.style.top = 'calc(' + (rect.top + rect.height + window.scrollY) + 'px + .5em)'
      bound(def)
    }
  }
}

function popPopup (event) {
  selection = window.getSelection()
  let selectedText = selection.toString().trim()
  selectedText = selectedText.replace(/\s+/g, '_')
  if (selectedText.length === 0) {
    def.remove()
  } else {
    wordSelected(event)
  }
}

browser.runtime.onMessage.addListener(bubble)

function bubble (data) {
  if (data.type !== 'definition') return
  word.innerText = data.word
  definition.innerHTML = data.definition
  anchor.innerText = 'more >>>'
  anchor.setAttribute('href', data.url)
  loading.remove()
  def.appendChild(word)
  def.appendChild(definition)
  def.appendChild(more)
  popupHost.appendChild(def)
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
  if (rect.right > window.innerWidth) {
    element.style.left = (window.innerWidth - rect.width - bodyRect.left - scrollBarWidth) + 'px'
  }
  if (rect.bottom > window.innerHeight) {
    element.style.top = (window.innerHeight - rect.height - bodyRect.top - scrollBarWidth) + 'px'
  }
}
