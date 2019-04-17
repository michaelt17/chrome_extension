let config = {
  apiKey: "AIzaSyBjJGzI3D2MCHe9HLWwc_bgFCsiHyFEw7s",
  databaseURL: "https://chromeextension-4f2a6.firebaseio.com/",
};
const app = firebase.initializeApp(config);
const appDb = app.database();
let appDbRefSearches = appDb.ref("searches");
let appDbRefMappings = appDb.ref("mappings");

// printing tab url
chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {

});

let retVal = null;

let groupVal = '';


chrome.storage.sync.get(['group'], function(result) {
      // console.log(result);
      // chrome.extension.getBackgroundPage().console.log('Value currently is ' + result['group']);
      groupVal = result['group']
  });



appDbRefSearches.on("value", function(snapshot) {
  retVal = snapshot.val();
  chrome.extension.getBackgroundPage().console.log(snapshot.val());
});

appDbRefMappings.on("value", function(snapshot) {
  retValMappings = snapshot.val();
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

let addButtons = document.getElementById('addButtons');
addButtons.style.backgroundColor = "green";

//let captureSearch = document.getElementById('captureSearch');

let buttonsAdded = false;
let inputLog = false;

let rows = [];

// captureSearch.onclick = function(element) {
// 	//chrome.extension.getBackgroundPage().console.log('input');
//   	//const infoDisplay = getElementById('searchTerms');
//   	//chrome.extension.getBackgroundPage().console.log('infoDisplay');
//   	};

addButtons.onclick = function(element) {
  chrome.extension.getBackgroundPage().console.log('groupVal is: ' + groupVal);

  if (!buttonsAdded){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      let onAdvanceLexis = false;

      let currentURL = tabs[0].url;
      let decidingChar =  currentURL[8];

      // chrome.extension.getBackgroundPage().console.log(currentURL);
      // chrome.extension.getBackgroundPage().console.log(decidingChar);

      if (decidingChar == 'a'){
        onAdvanceLexis = true;
      }

      // chrome.tabs.executeScript(
      //     tabs[0].id,
      //     {file: 'addButtons.js'});

      var passingDataSearches = retVal;
      var passingDataMappings = retValMappings;
      // chrome.extension.getBackgroundPage().console.log(passingData);
      if (onAdvanceLexis){
        chrome.tabs.executeScript(tabs[0].id,
          {code: 'let groupVal = ' + JSON.stringify(groupVal) +';'
               + 'let passingDataSearches = ' + JSON.stringify(passingDataSearches) +';'
               + 'let passingDataMappings = ' + JSON.stringify(passingDataMappings) +';'
               + 'let config = ' + JSON.stringify(config) +';'}, function() {
            chrome.tabs.executeScript(tabs[0].id, {file: 'addButtons.js'});
        });
      }
      else{
        chrome.tabs.executeScript(tabs[0].id,
          {code: 'let groupVal = ' + JSON.stringify(groupVal) +';'
               + 'let passingDataSearches = ' + JSON.stringify(passingDataSearches) +';'
               + 'let passingDataMappings = ' + JSON.stringify(passingDataMappings) +';'
               + 'let config = ' + JSON.stringify(config) +';'}, function() {
            chrome.tabs.executeScript(tabs[0].id, {file: 'addWestLawButtons.js'});
        });
      }


    });
    buttonsAdded = true;
  };
  // if (!inputLog){
  //   	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  //     	// chrome.tabs.executeScript(
  //     	//     tabs[0].id,
  //     	//     code: 'var rowsScore = ' + holderVal,
  //     	chrome.tabs.executeScript(
  //         	tabs[0].id,
  //         	{file: 'content.js'});
  //   	});
  //   	inputLog = true;
  // 	};

};
