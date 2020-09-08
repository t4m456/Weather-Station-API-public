const checkButton = document.querySelector(".check");

const huText1 = document.querySelector(".hu-text1");
const huText2 = document.querySelector(".hu-text2");
const huText3 = document.querySelector(".hu-text3");
const huText4 = document.querySelector(".hu-text4");

const enText1 = document.querySelector(".en-text1");
const enText2 = document.querySelector(".en-text2");
const enText3 = document.querySelector(".en-text3");
const enText4 = document.querySelector(".en-text4");

class Language {

    switchTheLanguage(){

        checkButton.addEventListener("click", this.statusChange);
        
    }

    statusChange(){

        var langOption = document.getElementById("check-toggle").checked;

        if (langOption == true){

            huText1.classList.add("no-display");
            huText2.classList.add("no-display");
            huText3.classList.add("no-display");
            huText4.classList.add("no-display");

            enText1.classList.remove("no-display");
            enText2.classList.remove("no-display");
            enText3.classList.remove("no-display");
            enText4.classList.remove("no-display");
        }else {
            huText1.classList.remove("no-display");
            huText2.classList.remove("no-display");
            huText3.classList.remove("no-display");
            huText4.classList.remove("no-display");

            enText1.classList.add("no-display");
            enText2.classList.add("no-display");
            enText3.classList.add("no-display");
            enText4.classList.add("no-display");
        }
        
    }
}

document.addEventListener("DOMContentLoaded", () => {


    const language = new Language();

    language.switchTheLanguage();

})