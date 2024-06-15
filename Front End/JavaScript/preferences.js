let preferences = document.getElementById('preferences');
preferences.replaceChildren();
let inputTwoFactor = document.querySelector('#inputTwoFactor');
let factorButton = document.querySelector('.factorButton');
let preferenceWord;

factorButton.addEventListener('click', () => {
    preferenceWord = inputTwoFactor.value;
    console.log(preferenceWord);
    inputTwoFactor.value = '';
    sendRequest(preferenceWord);
})

function updateWords(array) {
    preferences.replaceChildren();
    array = JSON.parse(array);
    array.forEach(value => {
        let div = document.createElement('div');
        div.classList.add('preference');
        div.textContent = value;
        preferences.appendChild(div);
    });
}

async function sendRequest(input) {
    const responseElement = document.getElementById('response');

    const response = await fetch('http://192.168.43.133:5000/process', {
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