let config = {
  apiKey: "AIzaSyBjJGzI3D2MCHe9HLWwc_bgFCsiHyFEw7s",
  databaseURL: "https://chromeextension-4f2a6.firebaseio.com/",
};
const app = firebase.initializeApp(config);
const appDb = app.database();
let appDbRef = appDb.ref("searches");

appDbRef.on("value", function(snapshot) {
  chrome.extension.getBackgroundPage().console.log(snapshot.val());
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
  let sheetsURL = "http://gsx2json.com/api?id=1oT9AP2SJ82wvlO9R_WKP6j3ywdXUMhdlbt4_KvX7_gc&sheet=1"
  let rows = [];

  // async function logFetch(url) {
  //   try {
  //     const response = await fetch(url);
  //     // chrome.extension.getBackgroundPage().console.log(await response.json());
  //     return Promise.resolve(response);
  //
  //     // chrome.extension.getBackgroundPage().console.log(newData);
  //   }
  //   catch (err) {
  //     chrome.extension.getBackgroundPage().console.log('fetch failed', err);
  //   }
  // }

  // let newData = logFetch(sheetsURL);
  //
  // chrome.extension.getBackgroundPage().console.log(newData);


  // function fetchJSON(url) {
  //   fetch(url).then(response => {
  //     return response.json();
  //   }).then(data => {
  //     // Work with JSON data here
  //     chrome.extension.getBackgroundPage().console.log('data from rows: ');
  //     chrome.extension.getBackgroundPage().console.log(data['rows']);
  //     return data['rows'];
  //   }).catch(err => {
  //     console.log(err);
  //     // Do something for an error here
  //   });
  // }
  //
  // rows = fetchJSON(sheetsURL);
  // // rows.then(alert);
  //
  // chrome.extension.getBackgroundPage().console.log(rows);
  // chrome.extension.getBackgroundPage().console.log(':)');
  //
  // var holderVal = 19;

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



    // bigH1.appendChild(button);
    // chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    //   chrome.tabs.executeScript(
    //       tabs[0].id,
    //       {code: 'document.body.style.backgroundColor = "' + color + '";'});
    // });
  };
