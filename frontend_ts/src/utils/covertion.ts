export function stringToArray(str: string) {
    return str.split(',').map(item => item.trim().toUpperCase());
}