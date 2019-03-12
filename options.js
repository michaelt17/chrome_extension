let config = {
  apiKey: "AIzaSyBjJGzI3D2MCHe9HLWwc_bgFCsiHyFEw7s",
  databaseURL: "https://chromeextension-4f2a6.firebaseio.com/",
};
const app = firebase.initializeApp(config);
const appDb = app.database();

let page = document.getElementById('buttonDiv');
const kButtonColors = ['#3aa757', '#e8453c', '#f9bb2d', '#4688f1', '#ffffff'];
function constructOptions(kButtonColors) {
  for (let item of kButtonColors) {
    let button = document.createElement('button');
    button.style.backgroundColor = item;
    button.addEventListener('click', function() {
      chrome.storage.sync.set({color: item}, function() {
        console.log('color is ' + item);
      })
    });
    page.appendChild(button);
  }
}
constructOptions(kButtonColors);

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse){
       console.log(request.package);
    }
);
