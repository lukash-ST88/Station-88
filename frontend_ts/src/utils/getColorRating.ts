const getColorRating = (rating: number ) => {
    let colorSet = {}
    if(rating < 6 && rating > 0) {
        colorSet = {color: 'black', background: 'red'}
    }
    else if (rating >= 6 && rating < 9) {
        colorSet = {color: 'black', background: 'yellow'}
    }
    else if (rating >=  9 && rating <= 10){
        colorSet = {color: 'black', background: 'rgb(34 197 94)'}
    }
    else {
        colorSet = {color: 'white', background: 'white'}
    }
    return colorSet;
}
export default getColorRating;