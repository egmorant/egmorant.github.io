var geoButton = document.getElementById('geo');
var notifyButton = document.getElementById('notify');

// Check onload status of geolocation permission.   
navigator.permissions.query({name:'geolocation'}).then(function(result){ 
 if (result.state == 'denied') {
  geoButton.setAttribute('icon','communication:location-off');
  geoButton.style.color = 'grey';
 }
 else if (result.state == 'granted') {
  geoButton.setAttribute('icon','communication:location-on');
  geoButton.style.color = 'rgb(62,81,181)';
 }
 else { // Prompt
  geoButton.setAttribute('icon','communication:location-on');
  geoButton.style.color = 'grey';
 } 
});

// Check onload status of notifications permission.
navigator.permissions.query({name:'notifications'}).then(function(result){ 
 if (result.state == 'denied') {
  notifyButton.disabled = true;
  notifyButton.checked = false;   
  notifyButton.style.color = 'grey';
 }
 else if (result.state == 'granted') {
  notifyButton.disabled = false;
  notifyButton.checked = true; 
  notifyButton.style.color = 'rgb(62,81,181)';   
 }
 else {  // Prompt
  notifyButton.disabled = false;
  notifyButton.checked = false; 
  notifyButton.style.color = 'grey';
 } 
});

// Listen for when location button is clicked.  
document.addEventListener('DOMContentLoaded', function(event){
 geoButton.addEventListener('click', function(){
  navigator.permissions.query({name:'geolocation'}).then(function(result){
   if (result.state == 'granted'){
    // Revoke location.
    navigator.permissions.revoke({name:'geolocation'});
   } else if (result.state == 'prompt') {
    // Prompt for geolocation.
    navigator.permissions.request({name:'geolocation'});  
   } else if (result.state == 'denied'){
    // Fall back to San Francisco as default location.
   }
    
  // When a choice is made, update UI accordingly. 
  result.onchange = function (){
   if (result.state == 'granted') {
    // Query for location
    geoButton.setAttribute('icon','communication:location-on');
    geoButton.style.color = 'rgb(62,81,181)';     
   } else if (result.state == 'prompt') {
    // Fall back to San Francisco as default location
    geoButton.setAttribute('icon','communication:location-on');
    geoButton.style.color = 'grey'; 
   } else if (result.state == 'denied'){
    // Fall back to San Francisco as default location
    geoButton.setAttribute('icon','communication:location-off');
    geoButton.style.color = 'grey'; 
   };     
  }
 }) 
 });
});
    
// Listen for when the geolocation permissions state has changed on an ongoing basis.
navigator.permissions.query({name:'geolocation'}).then(function(result){
 result.onchange = function(){
  if (result.state == 'denied') {
   geoButton.setAttribute('icon','communication:location-off');
   geoButton.style.color = 'grey';
  }
  else if (result.state == 'granted') {
   geoButton.setAttribute('icon','communication:location-on');
   geoButton.style.color = 'rgb(62,81,181)';
  }
  else {
   geoButton.setAttribute('icon','communication:location-on');
   geoButton.style.color = 'grey';
  }
}});

// Listen for when notifications are toggled.
document.addEventListener('DOMContentLoaded', function(event){
 notifyButton.addEventListener('change', function(){
  if (this.checked) {
   navigator.permissions.request({name:'notifications'}); 
  } else {
  navigator.permissions.revoke({name:'notifications'});
  } 
}});

// Listen for when the notifications permissions state has changed on an ongoing basis. 
navigator.permissions.query({name:'notifications'}).then(function(result){ 
 result.onchange = function(){
  if (result.state == 'denied'){
   notifyButton.disabled = true; 
   notifyButton.checked = false; 
  }
  else if (result.state == 'granted'){
   notifyButton.disabled = false;
   notifyButton.checked = true;
  } 
  else{  // Prompt
   notifyButton.disabled = false;
   notifyButton.checked = false;
  } 
}});  
    