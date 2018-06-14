console.log('background running')

browser.runtime.onMessage.addListener(receiver)

function onError(error) {
  console.error(`Error: ${error}`)
}

window.word = "coding train"

function receiver (request, sender, sendResponse) {
  if (request.type !== 'wordSelection') return
  console.log(request)
  word = request.text

  let url = `https://en.wiktionary.org/api/rest_v1/page/definition/${word}`
  fetch(url, {
    headers: new Headers({
      'Api-User-Agent': 'notarama'
    })
  })
    .then(data => data.json())
    .then(data => {
      console.log('<>', JSON.stringify(data, null, 2))

      browser.tabs.sendMessage(
        sender.tab.id,
        {
          type: 'definition',
          definition: JSON.stringify(data.en[0].definitions[0].definition)
        }
      ).then(response => {
        console.log("Message from the content script:")
        console.log(response.response)
      }).catch(onError)
    },
    err => console.log(err))
}
