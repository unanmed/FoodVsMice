import axios from 'axios';
import fs from 'fs/promises';

(async function () {
    const data = await fs.readFile('./xml/json/versionMD5.json');
    const json = JSON.parse(data);
    const files = json.root.file;
    console.time('Get done');
    await Promise.all(
        files.map(v => {
            return loadSWF(v._path, v._MD5);
        })
    );
    console.timeEnd('Get done');
})();

async function loadSWF(url, version) {
    if (!url.endsWith('.swf')) return await loadZip(url, version);
    const base = 'https://q.ms.huanlecdn.com/4399/cdn.123u.com/';
    const file = `${base}${url}?v=${version}`;
    try {
        const data = await axios.get(file, {
            responseType: 'text',
            responseEncoding: 'base64'
        });
        const res = Buffer.from(data.data, 'base64');
        const name = url.split('/').at(-1).replace('.swf', '');
        const number = Number(name);
        if (number >= 0x0001 && number <= 0x1000) {
            await fs.writeFile(`./swf/mice_list/${name}.swf`, res);
        } else if (number >= 0x010001 && number <= 0x020000) {
            await fs.writeFile(`./swf/bullet/${name}.swf`, res);
        } else if (number >= 0x020001 && number <= 0x030000) {
            await fs.writeFile(`./swf/flame/${name}.swf`, res);
        } else if (number >= 0x800001 && number <= 0x900000) {
            await fs.writeFile(`./swf/mice/${name}.swf`, res);
        } else if (number >= 0xe00001 && number <= 0xf00000) {
            await fs.writeFile(`./swf/map/${name}.swf`, res);
        } else if (number >= 0x11000000 && number <= 0x11001000) {
            await fs.writeFile(`./swf/cat/${name}.swf`, res);
        } else if (number >= 0x11110001 && number <= 0x12000000) {
            await fs.writeFile(`./swf/food/${name}.swf`, res);
        } else if (number >= 0x14110001 && number <= 0x15000000) {
            await fs.writeFile(`./swf/role/${name}.swf`, res);
        } else if (number >= 0x24d00001 && number <= 0x24e00000) {
            await fs.writeFile(`./swf/role/${name}.swf`, res);
        } else if (number >= 0x15d60001 && number <= 0x15d70000) {
            await fs.writeFile(`./swf/smallroom/${name}.swf`, res);
        } else {
            await fs.writeFile(`./swf/other/${name}.swf`, res);
        }
    } catch {}
}
