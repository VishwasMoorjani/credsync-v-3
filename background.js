chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "SAVE_TO_SHEET") {
    fetch(message.url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(message.payload)
    })
      .then(res => res.text())
      .then(txt => sendResponse({ success: true, result: txt }))
      .catch(err => sendResponse({ success: false, error: err.toString() }));

    // Keeps the message channel open for async response
    return true;
  }
});
