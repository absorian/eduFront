import { io } from "socket.io-client"
import { formatDistanceToNow } from 'date-fns'

type Message = {
    username: string;
    content: string;
}

const msgs = document.getElementById("msgs") as HTMLUListElement;
if (msgs !== null) {
    const socket = io("https://fwd.innopolis.university")
    
    const input_form = document.getElementById("input_form") as HTMLFormElement;
    const input_username = document.getElementById("input_username") as HTMLInputElement;
    const input_msg = document.getElementById("input_msg") as HTMLInputElement;

    // for (let i = 0; i < 25; i++) {
    //     const item = document.createElement("li");
    //     item.textContent = `Item #${i + 1}`;
    //     msgs.appendChild(item);
    // }    
    msgs.scrollTo(0, msgs.scrollHeight);

    socket.on("chat message", (msg: Message) => {
        console.log(msg);
        const item = document.createElement("li");
        item.textContent = `${msg.username}: ${msg.content}`;
        msgs.appendChild(item);
        msgs.scrollTo(0, msgs.scrollHeight);
    })

    input_form.addEventListener("submit", (e) => {
        e.preventDefault();
        const msg: Message = {
            username: input_username.value,
            content: input_msg.value,
        }
        if (input_msg.value.length)
            socket.emit("chat message", msg);
        input_msg.value = "";
    })
}



class SelectableImage {
    id: string;
    image: HTMLImageElement;
    image_double: HTMLImageElement;
    title: HTMLParagraphElement;
    constructor(id: string) {
        this.id = id;
        this.image = document.querySelector(`#${this.id} + .selectableimglabel > .selectableimg`) as HTMLImageElement;
        this.image_double = document.querySelector(`#${this.id} + .selectableimglabel + .selectableimgdouble`) as HTMLImageElement;
        this.title = document.querySelector(`#${this.id} + .selectableimglabel + .selectableimgdouble + p`) as HTMLParagraphElement;
        this.image_double.setAttribute("alt", "duplicate")
    }
    setImage(img: string, alt: string) {
        this.image.setAttribute("src", img)
        this.image.setAttribute("alt", alt)
        this.image_double.setAttribute("src", img)
    }
    setTitle(txt: string) {
        this.title.textContent = txt;
    }
}

if (document.getElementById("comic") !== null) {
    const my_email = "i.iskakov@innopolis.university";

    const comic_url = new URL("https://fwd.innopolis.university/api/comic");
    const hw2_url = new URL("https://fwd.innopolis.university/api/hw2");
    const hw2_params = new URLSearchParams([["email", my_email]]).toString();

    let comic_img = new SelectableImage("comic");
    const comic_refresh_btn = document.getElementById("comicrefresh") as HTMLButtonElement;
    const comic_date = document.getElementById("comicdate") as HTMLParagraphElement;

    request_comic_id();
    comic_refresh_btn.addEventListener("click", request_comic_id);

    function request_comic_id() {
        fetch(`${hw2_url.origin}${hw2_url.pathname}?${hw2_params}`, { method: "GET" })
        .then((response) => response.text())
        .then((res) => {
            console.log(`Retrieved id: ${res}`);
            request_comic(res);
        })
        // .catch((err) => {
        //     console.log(`Error on getting the Comic ID: ${err}`);
        // })
    }

    function request_comic(id: string) {
        fetch(`${comic_url.origin}${comic_url.pathname}?${new URLSearchParams([["id", id]]).toString()}`, { method: "GET" })
        .then((response) => response.json())
        .then((res) => {
            console.log(`Retrieved comic:`);
            console.log(res);
            
            comic_img.setImage(res.img, res.alt);
            comic_img.setTitle(res.safe_title);

            comic_date.textContent = `Published ${formatDistanceToNow(new Date(res.year, res.month, res.day))} ago`;
        })
        // .catch((err) => {
        //     console.log(`Error on getting the Comic: ${err}`);
        // })
    }
}
