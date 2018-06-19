# Wiktionary Lookup addon

Using this addon you can select a word or phrase on a webpage to view it's definition/meaning.You can eaither...

1) Double click a word
2) Click and drag to select a phrase

Or click on 

This addon is build according to <span title="WebExtensions are a way to write browser extensions: that is, programs installed inside a web browser that modify the behaviour of the browser or of web pages loaded by the browser. They are built on a set of cross-browser APIs, so WebExtensions written for Google Chrome or Opera will in most cases run in Firefox or Edge too.">WebExtensions specs.</span> [\(docs\)](https://developer.mozilla.org/en-US/Add-ons/WebExtensions)

## Installing the addon

There are a couple ways to try out the extension in this repository.

1. Open Firefox and load `about:debugging` in the URL bar. Click the
   [Load Temporary Add-on](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Temporary_Installation_in_Firefox)
   button and select the `manifest.json` file within the
   directory of the extension you'd like to install.
   Here is a [video](https://www.youtube.com/watch?v=cer9EUKegG4)
   that demonstrates how to do this.
2. Install the
   [web-ext](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Getting_started_with_web-ext)
   tool, change into the directory of the extension
   you'd like to install, and type `web-ext run`. This will launch Firefox and
   install the extension automatically. This tool gives you some
   additional development features such as
   [automatic reloading](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Getting_started_with_web-ext#Automatic_extension_reloading).

## Learn more

To learn more about developing WebExtensions, see the
[WebExtensions documentation on MDN](https://developer.mozilla.org/en-US/Add-ons/WebExtensions)
for getting started guides, tutorials, and full API reference docs.

## Problems?

If you find a problem, please [file a bug](https://github.com/rammmukul/Wiktionary-Lookup-addon/issues/new).

## Contributing

We welcome contributions, whether they are whole new features or
bug fixes.

For an index of some example addons, see the ["Example extensions" page on MDN](https://developer.mozilla.org/Add-ons/WebExtensions/Examples).

[Anatomy of a WebExtension](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Anatomy_of_a_WebExtension)
