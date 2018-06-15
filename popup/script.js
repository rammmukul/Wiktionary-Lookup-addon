
init()
let scheduled

async function init () {
  let bgpage = await browser.runtime.getBackgroundPage()
  let word = bgpage.word
  let defiintion = bgpage.definition
  console.log('bgpage', bgpage)

  document.getElementById('definition').innerHTML = defiintion || 'Definition'
  document.getElementById('word').innerHTML = word || 'Word'
  document.getElementById('submit').onclick = query
  document.getElementById('input').oninput = schedule
  window.onload = function() {
    document.getElementById('input').focus()
  }
}

function query () {
  let word = document.getElementById('input').value
  word = word.replace(/\s+/g, '_')
  let url = `https://en.wiktionary.org/api/rest_v1/page/definition/${word}`
  fetch(url, {
    headers: new Headers({
      'Api-User-Agent': 'notarama'
    })
  })
    .then(data => data.json())
    .then(data => {
      let definition = JSON.stringify(data.en ? data.en[0].definitions[0].definition : 'No definition found')
      definition = definition.replace(/href=\\"\/wiki\//g, 'target="_blank" href=https://en.wiktionary.org/wiki/')
      definition = definition.replace(/\\"/g, '')
      definition = definition.replace(/\\n/g, '<br>')
      definition = definition.replace(/^"/, '')
      definition = definition.replace(/"$/, '<br>')
      document.getElementById('definition').innerHTML = definition
      document.getElementById('word').innerHTML = word.replace(/_/g, ' ')
      console.log(word, definition)
    },
    err => console.log(err))
}

function schedule () {
  clearTimeout(schedule)
  scheduled = setTimeout(() => query(), 500)
}
