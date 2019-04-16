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
    document.getElementById('Taxes').addEventListener('click', function() {
        setGroup("Taxes");
    });
    document.getElementById('Personal').addEventListener('click', function() {
        setGroup("Personal");
    });
    document.getElementById('Corporate').addEventListener('click', function() {
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

  let dumbButtons = document.getElementsByClassName("dumb-button");

  for (let i = 0; i < dumbButtons.length; i++){
    if (dumbButtons[i].id == buttonGroup){
      dumbButtons[i].style.backgroundColor = "green";
    }
    else{
      dumbButtons[i].style.backgroundColor = "lightgreen";
    }
  }
  // document.getElementById('Personal').style.backgroundColor = "lightgreen"
  // document.getElementById('Corporate').style.backgroundColor = "lightgreen"
  // document.getElementById('Taxes').style.backgroundColor = "lightgreen"


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
