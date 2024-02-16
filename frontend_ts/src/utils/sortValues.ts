export const getSortValues = (value: string) => {
    const arrayValues = value.split(' ')
    return [arrayValues[0], arrayValues[1]]
}
