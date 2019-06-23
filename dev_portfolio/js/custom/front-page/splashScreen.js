(function() {
	const splashScreenContent = document.getElementsByClassName('splashScreen__circle')[0];

	splashScreenContent.addEventListener('click', () => {
		const splashScreen = document.getElementById('splashScreen');
		const splashScreenBackground = document.getElementsByClassName('splashScreen__background')[0];

		const image = document.getElementsByClassName('splashScreen__image')[0];
		const imageStyles = getComputedStyle(image);

		image.style.maxHeight = imageStyles.height;
		image.style.maxWidth = imageStyles.width;

		const elements = Array.from(splashScreenBackground.children);
		elements.push(image, splashScreenBackground, splashScreen);
		elements.forEach(element => element.classList.add('onClose'));

		setTimeout(() => {
			splashScreen.style.display = 'none';
		}, 1000);
	});
})();
