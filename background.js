console.log('background running')

browser.runtime.onMessage.addListener(receiver)
let definition

function onError(error) {
  console.error(`Error: ${error}`)
}

window.word = "word"

function receiver (request, sender, sendResponse) {
  if (request.type !== 'wordSelection') return
  console.log(request)
  word = request.text
  word = word.toLowerCase()

  let url = `https://en.wiktionary.org/api/rest_v1/page/definition/${word}`
  fetch(url, {
    headers: new Headers({
      'Api-User-Agent': 'notarama'
    })
  })
    .then(data => data.json())
    .then(data => {
      console.log('<>', JSON.stringify(data, null, 2))
      definition = JSON.stringify(data.en ? data.en[0].definitions[0].definition : 'No definition found')
      definition = definition.replace(/href=\\"\/wiki\//g, 'target="_blank" href=https://en.wiktionary.org/wiki/')
      definition = definition.replace(/\\"/g, '')
      definition = definition.replace(/\\n/g, '<br>')
      definition = definition.replace(/^"/, '')
      definition = definition.replace(/"$/, '<br>')
      window.word = word
      window.definition = definition

      browser.tabs.sendMessage(
        sender.tab.id,
        {
          type: 'definition',
          definition: definition,
          url: `https://en.wiktionary.org/wiki/${word}`
        }
      ).catch(onError)
    },
    err => console.log(err))
}
