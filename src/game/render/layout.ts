import { getImage } from '../loader/load';
import { has } from '../utils';

type CanvasStyle = string | CanvasGradient | CanvasPattern;

export class Layout {
    /** 画布 */
    canvas: HTMLCanvasElement;
    /** 画布绘制上下文 */
    ctx: CanvasRenderingContext2D;

    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
        this.canvas = ctx.canvas;
    }

    image(img: string | CanvasImageSource, dx: number, dy: number): Layout;
    image(
        img: string | CanvasImageSource,
        dx: number,
        dy: number,
        dw: number,
        dh: number
    ): Layout;
    image(
        img: string | CanvasImageSource,
        sx: number,
        sy: number,
        sw: number,
        sh: number,
        dx: number,
        dy: number,
        dw: number,
        dh: number
    ): Layout;
    image(
        img: string | CanvasImageSource,
        x1: number,
        y1: number,
        w1?: number,
        h1?: number,
        x2?: number,
        y2?: number,
        w2?: number,
        h2?: number
    ): Layout {
        const image = typeof img === 'string' ? getImage(img) : img;
        if (!has(w1)) {
            this.ctx.drawImage(image, x1, y1);
        } else if (!has(x2)) {
            this.ctx.drawImage(image, x1, y1, w1, h1!);
        } else {
            this.ctx.drawImage(image, x1, y1, w1, h1!, x2!, y2!, w2!, h2!);
        }
        return this;
    }

    /**
     * 绘制图片文字
     * @param text 文字
     * @param font 图片字体列表
     * @param x 横坐标
     * @param y 纵坐标
     */
    imageText(
        text: string,
        font: Record<
            string,
            string | Exclude<CanvasImageSource, SVGImageElement>
        >,
        x: number,
        y: number
    ): Layout {
        let left = 0;
        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            const img = font[char];
            if (!has(img)) throw new Error(`Nonexistnet font!`);
            const image = typeof img === 'string' ? getImage(img) : img;
            this.ctx.drawImage(image, x + left, y);
            left += image.width;
        }
        return this;
    }

    /**
     * 绘制文字
     * @param text 文字
     * @param x 横坐标
     * @param y 纵坐标
     * @param maxWidth 最大宽度
     */
    text(text: string, x: number, y: number, maxWidth?: number): Layout {
        this.ctx.fillText(text, x, y, maxWidth);
        return this;
    }

    /**
     * 绘制文字描边
     * @param text 文字
     * @param x 横坐标
     * @param y 纵坐标
     * @param maxWidth 最大宽度
     */
    strokeText(text: string, x: number, y: number, maxWidth?: number): Layout {
        this.ctx.strokeText(text, x, y, maxWidth);
        return this;
    }

    /**
     * 设置文本属性
     * @param info 文本属性
     */
    textInfo(info: Partial<CanvasTextDrawingStyles>): Layout {
        for (const [p, v] of Object.entries(info)) {
            // @ts-ignore
            this.ctx[p] = v;
        }
        return this;
    }

    /**
     * 设置画布的绘制样式
     * @param fill 填充样式
     * @param stroke 描边样式
     */
    style(fill?: CanvasStyle, stroke?: CanvasStyle): Layout {
        has(fill) && (this.ctx.fillStyle = fill);
        has(stroke) && (this.ctx.strokeStyle = stroke);
        return this;
    }

    /**
     * 是否开启抗锯齿
     */
    antiAliasing(value: boolean): Layout {
        this.ctx.imageSmoothingEnabled = value;
        return this;
    }
}
