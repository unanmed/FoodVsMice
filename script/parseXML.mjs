import fs from 'fs/promises';
import X2JS from 'x2js';

(async function () {
    const list = await fs.readdir('../xml/source/');
    for await (const file of list) {
        const x2js = new X2JS();
        const data = x2js.xml2js(
            await fs.readFile(`../xml/source/${file}`, 'utf-8')
        );
        await fs.writeFile(
            `../xml/json/${file.replace('.xml', '.json')}`,
            JSON.stringify(data),
            'utf-8'
        );
    }
})();
