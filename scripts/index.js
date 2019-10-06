(function() {
  'use strict';

  window.onload = function() {

  }

  $('#button').click(() => {
    localStorage.setItem('renda', document.getElementById("renda").value);
    localStorage.setItem('bem', document.getElementById("bem").value);
    localStorage.setItem('tel', document.getElementById("tel").value);
    localStorage.setItem('email', document.getElementById("email").value);
    window.location.href = "result-form.html";

  });

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
             .register('./service-worker.js')
             .then(function() { console.log('Service Worker Registered'); });
  }
})();
