import { formatDistanceToNow } from 'date-fns';

import type { LoadEvent } from "@sveltejs/kit";
import type { ImageData } from "$lib/ImageBox";

export const ssr = true;
export const csr = false; // no need

const my_email = 'i.iskakov@innopolis.university';

const comic_url = new URL('https://fwd.innopolis.university/api/comic');
const hw2_url = new URL('https://fwd.innopolis.university/api/hw2');
const hw2_params = new URLSearchParams([['email', my_email]]).toString();

export const load = async (e: LoadEvent): Promise<{img: ImageData; date: string}> => {
    // the page won't load until the image is retrieved, I felt that
    const id_response: Response = await fetch(`${hw2_url.origin}${hw2_url.pathname}?${hw2_params}`, { method: 'GET' })
    const id: string = await id_response.text()
    console.log(`Retrieved id: ${id}`);
    
    const comic_response: Response = await fetch(
        `${comic_url.origin}${comic_url.pathname}?${new URLSearchParams([['id', id]]).toString()}`,
        { method: 'GET' }
    )
    const comic = await comic_response.json()

    console.log(`Retrieved comic:`);
    console.log(comic);

    return {
        img: {
            src: comic.img,
            alt: comic.alt,
            title: comic.safe_title
        },
        date: `Picture was published ${formatDistanceToNow(new Date(comic.year, comic.month, comic.day))} ago`
    }
}