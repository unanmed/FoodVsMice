export function parsePath(file: string, path: string) {
    return `${import.meta.env.BASE_URL}${path}/${file}`;
}
