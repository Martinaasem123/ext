function changeBackgroundColor() {
    console.log('Content script executed');
    document.body.style.backgroundColor = 'lightblue';
  }
  
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === 'changeBackgroundColor') {
      changeBackgroundColor();
    }
  });
  
  