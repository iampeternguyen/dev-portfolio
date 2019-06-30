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
		this.htmlLink = document.getElementsByClassName('codeModal__htmlLink')[0];
		this.cssLink = document.getElementsByClassName('codeModal__cssLink')[0];
		this.jsLink = document.getElementsByClassName('codeModal__jsLink')[0];
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
		const response = await axios.get(`http://localhost:8000/wp-json/wp/v2/code_explainer/${this.id}`);
		const data = response.data;

		postscribe(this.htmlCode, data.html_gist);
		postscribe(this.cssCode, data.css_gist);
		postscribe(this.jsCode, data.js_gist);
	}

	show(id) {
		if (this.id !== id) {
			this.id = id;
			this.updateDisplay();
		}
		this.modal.classList.remove('close');
		this.modal.style.display = 'flex';
		this.modal.classList.add('open');
		this.showHtml();
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
setTimeout(() => {
	codeModal.showTooltipsButton();
}, 500);
