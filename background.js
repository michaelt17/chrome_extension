// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

// let url = "http://gsx2json.com/api?id=1oT9AP2SJ82wvlO9R_WKP6j3ywdXUMhdlbt4_KvX7_gc&sheet=1"
//
// let rows = [];
//
// fetch(url).then(response => {
//   return response.json();
// }).then(data => {
//   // Work with JSON data here
//   // console.log(data['rows']);
//   rows = data['rows'];
// }).catch(err => {
//   console.log(err);
//   // Do something for an error here
// });

// let config = {
//   apiKey: "AIzaSyBjJGzI3D2MCHe9HLWwc_bgFCsiHyFEw7s",
//   databaseURL: "https://chromeextension-4f2a6.firebaseio.com/",
// };
// const app = firebase.initializeApp(config);
// const appDb = app.database();


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

// chrome.runtime.onMessage.addListener(
//     function(request, sender, sendResponse){
//        console.log(request.package);
//     }
// );
