(function() {

  // chrome.extension.getBackgroundPage().console.log('in addButtons');
  // chrome.extension.getBackgroundPage().console.log(rows);

  let h2List = document.getElementsByClassName('doc-title');
  let button = document.createElement('BUTTON');
  let buttonNeg = document.createElement('BUTTON');

  var node = document.createElement('div');

  // var node = document.createTextNode(rows['score']);
  // var node = document.createTextNode(rowsScore);

  // document.addEventListener('DOMContentLoaded', function () {
  //   let bg = chrome.extension.getBackgroundPage();
  //   let rows = bg.rows;
  //   console.log(rows);
  // });

  // let bg = chrome.extension.getBackgroundPage();

  let score = 0;
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
  for (var i = 0; i < h2List.length; i++){
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
    tempNodeNeg.style.backgroundColor = "red";
    tempNodeNeg.style.borderRadius = "50%";
    tempNodeNeg.style.width = "50px";
    tempNodeNeg.style.height = "50px";
    tempNodeNeg.style.float = "right";

    tempTextNode = node.cloneNode();
    tempTextNode.innerHTML = score;
    tempTextNode.style.float = "right";
    tempTextNode.style.width = "50px";
    tempTextNode.style.height = "20px";

    tempNode.onclick = function(){
      var getNode = document.getElementById("button" + i);
      getNode.innerHTML = Number(getNode.innerHTML) + 1;
    };

    tempNodeNeg.onclick = function(){
      var getNode = document.getElementById("buttonNeg" + i);
      getNode.innerHTML = Number(getNode.innerHTML) - 1;
    };

    h2List[i].appendChild(tempNode);
    h2List[i].appendChild(tempNodeNeg);
    h2List[i].appendChild(tempTextNode);
    // console.log(h2List[i].innerHTML);
    // h2List[i].innerHTML += button;
  }

})();
