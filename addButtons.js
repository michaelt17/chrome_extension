(function() {
  console.log(passingDataSearches);
  console.log(passingDataMappings);

  let h2List = document.getElementsByClassName('doc-title');
  let metaList = document.getElementsByClassName('metadata');
  let button = document.createElement('BUTTON');
  let buttonNeg = document.createElement('BUTTON');

  let node = document.createElement('div');

  let plusPressed = false;
  let negPressed = false;

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
  // for (let i = 0; i < 1; i++){
    let score = 0;
    let match_val = -1;
    let hasMatch = false;

    // console.log(i);
    // console.log(metaList[i].childNodes[5].innerHTML);
    for (let j = 0; j < passingDataMappings.length; j++){
      // console.log(metaList[i].childNodes[5].innerHTML.replace(/\s/g, ''));
      // console.log(passingDataMappings[j].replace(/\s/g, ''));
      if (metaList[i].childNodes[5].innerHTML.replace(/\s/g, '') == passingDataMappings[j].replace(/\s/g, '')){
        //we can use trim here to remove leading whitespace in the innerHTML and compare strings directly instead
        score = passingDataSearches[j]['score'];
        match_val = j;
        hasMatch = true;
        console.log('we have a match');
        break;
      }
    }


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
    tempNode.setAttribute("pospress", false);
    tempNode.setAttribute("negpress", false);
    tempTextNode.innerHTML = score;
    tempTextNode.style.float = "right";
    tempTextNode.style.width = "30px";
    tempTextNode.style.height = "20px";

    tempNode.onclick = function(){
      let string = "buttonScore" + i;
      let buttonString = 'button' + i;
      let buttonStringNeg = 'buttonNeg' + i;
      let query = document.getElementById('searchTerms').value;
      let identifier = metaList[i].childNodes[5].textContent.trim()
      let getNode = document.getElementById(string);
      // console.log(getNode.id);
      //if(negPressed)
      if (getNode.negpress){
        document.getElementById(buttonString).style.backgroundColor = "green";
        document.getElementById(buttonStringNeg).style.backgroundColor = "tomato";
        getNode.innerHTML = Number(getNode.innerHTML) + 2;

        passingDataSearches[match_val]['score'] += 2;
        sendMsg();
        // negPressed = false;
        // plusPressed  = true;
        getNode.negpress = false;
        getNode.pospress = true;
        console.log(identifier);
        console.log(query);
        console.log("positive press");
      }
      //else if (!plusPressed)
      else if (!getNode.pospress) {
        document.getElementById(buttonString).style.backgroundColor = "green";
        document.getElementById(buttonStringNeg).style.backgroundColor = "tomato";
        getNode.innerHTML = Number(getNode.innerHTML) + 1;
        passingDataSearches[match_val]['score'] += 1;
        sendMsg();
        // plusPressed  = true;
        getNode.pospress = true;
        console.log(identifier);
        console.log(query);
        console.log("positive press");
      }
      else{
        document.getElementById(buttonString).style.backgroundColor = "lightgreen";
        getNode.innerHTML = Number(getNode.innerHTML) - 1;
        passingDataSearches[match_val]['score'] -= 1;
        sendMsg();
        // plusPressed = false;
        getNode.pospress = false;
      }
    };

    tempNodeNeg.onclick = function(){
      let string = "buttonScore" + i;
      let buttonString = 'button' + i;
      let buttonStringNeg = 'buttonNeg' + i;
      // console.log(string);
      let getNode = document.getElementById(string);
      // console.log(getNode.id);
      //if (plusPressed)
      let query = document.getElementById('searchTerms').value;
      let identifier = metaList[i].childNodes[5].textContent.trim()
      if (getNode.pospress){
        document.getElementById(buttonStringNeg).style.backgroundColor = "red";
        document.getElementById(buttonString).style.backgroundColor = "lightgreen";
        getNode.innerHTML = Number(getNode.innerHTML) - 2;
        passingDataSearches[match_val]['score'] -= 2;
        sendMsg();
        // sendMsg();
        // negPressed = true;
        // plusPressed = false;
        getNode.negpress = true;
        getNode.pospress = false;
        console.log(identifier);
        console.log(query);
        console.log("negative press");
      }
      //else if (!negPressed)
      else if (!getNode.negpress) {
        document.getElementById(buttonStringNeg).style.backgroundColor = "red";
        document.getElementById(buttonString).style.backgroundColor = "lightgreen";
        getNode.innerHTML = Number(getNode.innerHTML) - 1;
        passingDataSearches[match_val]['score'] -= 1;
        sendMsg();
        // negPressed = true;
        getNode.negpress = true;
        console.log(identifier);
        console.log(query);
        console.log("negative press");
      }
      else{
        document.getElementById(buttonStringNeg).style.backgroundColor = "tomato";
        getNode.innerHTML = Number(getNode.innerHTML) + 1;
        passingDataSearches[match_val]['score'] += 1;
        sendMsg();
        // negPressed = false;
        getNode.negpress = false;
      }
    };

    h2List[i].appendChild(tempNode);
    h2List[i].appendChild(tempNodeNeg);
    h2List[i].appendChild(tempTextNode);
    // console.log(h2List[i].innerHTML);
    // h2List[i].innerHTML += button;
  }

function sendMsg(){
    chrome.runtime.sendMessage({
      package: {searches: passingDataSearches,
                mappings: passingDataMappings}
    });
  }
})();
