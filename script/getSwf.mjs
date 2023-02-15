import axios from 'axios';
import fs from 'fs/promises';

(async function () {
    const data = await fs.readFile('./xml/json/LoadFilesList.json');
    const json = JSON.parse(data);
    const swfFile = json.filelist.SWFFile.Item;
    const versionFile = json.filelist.Version.Item;
    await Promise.all(
        swfFile.map(v => {
            return loadSWF(v._url, v._version);
        })
    );
    await Promise.all(
        versionFile.map(v => {
            return loadSWF(v._url, v._version);
        })
    );
})();

async function loadSWF(url, version) {
    if (!url.endsWith('.swf')) return await loadZip(url, version);
    const base = 'https://q.ms.huanlecdn.com/4399/cdn.123u.com/';
    const file = `${base}${url}?v=${version}?1.01012018`;
    try {
        const data = await axios.get(file, {
            responseType: 'text',
            responseEncoding: 'base64'
        });
        const res = Buffer.from(data.data, 'base64');
        await fs.writeFile(`./swf/${url}`, res);
    } catch {}
}

async function loadZip(url, version) {
    const base = 'https://q.ms.huanlecdn.com/4399/cdn.123u.com/';
    const file = `${base}${url}?v=${version}?1.01012018`;
    try {
        const data = await axios.get(file, {
            responseType: 'text',
            responseEncoding: 'base64'
        });
        const res = Buffer.from(data.data, 'base64');
        await fs.writeFile(`./xml/${url.split('/').at(-1)}`, res);
    } catch {}
}
