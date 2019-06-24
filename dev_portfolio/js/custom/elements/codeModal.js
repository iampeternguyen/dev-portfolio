class CodeModal {
	constructor() {
		this.element = document.getElementsByClassName('codeModal')[0];
		this.element.addEventListener('click', e => {
			this.hide();
		});
		this.data = {};

		document.getElementsByClassName('codeModal__container')[0].addEventListener('click', e => {
			e.stopPropagation();
		});
	}
	updateDisplay(data) {
		if (this.data.html_gist && this.data.html_gist == data.html_gist) {
			return console.log('same');
		}
		this.data = data;
		const jsCode = document.getElementsByClassName('codeModal__codeSnippetsJs')[0];
		const cssCode = document.getElementsByClassName('codeModal__codeSnippetsCss')[0];
		const htmlCode = document.getElementsByClassName('codeModal__codeSnippetsHtml')[0];
		postscribe(htmlCode, data.html_gist);
		postscribe(cssCode, data.css_gist);
		postscribe(jsCode, data.js_gist);
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
