let config = {
  apiKey: "AIzaSyBjJGzI3D2MCHe9HLWwc_bgFCsiHyFEw7s",
  databaseURL: "https://chromeextension-4f2a6.firebaseio.com/",
};
const app = firebase.initializeApp(config);
const appDb = app.database();
let appDbRef = appDb.ref("searches");

let retVal = null;

appDbRef.on("value", function(snapshot) {
  retVal = snapshot.val();
  chrome.extension.getBackgroundPage().console.log(snapshot.val());
});

// taken from https://gist.github.com/samjarman/a39e344539a521b428317ff5d2f9cf25
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) { // Fetch the current tab
  chrome.extension.getBackgroundPage().console.log('sending data');
  chrome.tabs.sendMessage(tabs[0].id, {message: "preach", preachText: retVal});
  chrome.extension.getBackgroundPage().console.log('data sent');
});

chrome.extension.getBackgroundPage().console.log('testing appDb');
chrome.extension.getBackgroundPage().console.log(appDb);

function initApp() {
  // Listen for auth state changes.
  firebase.auth().onAuthStateChanged(function(user) {
    chrome.extension.getBackgroundPage().console.log('User state change detected from the Background script of the Chrome Extension:', user);
  });
}

window.onload = function() {
  initApp();
};

let changeColor = document.getElementById('changeColor');
let addButtons = document.getElementById('addButtons');

let buttonsAdded = false;

let rows = [];

chrome.storage.sync.get('color', function(data) {
  changeColor.style.backgroundColor = data.color;
  changeColor.setAttribute('value', data.color);
});

changeColor.onclick = function(element) {
    let color = element.target.value;
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.executeScript(
          tabs[0].id,
          {code: 'document.body.style.backgroundColor = "' + color + '";'});
    });
  };

addButtons.onclick = function(element) {

  if (!buttonsAdded){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      // chrome.tabs.executeScript(
      //     tabs[0].id,
      //     code: 'var rowsScore = ' + holderVal,
      chrome.tabs.executeScript(
          tabs[0].id,
          {file: 'addButtons.js'});
    });
    buttonsAdded = true;
  }
  };
