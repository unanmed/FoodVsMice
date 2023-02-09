import axios from 'axios';
import { parsePath } from '../utils';
import { Loader, LoadTask } from './loader';

type ResourceType = 'img' | 'bgm' | 'se';

const images: Record<string, HTMLImageElement> = {};
const bgms: Record<string, HTMLAudioElement> = {};
const sounds: Record<string, AudioBuffer> = {};

const ac = new AudioContext();

/**
 * 加载一个图片
 * @param name 文件名称
 * @param path 文件路径
 */
export function loadImage(name: string, path: string) {
    return async () => {
        const image = new Image();
        image.src = parsePath(name, path);
        images[name] = image;
        await new Promise<void>(res => {
            image.addEventListener('load', () => {
                res();
            });
        });
    };
}

/**
 * 加载一个背景音乐
 * @param name 文件名称
 * @param path 文件路径
 */
export function loadBgm(name: string, path: string) {
    return async () => {
        const bgm = new Audio();
        bgm.src = parsePath(name, path);
        bgms[name] = bgm;
        await new Promise<void>(res => {
            bgm.addEventListener('load', () => res());
        });
    };
}

/**
 * 加载一个音效
 * @param name 文件名称
 * @param path 文件路径
 */
export function loadSound(name: string, path: string) {
    return async () => {
        const data = await axios.get<ArrayBuffer>(parsePath(name, path), {
            responseType: 'arraybuffer'
        });
        const sound = await ac.decodeAudioData(data.data);
        sounds[name] = sound;
    };
}

/**
 * 获取一个已加载的图片
 * @param name 文件名称
 */
export function getImage(name: string) {
    const image = images[name];
    if (!image) throw new Error(`No loaded image with name of ${name}`);
    return image;
}

/**
 * 获取一个已加载的背景音乐
 * @param name 文件名称
 */
export function getBgm(name: string) {
    const bgm = bgms[name];
    if (!bgm) throw new Error(`No loaded bgm with name of ${name}`);
    return bgm;
}

/**
 * 获取一个已加载的音效
 * @param name 文件名称
 */
export function getSound(name: string) {
    const sound = sounds[name];
    if (!sound) throw new Error(`No loaded bgm with name of ${name}`);
    return sound;
}

/**
 * 加载游戏资源
 * @param type 资源类型
 * @param path 资源目录
 * @param file 资源文件
 */
export function loadResource(
    type: ResourceType,
    path: string,
    file: string[]
): Loader;
/**
 * 加载游戏资源
 * @param type 资源类型，与资源目录一一对应
 * @param path 资源目录
 * @param file 资源文件，与资源目录一一对应
 */
export function loadResource(
    type: ResourceType | ResourceType[],
    path: string[],
    file: string[][]
): Loader;
export function loadResource(
    type: ResourceType | ResourceType[],
    path: string | string[],
    file: string[] | string[][]
): Loader {
    const loader = new Loader();
    if (typeof type === 'string') {
        if (typeof path === 'string') {
            loadResourceByType(loader, type, path, file as string[]);
        } else {
            path.forEach((v, i) => {
                loadResourceByType(loader, type, v, file[i] as string[]);
            });
        }
    } else {
        type.forEach((v, i) => {
            loadResourceByType(loader, v, path[i], file[i] as string[]);
        });
    }
    loader.start();

    return loader;
}

/**
 * 根据类型加载一系列资源
 * @param loader 加载器
 * @param type 资源类型
 * @param path 资源目录
 * @param file 资源文件列表
 */
function loadResourceByType(
    loader: Loader,
    type: ResourceType,
    path: string,
    file: string[]
) {
    const load =
        type === 'img' ? loadImage : type === 'bgm' ? loadBgm : loadSound;
    file.forEach(v => {
        const task = new LoadTask(load(v, path));
        loader.addTask(task);
    });
}
