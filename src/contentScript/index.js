/**
 * Fired when a message is sent from either an extension process or a content script.
 */
chrome.runtime.onMessage.addListener((message, sender, response) => {
  const text = window.getSelection().toString();
  response(text);
});
