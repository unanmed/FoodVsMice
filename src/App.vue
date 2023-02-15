<template>
    <div id="game">
        <component
            v-for="ui of list"
            :is="ui.component"
            v-bind="ui.props ?? {}"
        ></component>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { scale } from './game/utils';
import { ui } from './game/ui';

const list = ui.uiStack;

let game: HTMLDivElement;

function resize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    // 判断长宽比
    const aspect = height / width;

    if (aspect < 12 / 19) {
        setGameSize(((height - 10) * 19) / 12, height - 10);
    } else {
        setGameSize(width - 10, ((width - 10) * 12) / 19);
    }
}

function setGameSize(width: number, height: number): void {
    game.style.width = `${~~width}px`;
    game.style.height = `${~~height}px`;
    scale.value = ~~width / 950;
}

onMounted(() => {
    game = document.getElementById('game') as HTMLDivElement;
    resize();
    window.addEventListener('resize', resize);
});
</script>

<style scoped lang="less">
#game {
    border: 1px solid #fff;
    position: relative;
}
</style>
