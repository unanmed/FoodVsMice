import fs from 'fs/promises';

(async function () {
    const data = await fs.readFile('./xml/json/card_desc.json', 'utf-8');
    const json = JSON.parse(data);
    const files = json.card_desc.item;

    const res = {};
    files.forEach(v => {
        res[v._id] = {
            comfrom: v._comfrom,
            desc: v._desc,
            detail: v._detail,
            effectArea: v._effect_area,
            effectCondition: v._effect_condition,
            energy: parseInt(v._energy),
            hp: v._hp,
            index: parseInt(v._index),
            name: v._name,
            sex: v._sex,
            strengthenDesc: v._strengthen_desc,
            type: v._type
        };
    });
    await fs.writeFile('./src/data/item.json', JSON.stringify(res), 'utf-8');
})();
