import { Component, markRaw, reactive } from 'vue';

interface UI {
    component: Component;
    props?: Record<string, any>;
}

export class UIController {
    /** ui栈 */
    uiStack: UI[] = reactive<UI[]>([]);

    constructor() {}

    /**
     * 向ui队列中添加一个ui
     * @param component ui组件
     */
    push(component: UI) {
        this.uiStack.push({
            props: component.props,
            component: markRaw(component.component)
        });
    }

    /**
     * 弹出当前最后一个ui
     */
    pop() {
        this.uiStack.pop();
    }

    /**
     * 关闭一个ui，在其之后的所有ui也会一同关闭
     * @param component 要关闭的ui
     */
    close(component: UI) {
        const index = this.uiStack.findIndex(v => v === component);
        if (index === -1) return;
        this.uiStack.splice(index);
    }

    /**
     * 根据组件关闭对应的首个ui
     * @param component 要关闭的组件
     */
    closeByComponent(component: Component) {
        const index = this.uiStack.findIndex(v => v.component === component);
        if (index === -1) return;
        this.uiStack.splice(index);
    }
}

export const ui = new UIController();
