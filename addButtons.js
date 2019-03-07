(function() {
  chrome.extension.getBackgroundPage().console.log("running");
  
  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      console.log(sender.tab ?
                  "from a content script:" + sender.tab.url :
                  "from the extension");
      if (request.greeting == "hello")
        sendResponse({farewell: "goodbye"});
    });

  let score = 0;

  // taken from https://gist.github.com/samjarman/a39e344539a521b428317ff5d2f9cf25
  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (request.message == "preach"){ // Filter out other messages
      alert(request.preachText, 5000);
    }
  });
  // chrome.extension.getBackgroundPage().console.log('in addButtons');
  // chrome.extension.getBackgroundPage().console.log(rows);

  let h2List = document.getElementsByClassName('doc-title');
  let button = document.createElement('BUTTON');
  let buttonNeg = document.createElement('BUTTON');

  let node = document.createElement('div');

  let plusPressed = false;
  let negPressed = false;
  // var node = document.createTextNode(rows['score']);
  // var node = document.createTextNode(rowsScore);

  // document.addEventListener('DOMContentLoaded', function () {
  //   let bg = chrome.extension.getBackgroundPage();
  //   let rows = bg.rows;
  //   console.log(rows);
  // });

  // let bg = chrome.extension.getBackgroundPage();

  // taken from https://www.taniarascia.com/how-to-use-the-javascript-fetch-api-to-get-json-data/
  // Replace ./data.json with your JSON feed


  button.type = "button";
  button.classList.add("positive-button");

  buttonNeg.type = "button";
  buttonNeg.classList.add("negative-button");

  node.classList.add("button-score");

  button.onclick = function(){
    console.log("increasing score");
  };

  buttonNeg.onclick = function(){
    console.log("decreasing score");
  };

  // button.syle.width = "50px";
  // button.syle.height = "50px";
  // button.value = "hatelife";
  // console.log(h2List.length);
  for (let i = 0; i < h2List.length; i++){
    console.log(i);
    tempNode = button.cloneNode();
    tempNode.setAttribute("id",'button'+i);
    tempNode.innerHTML = '+';
    tempNode.style.backgroundColor = "lightgreen";
    tempNode.style.borderRadius = "50%";
    tempNode.style.width = "50px";
    tempNode.style.height = "50px";
    tempNode.style.marginRight = "10px";
    tempNode.style.float = "right";

    tempNodeNeg = buttonNeg.cloneNode();
    tempNodeNeg.setAttribute("id",'buttonNeg'+i);
    tempNodeNeg.innerHTML = '-';
    tempNodeNeg.style.backgroundColor = "tomato";
    tempNodeNeg.style.borderRadius = "50%";
    tempNodeNeg.style.width = "50px";
    tempNodeNeg.style.height = "50px";
    tempNodeNeg.style.float = "right";

    tempTextNode = node.cloneNode();
    tempTextNode.setAttribute("id",'buttonScore' + i);
    tempTextNode.innerHTML = score;
    tempTextNode.style.float = "right";
    tempTextNode.style.width = "30px";
    tempTextNode.style.height = "20px";

    tempNode.onclick = function(){
      let string = "buttonScore" + i;
      let buttonString = 'button' + i;
      // console.log(string);
      let getNode = document.getElementById(string);
      // console.log(getNode.id);
      if (negPressed){
        document.getElementById(buttonString).style.backgroundColor = "green";
        getNode.innerHTML = Number(getNode.innerHTML) + 2;
        negPressed = false;
        plusPressed  = true;
      }
      else if (!plusPressed) {
        document.getElementById(buttonString).style.backgroundColor = "green";
        getNode.innerHTML = Number(getNode.innerHTML) + 1;
        plusPressed  = true;
      }
      else{
        document.getElementById(buttonString).style.backgroundColor = "lightgreen";
        getNode.innerHTML = Number(getNode.innerHTML) - 1;
        plusPressed = false;
      }
    };

    tempNodeNeg.onclick = function(){
      let string = "buttonScore" + i;
      let buttonStringNeg = 'buttonNeg' + i;
      // console.log(string);
      let getNode = document.getElementById(string);
      // console.log(getNode.id);
      if (plusPressed){
        document.getElementById(buttonStringNeg).style.backgroundColor = "red";
        getNode.innerHTML = Number(getNode.innerHTML) - 2;
        negPressed = true;
        plusPressed = false;
      }
      else if (!negPressed) {
        document.getElementById(buttonStringNeg).style.backgroundColor = "red";
        getNode.innerHTML = Number(getNode.innerHTML) - 1;
        negPressed = true;
      }
      else{
        document.getElementById(buttonStringNeg).style.backgroundColor = "tomato";
        getNode.innerHTML = Number(getNode.innerHTML) + 1;
        negPressed = false;
      }
    };

    h2List[i].appendChild(tempNode);
    h2List[i].appendChild(tempNodeNeg);
    h2List[i].appendChild(tempTextNode);
    // console.log(h2List[i].innerHTML);
    // h2List[i].innerHTML += button;
  }

})();
