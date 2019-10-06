(function () {
	'use strict';

	window.onload = function () {

		var div = document.getElementById('renda');
		div.innerHTML += localStorage.getItem('renda');

		var div = document.getElementById('bem');
		div.innerHTML += localStorage.getItem('bem');

		var div = document.getElementById('tel');
		div.innerHTML += localStorage.getItem('tel');

		var div = document.getElementById('email');
		div.innerHTML += localStorage.getItem('email');
	}
	if ('serviceWorker' in navigator) {
		navigator.serviceWorker
				 .register('./service-worker.js')
				 .then(function() { console.log('Service Worker Registered'); });
	  }
})();
