import { scale } from '../utils';

interface SetCanvas {
    canvas: HTMLCanvasElement;
    width: number;
    height: number;
}

const setCanvas: Record<string, SetCanvas> = {};

/**
 * 设置画布的大小
 * @param canvas 画布
 * @param width 画布宽度
 * @param height 画布高度
 */
export function setCanvasSize(
    canvas: HTMLCanvasElement,
    width: number,
    height: number
) {
    setCanvas[canvas.id] = { canvas, width, height };
    const s = scale.value * devicePixelRatio;
    canvas.width = width * s;
    canvas.height = height * s;
    const ctx = canvas.getContext('2d')!;
    ctx.scale(s, s);
}

export function resetAllCanvasSize(n: number) {
    for (const [, can] of Object.entries(setCanvas)) {
        const { canvas, width, height } = can;
        const s = n * devicePixelRatio;
        canvas.width = width * s;
        canvas.height = height * s;
        const ctx = canvas.getContext('2d')!;
        ctx.scale(s, s);
    }
}
