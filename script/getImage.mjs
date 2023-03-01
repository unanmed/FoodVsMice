import axios from 'axios';
import fs from 'fs/promises';

(async function () {
    const data = await fs.readFile('./xml/json/card_desc.json');
    const json = JSON.parse(data);
    const files = json.card_desc.item;
    console.time('Get done');
    const nn = Math.ceil(files.length / 100);
    const arr = Array(nn)
        .fill(0)
        .map((v, i) => i);
    for await (const n of [0, 1, 2, 3, 4, 5]) {
        for await (const nn of arr) {
            await Promise.all(
                Array(100)
                    .fill(0)
                    .map((v, i) => {
                        if (!files[i + nn * 100]) return;
                        return loadSWF(files[i + nn * 100]._id, n);
                    })
            );
            console.log(`${nn * 100 + 100} done`);
        }
        console.log(`${n}done`);
    }
    console.timeEnd('Get done');
})();

async function loadSWF(url, from) {
    const base = 'https://q.ms.huanlecdn.com/4399/cdn.123u.com/';
    const file = `${base}images/1/${from}/${url}.png`;
    try {
        const data = await axios.get(file, {
            responseType: 'text',
            responseEncoding: 'base64'
        });
        const base64 = data.data.replace(/^data:image\/\w+;base64,/, '');
        const res = Buffer.from(base64, 'base64');
        const name = url.split('/').at(-1);

        await fs.writeFile(`./public/images/0/${name}.png`, res);
    } catch {}
}
