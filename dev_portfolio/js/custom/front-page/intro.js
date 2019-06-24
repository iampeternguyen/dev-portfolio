(function() {
	const intro = document.getElementsByClassName('intro')[0];
	const tooltip = document.getElementsByClassName('intro__tooltip')[0];
	intro.addEventListener('mouseover', () => {
		tooltip.classList.add('active');
	});

	tooltip.addEventListener('click', async () => {
		const response = await axios.get('http://localhost:8000/wp-json/wp/v2/code_explainer/1807');
		codeModal.updateDisplay(response.data);
		codeModal.show();
	});
})();
