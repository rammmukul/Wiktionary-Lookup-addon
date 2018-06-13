window.addEventListener('mouseup', wordSelected)

function wordSelected() {
  let selection = window.getSelection()
  let selectedText = selection.toString().trim()
  console.log(selectedText, selection)
  if (selectedText.length > 0) {
    let message = {
      text: selectedText
    }
    browser.runtime.sendMessage(message)

    let def = document.createElement('h1')
    def.style = 'background: cyan'

    let url = `https://en.wiktionary.org/api/rest_v1/page/definition/selection`
    url = `http://www.example.com`
    fetch(url, {
      mode: 'cors',
      headers: new Headers({
        'Api-User-Agent': 'notarama'
      })
    }).then(data => {
      console.log(data)
      def.innerHTML = data.en[0].definitions[0].definition
      document.body.appendChild(def)
    },
    err => console.log(err))
    def.innerHTML = 'Loading...'
    document.body.appendChild(def)
  }
}
