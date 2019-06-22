const splashScreenContent = document.getElementsByClassName('splashScreen__content')[0];

splashScreenContent.addEventListener('click', () => {
	const image = document.getElementsByClassName('splashScreen__image')[0];
	const imageStyles = getComputedStyle(image);
	image.style.maxHeight = imageStyles.height;
	image.style.maxWidth = imageStyles.width;
	image.classList.add('animate');
	splashScreenContent.classList.add('animate');

	setTimeout(() => {
		document.getElementById('splashScreen').style.display = 'none';
	}, 700);
});
