let IP = "http://192.168.43.133:5000"
let input1 = document.querySelector("#firstLink");
let input2 = document.querySelector("#secondLink");
let btn = document.querySelector(".compareButton");

btn.addEventListener("click", _ => {
    let msg = [input1.value, input2.value];
    send(JSON.stringify(msg));
})


async function send(input) {
    const response = await fetch(IP+'/vs', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ input: input })
    });
    const data = await response.json();
    if (response.ok) {
        document.querySelector("#output").textContent = data.result;
        // console.log(data.result);
    } else {
        console.log(`Error: ${data.error}`)
    }
}