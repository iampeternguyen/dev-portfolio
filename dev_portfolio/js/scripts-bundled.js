class CodeModal{constructor(){this.setUpProperties(),this.setUpEventListners()}setUpProperties(){this.modal=document.getElementsByClassName("codeModal")[0],this.data={},this.id=null,this.tooltipsButtonContainer=document.getElementsByClassName("tooltipButton__container")[0],this.tooltipsButton=document.getElementsByClassName("tooltipButton__button")[0],this.tooltipsButtonTooltip=document.getElementsByClassName("tooltipButton__tooltip")[0],this.tooltips=Array.from(document.getElementsByClassName("code__tooltip")),this.container=document.getElementsByClassName("codeModal__container")[0],this.closeButton=document.getElementsByClassName("codeModal__closeButton")[0],this.jsCode=document.getElementsByClassName("codeModal__codeSnippetsJs")[0],this.cssCode=document.getElementsByClassName("codeModal__codeSnippetsCss")[0],this.htmlCode=document.getElementsByClassName("codeModal__codeSnippetsHtml")[0],this.phpCode=document.getElementsByClassName("codeModal__codeSnippetsPhp")[0],this.htmlLink=document.getElementsByClassName("codeModal__htmlLink")[0],this.cssLink=document.getElementsByClassName("codeModal__cssLink")[0],this.jsLink=document.getElementsByClassName("codeModal__jsLink")[0],this.phpLink=document.getElementsByClassName("codeModal__phpLink")[0],this.title=document.getElementsByClassName("codeModal__title")[0],this.text=document.getElementsByClassName("codeModal__text")[0]}showTooltipsButton(){this.tooltipsButtonContainer.style.visibility="visible",this.tooltipsButton.classList.add("visible"),this.tooltipsButtonTooltip.classList.add("visible")}closeTooltipsButtonTooltip(){this.tooltipsButtonTooltip.classList.remove("visible"),this.tooltipsButtonTooltip.classList.add("close")}setUpEventListners(){this.modal.addEventListener("click",t=>{this.hide()}),this.closeButton.addEventListener("click",t=>{this.hide()}),this.container.addEventListener("click",t=>{t.stopPropagation()}),this.htmlLink.addEventListener("click",t=>{this.showHtml()}),this.cssLink.addEventListener("click",t=>{this.showCss()}),this.jsLink.addEventListener("click",t=>{this.showJs()}),this.phpLink.addEventListener("click",t=>{this.showPhp()})}switchTooltips(){this.closeTooltipsButtonTooltip(),this.tooltipsVisible?(this.tooltips.forEach(t=>t.classList.remove("active")),this.tooltipsButton.classList.remove("active"),this.tooltipsVisible=!1):(this.tooltips.forEach(t=>t.classList.add("active")),this.tooltipsButton.classList.add("active"),this.tooltipsVisible=!0)}async updateDisplay(){this.resetCodeDisplay();const t=await axios.get(`http://localhost:8000/wp-json/wp/v2/code_explainer/${this.id}`);this.data=t.data,this.title.innerHTML=this.data.title.rendered,this.text.innerHTML=this.data.content.rendered,postscribe(this.htmlCode,this.data.html_gist),postscribe(this.cssCode,this.data.css_gist),postscribe(this.jsCode,this.data.js_gist),postscribe(this.phpCode,this.data.php_gist),this.hideCodeLinks(),this.showLinks()}show(t){this.id!==t&&(this.id=t,this.updateDisplay()),this.modal.classList.remove("close"),this.modal.style.display="flex",this.modal.classList.add("open")}hide(){this.modal.classList.add("close"),setTimeout(()=>{this.modal.classList.remove("open"),this.modal.style.display="none"},500)}resetCodeDisplay(){this.htmlCode.innerHTML="",this.jsCode.innerHTML="",this.cssCode.innerHTML="",this.phpCode.innerHTML="",this.deactivateLinks(),this.hideCodeBlocks(),this.hideCodeLinks()}hideCodeLinks(){[this.jsLink,this.cssLink,this.htmlLink,this.phpLink].forEach(t=>{t.style.display="none"})}hideCodeBlocks(){[this.cssCode,this.jsCode,this.htmlCode,this.phpCode].forEach(t=>t.style.display="none")}deactivateLinks(){[this.jsLink,this.cssLink,this.htmlLink,this.phpLink].forEach(t=>{t.classList.remove("active")})}showLinks(){this.data.php_gist&&(this.phpLink.style.display="list-item",this.showPhp()),this.data.js_gist&&(this.jsLink.style.display="list-item",this.showJs()),this.data.css_gist&&(this.cssLink.style.display="list-item",this.showCss()),this.data.html_gist&&(this.htmlLink.style.display="list-item",this.showHtml())}showHtml(){this.deactivateLinks(),this.hideCodeBlocks(),this.htmlCode.style.display="block",this.htmlLink.classList.add("active")}showJs(){this.deactivateLinks(),this.hideCodeBlocks(),this.jsCode.style.display="block",this.jsLink.classList.add("active")}showCss(){this.deactivateLinks(),this.hideCodeBlocks(),this.cssCode.style.display="block",this.cssLink.classList.add("active")}showPhp(){this.deactivateLinks(),this.hideCodeBlocks(),this.phpCode.style.display="block",this.phpLink.classList.add("active")}}const codeModal=new CodeModal;setTimeout(()=>{codeModal.showTooltipsButton()},500),document.addEventListener("DOMContentLoaded",function(){new Vue({el:"#projectGallery__projects",data:{responseData:[]},computed:{projects:function(){if(0!==this.responseData.length){return this.responseData.map(t=>this.filterProjectData(t))}}},methods:{showBack:function(t){document.getElementById(t).classList.add("show")},hideBack:function(t){document.getElementById(t).classList.remove("show")},filterProjectData:function(t){return{title:t.title.rendered,summary:t.summary,highlights:t.highlights.split(",").filter(t=>""!=t.trim()),demo_link:t.demo_link,github_link:t.github_link,image:t.featured_image}}},async mounted(){const t=await axios.get("http://localhost:8000/wp-json/wp/v2/project/");this.responseData=t.data}})}),document.getElementsByClassName("splashScreen__circle")[0].addEventListener("click",()=>{const t=document.getElementById("splashScreen"),s=document.getElementsByClassName("splashScreen__background")[0],e=document.getElementsByClassName("splashScreen__image")[0],i=getComputedStyle(e);e.style.maxHeight=i.height,e.style.maxWidth=i.width;const o=Array.from(s.children);o.push(e,s,t),o.forEach(t=>t.classList.add("close")),codeModal.closeTooltipsButtonTooltip(),setTimeout(()=>{t.style.display="none"},1e3)});