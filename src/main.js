import { io } from "socket.io-client"

const socket = io("https://fwd.innopolis.university")

const msgs = document.getElementById("msgs");
const input_form = document.getElementById("input_form");
const input_msg = document.getElementById("input_msg");

// for (let i = 0; i < 25; i++) {
//     const item = document.createElement("li");
//     item.textContent = `Item #${i + 1}`;
//     msgs.appendChild(item);
// }    
msgs.scrollTo(0, msgs.scrollHeight);

socket.on("chat message", (msg) => {
    console.log(msg);
    const item = document.createElement("li");
    item.textContent = msg;
    msgs.appendChild(item);
    msgs.scrollTo(0, msgs.scrollHeight);
})

input_form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (input_msg.value.length)
        socket.emit("chat message", input_msg.value);
    input_msg.value = "";
})



class SelectableImage {
    constructor(id) {
        this.id = id;
        this.image = document.querySelector(`#${this.id} + .selectableimglabel > .selectableimg`);
        this.image_double = document.querySelector(`#${this.id} + .selectableimglabel + .selectableimgdouble`);
        this.title = document.querySelector(`#${this.id} + .selectableimglabel + .selectableimgdouble + p`);
        this.image_double.setAttribute("alt", "duplicate")
    }
    setImage(img, alt) {
        this.image.setAttribute("src", img)
        this.image.setAttribute("alt", alt)
        this.image_double.setAttribute("src", img)
    }
    setTitle(txt) {
        this.title.textContent = txt;
    }
}

const my_email = "i.iskakov@innopolis.university";

const comic_url = new URL("https://fwd.innopolis.university/api/comic");
const hw2_url = new URL("https://fwd.innopolis.university/api/hw2");
const hw2_params = new URLSearchParams([["email", my_email]]).toString();

let comic_img = new SelectableImage("comic");
const comic_refresh_btn = document.getElementById("comicrefresh");
const comic_date = document.getElementById("comicdate");

request_comic_id();
comic_refresh_btn.addEventListener("click", request_comic_id);

function request_comic_id() {
    fetch(`${hw2_url.origin}${hw2_url.pathname}?${hw2_params}`, { method: "GET" })
    .then((response) => response.text())
    .then((res) => {
        console.log(`Retrieved id: ${res}`);
        request_comic(res);
    }).catch((err) => {
        console.log(`Error on getting the Comic ID: ${err}`);
    })
}

// async
function request_comic(id) {
    fetch(`${comic_url.origin}${comic_url.pathname}?${new URLSearchParams([["id", id]]).toString()}`, { method: "GET" })
    .then((response) => response.json())
    .then((res) => {
        console.log(`Retrieved comic:`);
        console.log(res);
        
        comic_img.setImage(res.img, res.alt);
        comic_img.setTitle(res.safe_title);

        const date = new Date(res.year, res.month, res.day);
        comic_date.textContent = `Upload Date: ${date.toLocaleDateString()}`;
    })
    .catch((err) => {
        console.log(`Error on getting the Comic: ${err}`);
    })
   
    // no err handling
    // const response = await fetch(`${comic_url.origin}${comic_url.pathname}?${new URLSearchParams([["id", id]]).toString()}`, { method: "GET" })
    // const res = await response.json();

    // console.log(`Retrieved comic:`);
    // console.log(res);
    
    // comic_img.setImage(res.img, res.alt);
    // comic_img.setTitle(res.safe_title);

    // const date = new Date(res.year, res.month, res.day);
    // comic_date.textContent = `Upload Date: ${date.toLocaleDateString()}`;
}
