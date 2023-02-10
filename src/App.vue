<template>
    <div id="game">
        <Loading v-if="loaded" :progress="50"></Loading>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import Loading from './components/loading.vue';
import { scale } from './game/utils';
import { loaded } from './game/init';

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
