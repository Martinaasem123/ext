document.addEventListener('DOMContentLoaded', function () {
    var button = document.getElementById('toggleButton');
    var colorChangeEnabled = false;

    button.addEventListener('click', function () {
      colorChangeEnabled = !colorChangeEnabled;

      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        if (chrome.runtime.lastError) {
          console.error('Error querying tabs:', chrome.runtime.lastError);
          return;
        }

        if (tabs.length === 0) {
          console.error('No active tabs found.');
          return;
        }

        var tab = tabs[0];
        var tabId = tab.id;

        if (typeof tabId === 'undefined') {
          console.error('Tab ID is undefined.');
          return;
        }

        executeScript(tabId, colorChangeEnabled);
      });
    });

    function executeScript(tabId, isEnabled) {
      var scriptToExecute = isEnabled ? enableBackgroundColorChange : disableBackgroundColorChange;

      if (tabId) {
        chrome.scripting.executeScript(
          {
            target: { tabId: tabId },
            function: scriptToExecute,
          },
          function (result) {
            if (chrome.runtime.lastError) {
              console.error('Error executing script:', chrome.runtime.lastError);
            } else {
              console.log('Script executed successfully:', result);
            }
          }
        );
      } else {
        console.error('Invalid tab ID.');
      }
    }

    function enableBackgroundColorChange() {
      document.body.style.backgroundColor = 'lightblue';
    }

    function disableBackgroundColorChange() {
      document.body.style.backgroundColor = '';
    }
});
