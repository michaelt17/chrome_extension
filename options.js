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
    document.getElementById('button4').addEventListener('click', function() {
        checkGroup();
    });
});

function setGroup(buttonGroup){
  chrome.storage.sync.set({group: buttonGroup}, function() {
        console.log('group is ' + buttonGroup);
      })
  chrome.runtime.sendMessage({
    
  });
};

function checkGroup(){
  chrome.storage.sync.get(['group'], function(result) {
        // console.log(result);
        console.log('Value currently is ' + result['group']);
    });
};


chrome.storage.onChanged.addListener(function(changes, namespace) {
  for (var key in changes) {
    var storageChange = changes[key];
    console.log('Storage key "%s" in namespace "%s" changed. ' +
                'Old value was "%s", new value is "%s".',
                key,
                namespace,
                storageChange.oldValue,
                storageChange.newValue);
  }
});
