<template>
    <div id="game"></div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

let game: HTMLDivElement;

function resize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    // 判断长宽比
    const aspect = height / width;

    if (aspect < 9 / 16) {
        setGameSize(((height - 10) * 16) / 9, height - 10);
    } else {
        setGameSize(width - 10, ((width - 10) * 9) / 16);
    }
}

function setGameSize(width: number, height: number): void {
    game.style.width = `${~~width}px`;
    game.style.height = `${~~height}px`;
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
}
</style>
