import { Ref } from 'vue';

export class Loader {
    /** 任务列表 */
    private tasks: LoadTask[] = [];
    /** 绑定的响应式变量 */
    private bindedRef?: Ref<number>;
    /** 加载完成后执行的函数 */
    private onFulfill?: () => void;

    /** 加载进度，范围0~100 */
    private _progress: number = 0;

    /** 加载进度，范围0~100 */
    public get progress(): number {
        return this._progress;
    }

    private set progress(v: number) {
        this._progress = Math.ceil(v);
        this.bindedRef && (this.bindedRef.value = this._progress);
    }

    /**
     * 根据一系列异步函数生成加载任务
     * @param tasks 任务列表
     */
    static from(tasks: (() => Promise<void>)[]): Loader {
        const loader = new Loader();
        loader.addTask(...tasks.map(v => new LoadTask(v)));
        return loader;
    }

    constructor() {}

    /**
     * 添加加载任务
     * @param task 添加的加载任务列表
     */
    addTask(...task: LoadTask[]): void {
        this.tasks.push(...task);
    }

    /**
     * 将加载进度绑定到一个响应式变量上
     * @param target 绑定目标
     */
    bindProgress(target: Ref<number>): void {
        this.bindedRef = target;
    }

    /**
     * 开始执行加载任务
     */
    start(): Loader {
        let loaded = 0;
        Promise.all(
            this.tasks.map(
                v =>
                    new Promise<void>(res => {
                        v.start().then(() => {
                            loaded++;
                            this.progress = loaded / this.tasks.length;
                            res();
                        });
                    })
            )
        ).then(this.onFulfill);
        return this;
    }

    /**
     * 加载完成后执行函数
     */
    then(fn: () => void): void {
        this.onFulfill = fn;
    }
}

export class LoadTask {
    /** 加载函数 */
    private fn?: () => Promise<void>;
    /** 加载完成后执行的函数 */
    private onFulfill?: () => void;

    constructor(fn?: () => Promise<void>) {
        this.fn = fn;
    }

    /**
     * 设置加载时执行的函数
     * @param action 加载时执行的函数
     */
    setLoadAction(action: () => Promise<void>): void {
        this.fn = action;
    }

    /**
     * 开始这个加载任务
     */
    start(): LoadTask {
        if (!this.fn) throw new Error(`No loading function set!`);
        this.fn().then(this.onFulfill);
        return this;
    }

    /**
     * 加载完成后执行函数
     */
    then(fn: () => void): void {
        this.onFulfill = fn;
    }
}
