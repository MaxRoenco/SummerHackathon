let prefsCont = document.querySelector(".preferencesContainer");
let preferences = document.getElementById('preferences');
preferences.replaceChildren();
let inputTwoFactor = document.querySelector('#inputTwoFactor');
let factorButton = document.querySelector('.factorButton');
let preferenceWord;
let product = "";
let choices = new Set();
let preferenceButton = document.querySelector('.preferenceButton');

preferenceButton.addEventListener("click", _ => {
    let strArr = JSON.stringify(Array.from(choices));
    getArticles(product + strArr);
})

factorButton.addEventListener('click', () => {
    preferenceWord = inputTwoFactor.value;
    console.log(preferenceWord);
    inputTwoFactor.value = '';
    sendRequest(preferenceWord);
})

function updateWords(array) {
    prefsCont.style.visibility = 'visible';
    choices = new Set();
    preferences.replaceChildren();
    array = JSON.parse(array);
    array.forEach(value => {
        let div = document.createElement('div');
        div.classList.add('preference');
        div.textContent = value;
        div.addEventListener('click', () => {
            console.log(choices.size);
            div.classList.toggle('active');
            if (choices.has(value)) {
                choices.delete(value);
            } else {
                choices.add(value);
            }
            if (choices.size === 0) {
                preferenceButton.style.visibility = 'hidden';
            } else {
                preferenceButton.style.visibility = 'visible';
            }
            console.log([...choices]);
        })
        preferences.appendChild(div);
    });
}

async function sendRequest(input) {
    product = input;
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

async function getArticles(input) {
    const response = await fetch('http://192.168.43.133:5000/recs', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ input: input })
    });
    const data = await response.json();
    if (response.ok) {
        console.log(data)
    } else {
        console.log(`Error: ${data.error}`)
    }
}

function addCard(title, url) {
    let ele = document.createElement("a");
    ele.classList.add("card");
    addCard.textContent = title;
    ele.href = url;
    document.querySelector(".cardsContainer").append(ele);
}

addCard("omg", "");
addCard("lol", "");