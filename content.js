window.addEventListener('mouseup', wordSelected)

let selection = window.getSelection()

function wordSelected() {
  selection = window.getSelection()
  let selectedText = selection.toString().trim()
  console.log(selectedText, selection)
  if (selectedText.length > 0) {
    let message = {
      type: 'wordSelection',
      text: selectedText
    }
    browser.runtime.sendMessage(message)
  }
}

browser.runtime.onMessage.addListener(bubble)

function bubble(data) {
  console.log('bubble', data)
  if (data.type !== 'definition') return
  let def = document.createElement('h1')
  def.style = 'background: cyan'
  console.log(data)
  def.innerHTML = data.definition
  selection.anchorNode.parentNode.appendChild(def)
}
