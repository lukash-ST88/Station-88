export const YearRepresentation = (year: number | undefined, end_year: number | undefined) => {
    if (end_year === 0) return `${year}-Н.В.`;
    else if (end_year) return `${year}-${end_year}`;
    else return `${year}`;
}