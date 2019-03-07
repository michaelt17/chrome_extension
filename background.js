// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';



// let config = {
//   apiKey: "AIzaSyBjJGzI3D2MCHe9HLWwc_bgFCsiHyFEw7s",
//   databaseURL: "https://chromeextension-4f2a6.firebaseio.com/",
// };
// const app = firebase.initializeApp(config);
// const appDb = app.database();
// let appDbRef = appDb.ref("searches");
//
// let retVal = null;
//
// appDbRef.on("value", function(snapshot) {
//   retVal = snapshot.val();
//   console.log(snapshot.val());
// });

// taken from https://gist.github.com/samjarman/a39e344539a521b428317ff5d2f9cf25
// chrome.tabs.query({active: true, currentWindow: true}, function(tabs) { // Fetch the current tab
//   chrome.extension.getBackgroundPage().console.log('sending data');
//   chrome.tabs.sendMessage(tabs[0].id, {message: "preach", preachText: retVal});
//   chrome.extension.getBackgroundPage().console.log('data sent');
// });


// chrome.runtime.onMessage.addListener(
//   function(request, sender, sendResponse) {
//     console.log(request);
// });

chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({color: '#3aa757'}, function() {
    console.log("The color is green.");
  });
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
      chrome.declarativeContent.onPageChanged.addRules([{
        conditions: [new chrome.declarativeContent.PageStateMatcher({
          pageUrl: {hostEquals: 'advance.lexis.com'},
        })
        ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
      }]);
    });
});
