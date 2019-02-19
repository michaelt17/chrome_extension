(function() {
  let h2List = document.getElementsByClassName('doc-title');
  let button = document.createElement('button');
  button.innerHTML = "hello";
  console.log(h2List.length);
  for (var i = 0; i < h2List.length; i++){
    console.log(h2List[i].innerHTML);
    h2List[i].appendChild(button);
  }

})();
