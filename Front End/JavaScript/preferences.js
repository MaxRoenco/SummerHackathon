let preferences = document.getElementById('preferences');
let arrPreferences = [
    'Dark mode',
    'Notifications enabled',
    'Language: English',
    'Auto-update apps',
    'Privacy: High',
    'Font size: Medium',
    'Location services enabled',
    'Backup enabled',
    'Two-factor authentication',
    'Auto-play videos disabled'
];

let inputTwoFactor = document.querySelector('#inputTwoFactor');
let factorButton = document.querySelector('.factorButton');
let preferenceWord;

factorButton.addEventListener('click', () => {
    preferenceWord = inputTwoFactor.value;
    console.log(preferenceWord);
    inputTwoFactor.value = '';
})

arrPreferences.forEach((value, index) => {
    let div = document.createElement('div');
    div.classList.add('preference');
    div.textContent = value;
    preferences.appendChild(div);
});

async function sendRequest(input) {
    const responseElement = document.getElementById('response');

    const response = await fetch('http://127.0.0.1:5000/process', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ input: numberInput })
    });

    const data = await response.json();

    if (response.ok) {
        responseElement.textContent = `Number: ${data.result}`;
    } else {
        responseElement.textContent = `Error: ${data.error}`;
    }
}