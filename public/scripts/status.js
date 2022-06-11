document.addEventListener('DOMContentLoaded', init, false);

function init() {
  //const statusElem = document.querySelector('.page-status')
  if (!window.navigator.onLine) { 
    //statusElem.innerHTML = 'offline'
    console.log('offline');
  }
  //statusElem.innerHTML = 'online'
  console.log('online');
}

window.addEventListener('offline', function(e) { console.log('offline'); });

window.addEventListener('online', function(e) { console.log('online'); });