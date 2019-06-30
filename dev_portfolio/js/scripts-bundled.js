class CodeModal{constructor(){this.setUpProperties(),this.setUpEventListners()}setUpProperties(){this.modal=document.getElementsByClassName("codeModal")[0],this.data={},this.id=null,this.tooltipsButtonContainer=document.getElementsByClassName("tooltipButton__container")[0],this.tooltipsButton=document.getElementsByClassName("tooltipButton__button")[0],this.tooltipsButtonTooltip=document.getElementsByClassName("tooltipButton__tooltip")[0],this.tooltips=Array.from(document.getElementsByClassName("code__tooltip")),this.container=document.getElementsByClassName("codeModal__container")[0],this.closeButton=document.getElementsByClassName("codeModal__closeButton")[0],this.jsCode=document.getElementsByClassName("codeModal__codeSnippetsJs")[0],this.cssCode=document.getElementsByClassName("codeModal__codeSnippetsCss")[0],this.htmlCode=document.getElementsByClassName("codeModal__codeSnippetsHtml")[0],this.htmlLink=document.getElementsByClassName("codeModal__htmlLink")[0],this.cssLink=document.getElementsByClassName("codeModal__cssLink")[0],this.jsLink=document.getElementsByClassName("codeModal__jsLink")[0]}showTooltipsButton(){this.tooltipsButtonContainer.style.visibility="visible",this.tooltipsButton.classList.add("visible"),this.tooltipsButtonTooltip.classList.add("visible")}closeTooltipsButtonTooltip(){this.tooltipsButtonTooltip.classList.remove("visible"),this.tooltipsButtonTooltip.classList.add("close")}setUpEventListners(){this.modal.addEventListener("click",t=>{this.hide()}),this.closeButton.addEventListener("click",t=>{this.hide()}),this.container.addEventListener("click",t=>{t.stopPropagation()}),this.htmlLink.addEventListener("click",t=>{this.showHtml()}),this.cssLink.addEventListener("click",t=>{this.showCss()}),this.jsLink.addEventListener("click",t=>{this.showJs()})}switchTooltips(){this.tooltipsVisible?(this.tooltips.forEach(t=>t.classList.remove("active")),this.tooltipsButton.classList.remove("active"),this.tooltipsVisible=!1):(this.tooltips.forEach(t=>t.classList.add("active")),this.tooltipsButton.classList.add("active"),this.tooltipsVisible=!0)}async updateDisplay(){const t=(await axios.get(`http://localhost:8000/wp-json/wp/v2/code_explainer/${this.id}`)).data;postscribe(this.htmlCode,t.html_gist),postscribe(this.cssCode,t.css_gist),postscribe(this.jsCode,t.js_gist)}show(t){this.id!==t&&(this.id=t,this.updateDisplay()),this.modal.classList.remove("close"),this.modal.style.display="flex",this.modal.classList.add("open"),this.showHtml()}hide(){this.modal.classList.add("close"),setTimeout(()=>{this.modal.classList.remove("open"),this.modal.style.display="none"},500)}hideElements(){[this.cssCode,this.jsCode,this.htmlCode].forEach(t=>t.style.display="none"),[this.jsLink,this.cssLink,this.htmlLink].forEach(t=>t.classList.remove("active"))}showHtml(){this.hideElements(),this.htmlCode.style.display="block",this.htmlLink.classList.add("active")}showJs(){this.hideElements(),this.jsCode.style.display="block",this.jsLink.classList.add("active")}showCss(){this.hideElements(),this.cssCode.style.display="block",this.cssLink.classList.add("active")}}const codeModal=new CodeModal;function testClick(t){console.log(t)}setTimeout(()=>{codeModal.showTooltipsButton()},500),document.addEventListener("DOMContentLoaded",function(){new Vue({el:"#projectGallery__projects",data:{responseData:[]},computed:{projects:function(){if(0!==this.responseData.length){console.log(this.responseData);const t=this.responseData.map(t=>this.filterProjectData(t));return console.log(t),t}}},methods:{showBack:function(t){document.getElementById(t).classList.add("show")},hideBack:function(t){document.getElementById(t).classList.remove("show")},filterProjectData:function(t){return{title:t.title.rendered,summary:t.summary,highlights:t.highlights.split(",").filter(t=>""!=t.trim()),demo_link:t.demo_link,github_link:t.github_link,image:t.featured_image}}},async mounted(){const t=await axios.get("http://localhost:8000/wp-json/wp/v2/project/");this.responseData=t.data}})}),document.getElementsByClassName("splashScreen__circle")[0].addEventListener("click",()=>{const t=document.getElementById("splashScreen"),s=document.getElementsByClassName("splashScreen__background")[0],e=document.getElementsByClassName("splashScreen__image")[0],o=getComputedStyle(e);e.style.maxHeight=o.height,e.style.maxWidth=o.width;const i=Array.from(s.children);i.push(e,s,t),i.forEach(t=>t.classList.add("close")),codeModal.closeTooltipsButtonTooltip(),setTimeout(()=>{t.style.display="none"},1e3)});