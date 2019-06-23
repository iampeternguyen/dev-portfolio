(function() {
	const intro = document.getElementsByClassName('intro')[0];
	const tooltip = document.getElementsByClassName('intro__tooltip')[0];

	intro.addEventListener('mouseover', () => {
		tooltip.classList.add('active');
	});
})();
