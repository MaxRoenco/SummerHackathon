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


