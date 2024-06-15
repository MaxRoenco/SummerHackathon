let prefsCont = document.querySelector(".preferencesContainer");
let preferences = document.getElementById('preferences');
preferences.replaceChildren();
let inputTwoFactor = document.querySelector('#inputTwoFactor');
let factorButton = document.querySelector('.factorButton');
let preferenceWord;
let choices = new Set();

factorButton.addEventListener('click', () => {
    preferenceWord = inputTwoFactor.value;
    console.log(preferenceWord);
    inputTwoFactor.value = '';
    sendRequest(preferenceWord);
})

function updateWords(array) {
    choices = new Set();
    preferences.replaceChildren();
    array = JSON.parse(array);
    array.forEach(value => {
        let div = document.createElement('div');
        div.classList.add('preference');
        div.textContent = value;
        div.addEventListener('click', () => {
            div.classList.toggle('active');
            if (choices.has(value)) {
                choices.delete(value);
            } else {
                choices.add(value);
            }
            console.log([...choices]);
        })
        preferences.appendChild(div);
    });
}

async function sendRequest(input) {
    const response = await fetch('http://192.168.43.133:5000/prefs', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ input: input })
    });

    const data = await response.json();

    if (response.ok) {
        updateWords(data.result);
    }
}