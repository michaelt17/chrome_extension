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
