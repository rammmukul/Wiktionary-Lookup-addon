console.log('background running')

browser.runtime.onMessage.addListener(receiver)

window.word = "coding train"

function receiver(request, sender, sendResponse) {
  console.log(request)
  word = request.text
}
