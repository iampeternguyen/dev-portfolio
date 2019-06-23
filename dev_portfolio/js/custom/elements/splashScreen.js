const splashScreenContent = document.getElementsByClassName('splashScreen__content')[0];
const splashScreenBackground = document.getElementsByClassName('splashScreen__background')[0];

splashScreenContent.addEventListener('mouseover', () => {
	splashScreenBackground.classList.add('hover');
});

splashScreenContent.addEventListener('mouseout', () => {
	splashScreenBackground.classList.remove('hover');
});

splashScreenContent.addEventListener('click', () => {
	const image = document.getElementsByClassName('splashScreen__image')[0];
	const imageStyles = getComputedStyle(image);

	image.style.maxHeight = imageStyles.height;
	image.style.maxWidth = imageStyles.width;

	const elements = Array.from(splashScreenBackground.children);
	elements.push(image);
	elements.forEach(child => child.classList.add('onClose'));

	setTimeout(() => {
		document.getElementById('splashScreen').style.display = 'none';
	}, 700);
});
