<template>
    <div id="loading"></div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const props = defineProps<{
    progress: number;
}>();
</script>

<style lang="less" scoped>
#loading {
    width: 100%;
    height: 100%;
}
</style>
