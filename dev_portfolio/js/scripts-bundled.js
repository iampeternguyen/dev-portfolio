const splashScreenContent=document.getElementsByClassName("splashScreen__content")[0],splashScreenBackground=document.getElementsByClassName("splashScreen__background")[0];splashScreenContent.addEventListener("mouseover",()=>{splashScreenBackground.classList.add("hover")}),splashScreenContent.addEventListener("mouseout",()=>{splashScreenBackground.classList.remove("hover")}),splashScreenContent.addEventListener("click",()=>{const e=document.getElementsByClassName("splashScreen__image")[0],s=getComputedStyle(e);e.style.maxHeight=s.height,e.style.maxWidth=s.width;const n=Array.from(splashScreenBackground.children);n.push(e),n.forEach(e=>e.classList.add("onClose")),setTimeout(()=>{document.getElementById("splashScreen").style.display="none"},700)});