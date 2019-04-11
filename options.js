let config = {
  apiKey: "AIzaSyBjJGzI3D2MCHe9HLWwc_bgFCsiHyFEw7s",
  databaseURL: "https://chromeextension-4f2a6.firebaseio.com/",
};
const app = firebase.initializeApp(config);
const appDb = app.database();

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse){
       console.log(request.package);

       appDb.ref("mappings").set(request.package["mappings"]);
       appDb.ref("searches").set(request.package["searches"]);
    }
);

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('button1').addEventListener('click', function() {
        setGroup("Taxes");
    });
    document.getElementById('button2').addEventListener('click', function() {
        setGroup("Personal Injuries");
    });
    document.getElementById('button3').addEventListener('click', function() {
        setGroup("Corporate");
    });
});

function setGroup(buttonNumber){
  console.log(buttonNumber);
}
