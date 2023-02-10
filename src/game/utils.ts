import { isNil } from 'lodash';
import { ref, watch } from 'vue';
import { resetAllCanvasSize } from './render/resize';

export function parsePath(file: string, path: string) {
    return `${import.meta.env.BASE_URL}${path}/${file}`;
}

export const scale = ref(1);

// watch(scale, resetAllCanvasSize);

export function has<T>(value: T): value is NonNullable<T> {
    return !isNil(value);
}
