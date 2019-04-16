(function() {
  console.log("In westLaw Buttons")
  console.log(passingDataSearches);
  console.log(passingDataMappings);

  let documentIcons = document.getElementsByClassName('co_documentIcons');
  let documentTitles = document.getElementsByClassName('draggable_document_link');
  let metaList = document.getElementsByClassName('co_searchResults_citation');
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

  let numberMatches = passingDataSearches.length;
  console.log("numberMatches: ",numberMatches)

  // button.syle.width = "50px";
  // button.syle.height = "50px";
  // button.value = "hatelife";
  console.log(documentIcons.length);

  for (let i = 0; i < documentIcons.length; i++){

  // for (let i = 0; i < 1; i++){
    let score = 0;
    let match_val = -1;
    let hasMatch = false;

    let query = document.getElementById('searchInputId').value;
    let new_terms = query.split(" ");

    // console.log(new_terms);
    // console.log(new_terms.length);
    // console.log(i);
    // console.log(metaList[i].childNodes[5]);
    // console.log(metaList[i].childNodes[5].innerText);
    for (let j = 0; j < passingDataMappings.length; j++){
      // console.log(metaList[i].childNodes[5].innerHTML.replace(/\s/g, ''));
      // console.log(passingDataMappings[j].replace(/\s/g, ''));
      replacementMeta = metaList[i].childNodes[5].innerText.replace(/\s/g, '');
      // console.log(replacementMeta);
      if (replacementMeta == passingDataMappings[j].replace(/\s/g, '')){
        console.log("is in data mappings");
        console.log(metaList[i].childNodes[5].innerText.replace(/\s/g, ''));
        console.log(j);
        match_val = j;
        hasMatch = true;
      	//we can do something right here if we want to denote matching cases but not matching queries

        for (let k = 0; k < new_terms.length; k++){
          console.log(new_terms[k]);
          console.log(score);

          if (new_terms[k] in passingDataSearches[j]['terms']) {
        		score += Number(passingDataSearches[j]['terms'][new_terms[k]]);
          	console.log('we have a match');
        	}
        }

      }
    }


    tempNode = button.cloneNode();
    tempNode.setAttribute("id",'button'+i);
    tempNode.innerHTML = '+';
    tempNode.style.backgroundColor = "lightgreen";
    tempNode.style.borderRadius = "50%";
    tempNode.style.width = "40px";
    tempNode.style.height = "40px";
    tempNode.style.marginRight = "10px";
    tempNode.style.float = "right";

    tempNodeNeg = buttonNeg.cloneNode();
    tempNodeNeg.setAttribute("id",'buttonNeg'+i);
    tempNodeNeg.innerHTML = '-';
    tempNodeNeg.style.backgroundColor = "tomato";
    tempNodeNeg.style.borderRadius = "50%";
    tempNodeNeg.style.width = "40px";
    tempNodeNeg.style.height = "40px";
    tempNodeNeg.style.float = "right";

    tempTextNode = node.cloneNode();

    tempTextNode.setAttribute("id",'buttonScore' + i);
    tempNode.setAttribute("pospress", false);
    tempNode.setAttribute("negpress", false);
    tempTextNode.innerHTML = score;
    tempTextNode.style.border = "solid";
    tempTextNode.style.textAlign = "center";
    tempTextNode.style.verticalAlign = "center";

    if (score > 0){
      documentTitles[i].style.color = "green";
      tempTextNode.style.borderColor = "green";
      tempTextNode.style.color = "green";
    }
    else if (score < 0) {
      documentTitles[i].style.color = "red";
      tempTextNode.style.borderColor = "red";
      tempTextNode.style.color = "red";
    }
    tempTextNode.style.float = "right";
    tempTextNode.style.width = "30px";
    tempTextNode.style.height = "30px";

    tempNode.onclick = function(){
      let string = "buttonScore" + i;
      let buttonString = 'button' + i;
      let buttonStringNeg = 'buttonNeg' + i;
      let query = document.getElementById('searchInputId').value;
      let identifier = metaList[i].childNodes[5].textContent.trim()
      let getNode = document.getElementById(string);
      // console.log(getNode.id);
      //if(negPressed)
      if (getNode.negpress){
        document.getElementById(buttonString).style.backgroundColor = "green";
        document.getElementById(buttonStringNeg).style.backgroundColor = "tomato";

        getNode.innerHTML = Number(getNode.innerHTML) + 2*new_terms.length;

        for (let k = 0; k < new_terms.length; k++){
          passingDataSearches[match_val]['terms'][new_terms[k]] += 2;
        }

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
        getNode.innerHTML = Number(getNode.innerHTML) + new_terms.length;

        if(hasMatch){
          console.log("you betcha");
          for (let k = 0; k < new_terms.length; k++){
            if ([new_terms[k]] in passingDataSearches[match_val]['terms']){
              passingDataSearches[match_val]['terms'][new_terms[k]] += 1;
            }
            else{
              passingDataSearches[match_val]['terms'][new_terms[k]] = 1;
            }
          }
          sendMsg();
        }
        else{
          console.log("in else");

          let new_dictionary = {};
          for (let i = 0; i < new_terms.length;i++){
            console.log("in new dictionary for");
            new_dictionary[new_terms[i]] = 1;
          }

          console.log(new_dictionary);
          console.log(new_terms);

          passingDataMappings.push(identifier);

          passingDataSearches.push({
            "id": identifier,
            "terms": new_dictionary,
            "title": documentTitles[i].innerText.trim(),
          })
          // console.log(passingDataMappings);
          // console.log(passingDataSearches);
          // console.log(documentIcons[i].childNodes[1].innerText);
          hasMatch = true;
          match_val = numberMatches;
          numberMatches += 1;

          sendMsg();
        }

        // plusPressed  = true;
        getNode.pospress = true;
        console.log(identifier);
        console.log(new_terms);
        console.log("positive press");
      }
      else{
        document.getElementById(buttonString).style.backgroundColor = "lightgreen";
        getNode.innerHTML = Number(getNode.innerHTML) - new_terms.length;
        for (let k = 0; k < new_terms.length; k++){
          passingDataSearches[match_val]['terms'][new_terms[k]] -= 1;
        }
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
      let query = document.getElementById('searchInputId').value;
      let identifier = metaList[i].childNodes[5].textContent.trim()
      if (getNode.pospress){
        document.getElementById(buttonStringNeg).style.backgroundColor = "red";
        document.getElementById(buttonString).style.backgroundColor = "lightgreen";

        getNode.innerHTML = Number(getNode.innerHTML) - 2*new_terms.length;


        for (let k = 0; k < new_terms.length; k++){
          passingDataSearches[match_val]['terms'][new_terms[k]] -= 2;
        }

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
        getNode.innerHTML = Number(getNode.innerHTML) - new_terms.length;
        if(hasMatch){
          for (let k = 0; k < new_terms.length; k++){
            passingDataSearches[match_val]['terms'][new_terms[k]] -= 1;
          }
          sendMsg();
        }
        else{
          console.log("in else");

          let new_dictionary = {};
          for (let i = 0; i < new_terms.length;i++){
            console.log("in new dictionary for");
            new_dictionary[new_terms[i]] = -1;
          }

          passingDataMappings.push(identifier);

          passingDataSearches.push({
            "id": identifier,
            "terms": new_dictionary,
            "title": documentTitles[i].innerText.trim(),
          })
          // console.log(passingDataMappings);
          // console.log(passingDataSearches);
          // console.log(documentIcons[i].childNodes[1].innerText);

          hasMatch = true;
          match_val = numberMatches;
          numberMatches += 1;

          sendMsg();
        }
        // negPressed = true;
        getNode.negpress = true;
        console.log(identifier);
        console.log(query);
        console.log("negative press");
      }
      else{
        document.getElementById(buttonStringNeg).style.backgroundColor = "tomato";
        getNode.innerHTML = Number(getNode.innerHTML) + new_terms.length;

        for (let k = 0; k < new_terms.length; k++){
          passingDataSearches[match_val]['terms'][new_terms[k]] += 1;
        }

        sendMsg();
        // negPressed = false;
        getNode.negpress = false;
      }
    };

    documentIcons[i].appendChild(tempNode);
    documentIcons[i].appendChild(tempNodeNeg);
    documentIcons[i].appendChild(tempTextNode);
    // console.log(documentIcons[i].innerHTML);
    // documentIcons[i].innerHTML += button;
  }

function sendMsg(){
    chrome.runtime.sendMessage({
      package: {searches: passingDataSearches,
                mappings: passingDataMappings}
    });
  }
})();
