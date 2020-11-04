// Saves options to chrome.storage
function save_options() {
  var location = document.getElementById('locationInput').value;

  if (location !== 'Other') {
    document.getElementById('geolocationPermission').setAttribute('class', 'hidden');
    chrome.storage.sync.set({
      userLocation: location,
    }, function() {
      // Update status to let user know options were saved.
      var status = document.getElementById('status');
      status.textContent = 'Location saved.';
      setTimeout(function() {
        status.textContent = '';
      }, 750);
    });

    localStorage.setItem('userLocation', location);

  } else {
    document.getElementById('geolocationPermission').removeAttribute("class");

    function acceptGeolocation() {
      if ('geolocation' in navigator) {
        console.log('Geolocation available');
        navigator.geolocation.getCurrentPosition(position => {

          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          console.log(`Your geolocation is ${latitude}°, ${longitude}°`);

          document.getElementById('geolocationPermission').setAttribute('class', 'hidden');

          const location = `lat=${latitude}&lon=${longitude}`;

          chrome.storage.sync.set({
            userLocation: 'Other',
          }, function() {
            // Update status to let user know options were saved.
            var status = document.getElementById('status');
            status.textContent = 'Location saved.';
            setTimeout(function() {
              status.textContent = '';
            }, 750);
          });

          localStorage.setItem('userLocation', location);

        });
      } else {
        console.log('Geolocation not available')

        document.getElementById('geolocationPermission').setAttribute('class', 'hidden');

        var status = document.getElementById('status');
        status.textContent = 'Geolocation not available, please use preset location';

      }
    }
    

    document.getElementById('accept').addEventListener('click', acceptGeolocation);

  }    
 
};  
// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value
  chrome.storage.sync.get({
    userLocation: 'Christchurch',
  }, function(items) {
    document.getElementById('locationInput').value = items.userLocation;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',save_options);