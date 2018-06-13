let bgpage = browser.runtime.getBackgroundPage()
let word = bgpage.word.trim()

let url = `https://en.wiktionary.org/api/rest_v1/page/definition/${word}`
console.log(word)
fetch(url).then(data => {
  console.log(data)
  let def = browser.document.createElement('p')
  def.innerHTML = data.en[0].definitions[0].definition
  browser.document.body.appendChild(def)
})
