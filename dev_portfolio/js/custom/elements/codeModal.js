class CodeModal {
	constructor() {
		this.setUpProperties();
		this.setUpEventListners();
	}

	setUpProperties() {
		this.modal = document.getElementsByClassName('codeModal')[0];
		this.data = {};
		this.id = null;

		this.tooltipsButtonContainer = document.getElementsByClassName('tooltipButton__container')[0];
		this.tooltipsButton = document.getElementsByClassName('tooltipButton__button')[0];
		this.tooltipsButtonTooltip = document.getElementsByClassName('tooltipButton__tooltip')[0];
		this.tooltips = Array.from(document.getElementsByClassName('code__tooltip'));

		this.container = document.getElementsByClassName('codeModal__container')[0];
		this.closeButton = document.getElementsByClassName('codeModal__closeButton')[0];

		this.jsCode = document.getElementsByClassName('codeModal__codeSnippetsJs')[0];
		this.cssCode = document.getElementsByClassName('codeModal__codeSnippetsCss')[0];
		this.htmlCode = document.getElementsByClassName('codeModal__codeSnippetsHtml')[0];
		this.phpCode = document.getElementsByClassName('codeModal__codeSnippetsPhp')[0];

		this.htmlLink = document.getElementsByClassName('codeModal__htmlLink')[0];
		this.cssLink = document.getElementsByClassName('codeModal__cssLink')[0];
		this.jsLink = document.getElementsByClassName('codeModal__jsLink')[0];
		this.phpLink = document.getElementsByClassName('codeModal__phpLink')[0];
		this.title = document.getElementsByClassName('codeModal__title')[0];
		this.text = document.getElementsByClassName('codeModal__text')[0];
	}

	showTooltipsButton() {
		this.tooltipsButtonContainer.style.visibility = 'visible';
		this.tooltipsButton.classList.add('visible');
		this.tooltipsButtonTooltip.classList.add('visible');
	}

	closeTooltipsButtonTooltip() {
		this.tooltipsButtonTooltip.classList.remove('visible');
		this.tooltipsButtonTooltip.classList.add('close');
	}
	setUpEventListners() {
		this.modal.addEventListener('click', e => {
			this.hide();
		});

		this.closeButton.addEventListener('click', e => {
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
		this.phpLink.addEventListener('click', e => {
			this.showPhp();
		});
	}
	switchTooltips() {
		if (this.tooltipsVisible) {
			this.tooltips.forEach(tooltip => tooltip.classList.remove('active'));
			this.tooltipsButton.classList.remove('active');
			this.tooltipsVisible = false;
		} else {
			this.tooltips.forEach(tooltip => tooltip.classList.add('active'));
			this.tooltipsButton.classList.add('active');
			this.tooltipsVisible = true;
		}
	}

	async updateDisplay() {
		this.resetCodeDisplay();
		const response = await axios.get(`http://localhost:8000/wp-json/wp/v2/code_explainer/${this.id}`);
		this.data = response.data;
		this.title.innerHTML = this.data.title.rendered;
		this.text.innerHTML = this.data.content.rendered;
		postscribe(this.htmlCode, this.data.html_gist);
		postscribe(this.cssCode, this.data.css_gist);
		postscribe(this.jsCode, this.data.js_gist);
		postscribe(this.phpCode, this.data.php_gist);
		this.hideCodeLinks();
		this.showLinks();
	}

	show(id) {
		if (this.id !== id) {
			this.id = id;
			this.updateDisplay();
		}
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

	resetCodeDisplay() {
		this.htmlCode.innerHTML = '';
		this.jsCode.innerHTML = '';
		this.cssCode.innerHTML = '';
		this.phpCode.innerHTML = '';
		this.deactivateLinks();
		this.hideCodeBlocks();
		this.hideCodeLinks();
	}

	hideCodeLinks() {
		[this.jsLink, this.cssLink, this.htmlLink, this.phpLink].forEach(codeLink => {
			codeLink.style.display = 'none';
		});
	}

	hideCodeBlocks() {
		[this.cssCode, this.jsCode, this.htmlCode, this.phpCode].forEach(codeDiv => (codeDiv.style.display = 'none'));
	}

	deactivateLinks() {
		[this.jsLink, this.cssLink, this.htmlLink, this.phpLink].forEach(codeLink => {
			codeLink.classList.remove('active');
		});
	}
	showLinks() {
		if (this.data.php_gist) {
			this.phpLink.style.display = 'list-item';
			this.showPhp();
		}
		if (this.data.js_gist) {
			this.jsLink.style.display = 'list-item';
			this.showJs();
		}
		if (this.data.css_gist) {
			this.cssLink.style.display = 'list-item';
			this.showCss();
		}
		if (this.data.html_gist) {
			this.htmlLink.style.display = 'list-item';
			this.showHtml();
		}
	}
	showHtml() {
		this.deactivateLinks();
		this.hideCodeBlocks();
		this.htmlCode.style.display = 'block';
		this.htmlLink.classList.add('active');
	}

	showJs() {
		this.deactivateLinks();
		this.hideCodeBlocks();
		this.jsCode.style.display = 'block';
		this.jsLink.classList.add('active');
	}
	showCss() {
		this.deactivateLinks();
		this.hideCodeBlocks();
		this.cssCode.style.display = 'block';
		this.cssLink.classList.add('active');
	}

	showPhp() {
		this.deactivateLinks();
		this.hideCodeBlocks();
		this.phpCode.style.display = 'block';
		this.phpLink.classList.add('active');
	}
}

const codeModal = new CodeModal();
setTimeout(() => {
	codeModal.showTooltipsButton();
}, 500);
