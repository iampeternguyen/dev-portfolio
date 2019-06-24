class CodeModal {
	constructor() {
		this.setUpProperties();
		this.setUpEventListners();
	}

	setUpProperties() {
		this.modal = document.getElementsByClassName('codeModal')[0];
		this.data = {};

		this.container = document.getElementsByClassName('codeModal__container')[0];
		this.jsCode = document.getElementsByClassName('codeModal__codeSnippetsJs')[0];
		this.cssCode = document.getElementsByClassName('codeModal__codeSnippetsCss')[0];
		this.htmlCode = document.getElementsByClassName('codeModal__codeSnippetsHtml')[0];
		this.htmlLink = document.getElementsByClassName('codeModal__htmlLink')[0];
		this.cssLink = document.getElementsByClassName('codeModal__cssLink')[0];
		this.jsLink = document.getElementsByClassName('codeModal__jsLink')[0];
	}
	setUpEventListners() {
		this.modal.addEventListener('click', e => {
			this.hide();
		});

		this.container.addEventListener('click', e => {
			e.stopPropagation();
		});

		this.htmlLink.addEventListener('click', e => {
			this.showHtml();
		});
		this.cssLink.addEventListener('click', e => {
			this.showCss();
		});
		this.jsLink.addEventListener('click', e => {
			this.showJs();
		});
	}

	updateDisplay(data) {
		if (this.data.html_gist && this.data.html_gist == data.html_gist) {
			return console.log('same');
		}
		this.data = data;

		postscribe(this.htmlCode, data.html_gist);
		postscribe(this.cssCode, data.css_gist);
		postscribe(this.jsCode, data.js_gist);
		this.showHtml();
	}

	show() {
		this.modal.classList.remove('close');
		this.modal.style.display = 'flex';
		this.modal.classList.add('open');
	}

	hide() {
		this.modal.classList.add('close');

		setTimeout(() => {
			this.modal.classList.remove('open');
			this.modal.style.display = 'none';
		}, 500);
	}

	hideElements() {
		[this.cssCode, this.jsCode, this.htmlCode].forEach(codeDiv => (codeDiv.style.display = 'none'));

		[this.jsLink, this.cssLink, this.htmlLink].forEach(codeLink => codeLink.classList.remove('active'));
	}
	showHtml() {
		this.hideElements();
		this.htmlCode.style.display = 'block';
		this.htmlLink.classList.add('active');
	}

	showJs() {
		this.hideElements();
		this.jsCode.style.display = 'block';
		this.jsLink.classList.add('active');
	}
	showCss() {
		this.hideElements();
		this.cssCode.style.display = 'block';
		this.cssLink.classList.add('active');
	}
}

const codeModal = new CodeModal();
