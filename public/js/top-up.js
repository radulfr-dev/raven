let topUpSelect = document.getElementById('top-up-mode');
let formDisplayed = null;

topUpSelect.onchange = function(){
    renderCorrectOptions(this.value);
}

async function renderCorrectOptions(mode){
    if(formDisplayed !== null){
        await fadeOutMenu(formDisplayed);
    }

    const formId = humanTextToClassName(mode);

    fadeInMenu(formId);
}

async function fadeOutMenu(formId){

    let form = document.getElementById(formId);
    let currentOpacity = 1.0;

    return new Promise((resolve, reject) => {

        form.style.opacity = '1.0';
        let fader = setInterval(() => {

            let newOpacity = parseFloat(form.style.opacity) - 0.1;
            form.style.opacity = newOpacity.toString();
            if(form.style.opacity <= '0.0'){
                form.style.display = 'none';
                clearInterval(fader);
                resolve(true);
            }

        }, 50);
    });

}

async function fadeInMenu(formId){

    let form = document.getElementById(formId);

    return new Promise((resolve, reject) => {

        form.style.display = 'block';
        form.style.opacity = '0.0';

        let fader = setInterval(() => {

            let newOpacity = parseFloat(form.style.opacity) + 0.1;
            form.style.opacity = newOpacity.toString();
            if(form.style.opacity >= '1.0'){
                clearInterval(fader);
                formDisplayed = formId;
                resolve(true);
            }

        }, 50);
    });

}

function humanTextToClassName(text){
    text = text.toLowerCase();
    return text.replaceAll(' ','-');
}
