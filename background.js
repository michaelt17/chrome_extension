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

// practice get request for localhost

// let xhr = new XMLHttpRequest();
//
// xhr.open("GET", chrome.extension.getURL('https://jsonplaceholder.typicode.com/todos/1'), true);
// xhr.send();
//
// chrome.extension.getBackgroundPage().console.log(typeof xhr);
// chrome.extension.getBackgroundPage().console.log(Object.values(xhr));
// chrome.extension.getBackgroundPage().console.log(String(xhr.responseText));
// chrome.extension.getBackgroundPage().console.log(xhr.responseText);
// chrome.extension.getBackgroundPage().console.log( String(xhr.response) );
// chrome.extension.getBackgroundPage().console.log(xhr.response);



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
      },
      {
        conditions: [new chrome.declarativeContent.PageStateMatcher({
          pageUrl: {hostEquals: '1.next.westlaw.com'},
        })
        ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
      }]);
    });
});
