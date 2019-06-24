class CodeModal {
	constructor() {
		this.element = document.getElementsByClassName('codeModal')[0];
		this.element.addEventListener('click', e => {
			this.hide();
		});

		document.getElementsByClassName('codeModal__container')[0].addEventListener('click', e => {
			e.stopPropagation();
		});
	}

	show() {
		this.element.classList.remove('close');
		this.element.style.display = 'flex';
		this.element.classList.add('open');
	}

	hide() {
		this.element.classList.add('close');

		setTimeout(() => {
			this.element.classList.remove('open');
			this.element.style.display = 'none';
		}, 500);
	}
}

const codeModal = new CodeModal();
