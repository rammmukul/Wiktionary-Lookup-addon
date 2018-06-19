init()
let scheduled

async function init () {
  let bgpage = await browser.runtime.getBackgroundPage()
  let word = bgpage.word
  let defiintion = bgpage.definition

  document.getElementById('definition').innerHTML = defiintion || 'Definition'
  document.getElementById('word').innerHTML = word || 'Word'
  document.getElementById('submit').onclick = query
  document.getElementById('input').oninput = schedule
  window.onload = function () {
    document.getElementById('input').focus()
  }
  window.addEventListener('mouseup', () => {
    document.getElementById('input').value = getSelectedWord()
    schedule()
  })
}

async function query () {
  let word = document.getElementById('input').value
  let message = {
    type: 'wordSelection',
    text: word
  }
  let def = await browser.runtime.sendMessage(message)
  document.getElementById('definition').innerHTML = def.definition
  document.getElementById('word').innerText = def.word
}

function schedule () {
  clearTimeout(schedule)
  scheduled = setTimeout(() => query(), 500)
}

function getSelectedWord () {
  return window.getSelection().toString().trim()
}
