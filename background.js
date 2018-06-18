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
  let from = request.from

  let url = `https://en.wiktionary.org/api/rest_v1/page/definition/${word.toLowerCase().replace(/\s+/g, '_')}`
  fetch(url, {
    headers: new Headers({
      'Api-User-Agent': 'notarama'
    })
  })
    .then(data => data.json())
    .then(data => {
      console.log('<>', JSON.stringify(data, null, 2))
      definition = JSON.stringify(data.en ? data.en[0].definitions[0].definition : 'No definition found')
      definition = definition.replace(/<a .*?>/g, '')
      definition = definition.replace(/<\/a>/g, '')
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
          word,
          definition: definition,
          url: `https://en.wiktionary.org/wiki/${word.toLowerCase().replace(/\s+/g, '_')}`,
          from
        }
      ).catch(onError)
    },
    err => console.log(err))
}
