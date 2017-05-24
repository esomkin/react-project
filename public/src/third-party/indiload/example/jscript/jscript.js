document.addEventListener('DOMContentLoaded', function (event) {

	var handle = document.querySelector('.indi-handle');

	handle.addEventListener('click', function (event) {

		event.preventDefault();

		IndiLoad().show();

		setTimeout(function () {

			IndiLoad().hide();

		}, 5000)
	})

}, false); 