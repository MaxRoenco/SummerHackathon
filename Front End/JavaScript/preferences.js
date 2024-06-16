let IP = "http://192.168.43.133:5000"

let prefsCont = document.querySelector(".preferencesContainer");
let preferences = document.getElementById('preferences');
preferences.replaceChildren();
let inputTwoFactor = document.querySelector('#inputTwoFactor');
let factorButton = document.querySelector('.factorButton');
let preferenceWord;
let product = "";
let choices = new Set();
let preferenceButton = document.querySelector('.preferenceButton');
let imgBtn = document.querySelector("#imgSrch");
let imgCnt = document.querySelector(".file-uploader");
let displayed = false;
imgCnt.style.display = "none";

preferenceButton.addEventListener("click", _ => {
    document.querySelector(".cardsContainer").replaceChildren();
    let strArr = JSON.stringify(Array.from(choices));
    getArticles(product + ": " + strArr);
})

imgBtn.addEventListener("click", _ => {
    displayed = !displayed;
    if(displayed) {
        imgCnt.style.display = "";
    } else {
        imgCnt.style.display = "none";
    }
})

factorButton.addEventListener('click', () => {
    preferenceWord = inputTwoFactor.value;
    if(preferenceWord.length < 1) return;
    factorButton.style.display = "none";
    imgCnt.style.display = "none";
    imgBtn.style.display = "none";
    console.log(preferenceWord);
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
        let span = document.createElement('span');
        span.classList.add('tooltip');
        span.textContent = "some text here";
        div.textContent = value;
        div.append(span);
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
    const response = await fetch(IP+'/prefs', {
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
    const response = await fetch(IP+'/recs', {
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

    for (const [key, value] of Object.entries(data['result'])) {
        for(link of value) {
            addCard(key, link);
        }
    }

}

function addCard(title, url) {
    let ele = document.createElement("a");
    ele.classList.add("card");
    ele.textContent = title;
    ele.href = url;
    document.querySelector(".cardsContainer").append(ele);
}