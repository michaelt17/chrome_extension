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


  function fetchJSON(url) {
    fetch(url).then(response => {
      return response.json();
    }).then(data => {
      // Work with JSON data here
      chrome.extension.getBackgroundPage().console.log('data from rows: ');
      chrome.extension.getBackgroundPage().console.log(data['rows']);
      return data['rows'];
    }).catch(err => {
      console.log(err);
      // Do something for an error here
    });
  }

  rows = fetchJSON(sheetsURL);
  // rows.then(alert);

  chrome.extension.getBackgroundPage().console.log(rows);
  chrome.extension.getBackgroundPage().console.log(':)');

  if (!buttonsAdded){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
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
