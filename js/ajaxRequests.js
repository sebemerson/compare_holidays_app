
// document.getElementById("click").onclick = function() { 
//     xhrRequest.makeRequest('https://jsonplaceholder.typicode.com/'); 
    
// };
// var xhrRequest = {
//   makeRequest: function(url){
//     var xhr = new XMLHttpRequest();
//     xhr.withCredentials = true;
//     xhr.open("GET", url, true);
//     xhr.setRequestHeader("Accept", "text/json");
//     xhr.onreadystatechange = this.receiveResponse;
//     xhr.send();
//   },
//   receiveResponse: function(){ //'this' is XMLHttpRequest
//     if (this.readyState == 4 && this.status == 200) {
//     console.log(this.statusText)
//     var requestedItems = this.responseText;
//   }//add else
//   requestResults.display(requestedItems);
//   }
// };  
// var requestResults = {
//     display: function(el){
//       document.getElementById("display").innerHTML = el;
//   }
// };