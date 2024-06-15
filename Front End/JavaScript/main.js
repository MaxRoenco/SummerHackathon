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

let twoFactorQuiz = document.querySelector('.TwoFactorQuizz');
let interests = document.querySelector('.modal');
let searchLink;