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
    updateWords(['Dark mode',
        'Notifications enabled',
        'Language: English',
        'Auto-update apps',
        'Privacy: High',
        'Font size: Medium',
        'Location services enabled',
        'Backup enabled',
        'Two-factor authentication',
        'Auto-play videos disabled']);
})

function updateWords(array) {
    preferences.replaceChildren();
    // array = JSON.parse(array);
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
    const responseElement = document.getElementById('response');

    const response = await fetch('http://192.168.93.133:5000/prefs', {
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