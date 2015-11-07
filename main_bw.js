(function() {
 loadOptions();
 buttonHandler();
})();

function buttonHandler() {
 var $submitButton = $('#submitButton');

 $submitButton.on('click', function() {
//  console.log('Submit');
 
  var return_to = getQueryParam('return_to', 'pebblejs://close#');
  document.location = return_to + encodeURIComponent(JSON.stringify(getAndStoreConfigData()));
 });

 var $cancelButton = $('#cancelButton');

 $cancelButton.on('click', function() {
//  console.log('Cancel');
 
  var return_to = getQueryParam('return_to', 'pebblejs://close#');
  document.location = return_to;
 });
}

// Radio control for hiding battery
var $hideBattery;
$("input[name=hideBattery]").change(function () {
 $hideBattery = parseInt(this.value);
});

// Radio control for animation on shake
var $noAnimOnShake;
$("input[name=noAnimOnShake]").change(function () {
 $noAnimOnShake = parseInt(this.value);
});

// Radio control for inverting colors
var $invert;
$("input[name=$invert]").change(function () {
 $invert = parseInt(this.value);
});


function loadOptions() {
 if (localStorage.hideBattery) {
  $hideBattery = localStorage.hideBattery;
//  console.log('localStorage.hideBattery: ' + $hideBattery);
  // setting radio' value
 } else {
  $hideBattery = 0;
//  console.log('localStorage.hideBattery was undefined, now set to: ' + $hideBattery);
 }
 $("input[name=hideBattery][value='" + $hideBattery + "']").attr('checked', 'checked');

 if (localStorage.noAnimOnShake) {
  $noAnimOnShake = localStorage.noAnimOnShake;
//  console.log('localStorage.noAnimOnShake: ' + $noAnimOnShake);
  // setting radio' value
 } else {
  $noAnimOnShake = 0;
//  console.log('localStorage.noAnimOnShake was undefined, now set to: ' + $noAnimOnShake);
 }
 $("input[name=noAnimOnShake][value='" + $noAnimOnShake + "']").attr('checked', 'checked');

 if (localStorage.invert) {
  $invert = localStorage.invert;
//  console.log('localStorage.invert: ' + $invert);
  // setting radio' value
 } else {
  $invert = 0;
//  console.log('localStorage.invert was undefined, now set to: ' + $invert);
 }
 $("input[name=invert][value='" + $invert + "']").attr('checked', 'checked');

} 

function getAndStoreConfigData() {

 var options = {
  hideBattery:   $hideBattery,
  noAnimOnShake: $noAnimOnShake,
  invert:        $invert
 };
 
 console.log('Got options: ' + JSON.stringify(options));

 localStorage.hideBattery   = $hideBattery;
 localStorage.noAnimOnShake = $noAnimOnShake;
 localStorage.invert        = $invert;

 return options;
}

function getQueryParam(variable, defaultValue) {
 var query = location.search.substring(1);
 var vars = query.split('&');
 for (var i = 0; i < vars.length; i++) {
  var pair = vars[i].split('=');
  if (pair[0] === variable) {
   return decodeURIComponent(pair[1]);
  }
 }
 return defaultValue || false;
}
