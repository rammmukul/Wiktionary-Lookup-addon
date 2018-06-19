browser.runtime.onMessage.addListener(receiver)
let definition

function onError(error) {
  console.error(`Error: `, error)
}

window.word = "word"

async function receiver (request) {
  if (request.type !== 'wordSelection') return
  word = request.text
  let from = request.from

  let url = `https://en.wiktionary.org/api/rest_v1/page/definition/${word.toLowerCase().replace(/\s+/g, '_')}`
  let data = await fetch(url, {
    headers: new Headers({
      'Api-User-Agent': 'notarama'
    })
  })
  data = await data.json()
  definition = JSON.stringify(data.en ? data.en[0].definitions[0].definition : 'No definition found')
  definition = definition.replace(/<.*?>/g, '')
  definition = definition.replace(/\\"/g, '')
  definition = definition.replace(/^"/, '')
  definition = definition.replace(/"$/, '')
  window.word = word
  window.definition = definition
  return {
    type: 'definition',
    word,
    definition: definition,
    url: `https://en.wiktionary.org/wiki/${word.toLowerCase().replace(/\s+/g, '_')}`,
    from
  }
}
