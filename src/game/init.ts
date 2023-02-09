import { loadResource } from './loader/load';

export function loadInitResource() {
    const imgs = [
        'loadingbg.jpg',
        'pro_center.png',
        'pro_head.png',
        'pro_left.png',
        'pro_right.png',
        'progress.png'
    ];
    const texts = [
        '0.png',
        '1.png',
        '2.png',
        '3.png',
        '4.png',
        '5.png',
        '6.png',
        '7.png',
        '8.png',
        '9.png',
        'per.png'
    ];
    const loader = loadResource(
        'img',
        ['images/loading', 'images/loading/text'],
        [imgs, texts]
    );
    loader.then(() => console.log('===== Load Init Resource Done ====='));
}
