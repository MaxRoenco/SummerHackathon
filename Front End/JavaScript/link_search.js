let IP = "http://192.168.43.133:5000"
let input = document.querySelector("#inputlink");
let btn = document.querySelector(".linkButton");
let out = document.querySelector("#output");

btn.addEventListener("click", _ => {
    console.log("sup");
    getComp(input.value);
})

async function getComp(url) {
    const response = await fetch(IP+'/comp', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ input: url })
    });
    const data = await response.json();
    if (response.ok) {
        console.log(data)
        out.textContent = data["result"];
    } else {
        console.log(`Error: ${data.error}`)
    }
}