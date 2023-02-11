import fs from 'fs/promises';

(async function () {
    const data = await fs.readFile(`./har/my.4399.com.har`);
    const u = await fs.readFile(`./har/used.json`);
    const json = JSON.parse(data);
    const used = JSON.parse(u);
    for await (const one of json.log.entries) {
        const { request, response } = one;
        const url = request.url;
        const file = url.split('/').at(-1);
        if (!/.*\.(png|jpg|swf|xml)(\?.*)?$/.test(file)) continue;
        // 现在只剩下png jpg swf xml了，提取即可。
        const name = file.split('?')[0];
        if (used.includes(name)) continue;
        const { status, content } = response;
        if (status !== 200 || typeof name !== 'string') continue;
        const { mimeType, text, encoding } = content;
        if (name.endsWith('png') || name.endsWith('jpg')) {
            const path = `./public/images/${name}`;
            const base64 = text.replace(/^data:image\/\w+;base64,/, '');
            const dataBuffer = Buffer.from(base64, 'base64');
            await fs.writeFile(path, dataBuffer);
        }
        if (name.endsWith('swf')) {
            const path = `./swf/${name}`;
            const data = Buffer.from(text, 'base64');
            await fs.writeFile(path, data);
        }
        if (name.endsWith('xml')) {
            const path = `./xml/${name}`;
            const data = Buffer.from(text, 'base64');
            await fs.writeFile(path, data);
        }
        used.push(name);
    }
    fs.writeFile('./har/used.json', JSON.stringify(used), 'utf-8');
})();
