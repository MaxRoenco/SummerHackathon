document.addEventListener("DOMContentLoaded", function () {
    const inputField = document.getElementById("inputTwoFactor");

    inputField.addEventListener("focus", function () {
        this.placeholder = "";
    });

    inputField.addEventListener("blur", function () {
        if (this.value === "") {
            this.placeholder = "E.g: TV, car, processor";
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const inputField = document.getElementById("inputlink");

    inputField.addEventListener("focus", function () {
        this.placeholder = "";
    });

    inputField.addEventListener("blur", function () {
        if (this.value === "") {
            this.placeholder = "Link...";
        }
    });
});

try {
    let firstLink = document.querySelector('#firstLink');
    let secondLink = document.querySelector('#secondLink');

    firstLink.addEventListener('focus', () => {
        firstLink.placeholder = "";
    })
    firstLink.addEventListener('blur', () => {
        firstLink.placeholder = "First Link";
    })
    secondLink.addEventListener('focus', () => {
        secondLink.placeholder = "";
    })
    secondLink.addEventListener('blur', () => {
        secondLink.placeholder = "Second Link";
    })
} catch (error) {
    console.log(error);
}

let twoFactorQuiz = document.querySelector('.TwoFactorQuizz');
let interests = document.querySelector('.modal');
let searchLink;

const typedTextSpan = document.querySelector(".typed-text");
const cursor = document.querySelector(".cursor");

let words = ['Fast', 'Funny', 'Cool', 'Interesting', 'Usefull'];

const typingDelay = 200;
const erasingDelay = 200;
const newLetterDelay = 2000;
let index = 0;
let charIndex = 0;

document.addEventListener('DOMContentLoaded', () => {
    if (words.length) {
        setTimeout(type, newLetterDelay);
    }
})

function type() {
    if (charIndex < words[index].length) {
        typedTextSpan.textContent += words[index].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
    } else {
        setTimeout(erase, newLetterDelay);
    }
}

function erase() {
    if (charIndex > 0) {
        typedTextSpan.textContent = words[index].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, erasingDelay);
    } else {
        index++;
        if (index >= words.length) {
            index = 0;
        }
        setTimeout(type, typingDelay + 1100);
    }
}