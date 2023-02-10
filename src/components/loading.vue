<template>
    <canvas id="loading"></canvas>
</template>

<script lang="ts" setup>
import { onMounted, onUpdated, ref, watch } from 'vue';
import { Layout } from '../game/render/layout';
import { setCanvasSize } from '../game/render/resize';
import { scale } from '../game/utils';

let can: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;
let layout: Layout;

const props = defineProps<{
    progress: number;
}>();

const font = {
    '0': '0.png',
    '1': '1.png',
    '2': '2.png',
    '3': '3.png',
    '4': '4.png',
    '5': '5.png',
    '6': '6.png',
    '7': '7.png',
    '8': '8.png',
    '9': '9.png',
    '%': 'per.png'
};

function resize() {
    setCanvasSize(can, 950, 600);
}

function draw() {
    const all = 428;
    const per = props.progress / 100;
    const length = all * per;
    const gra = ctx.createLinearGradient(0, 544.8, 0, 560);
    gra.addColorStop(0, '#db7');
    gra.addColorStop(1, '#d74');
    layout
        .antiAliasing(false)
        .image('loadingbg.png', 0, 0)
        .image('pro_left.png', 247, 510, 14, 38)
        .image('pro_center.png', 261, 510, 421.2, 38)
        .image('pro_right.png', 682, 510, 16, 38)
        .image('progress.png', 0, 0, length, 18, 258, 520, length, 18)
        .image('pro_head.png', 238.85 + length, 511.5, 43, 33)
        .imageText(`${props.progress.toFixed(0)}%`, font, 495.05, 543.85)
        .textInfo({ textBaseline: 'top', font: '700 15.5px Verdana' })
        .style(gra)
        .text('加载中···', 388, 544.8)
        .strokeText('加载中···', 388, 544.8);
}

onUpdated(draw);

onMounted(() => {
    can = document.getElementById('loading') as HTMLCanvasElement;
    ctx = can.getContext('2d')!;
    layout = new Layout(ctx);
    resize();
    draw();
});
</script>

<style lang="less" scoped>
#loading {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
}
</style>
