export const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const shortenNumber = (x) => {
    const abbreviations = ["K", "M", "B", "T"];
    let abbreviationIndex = -1;
    while (x >= 1000 && abbreviationIndex < abbreviations.length - 1) {
        x /= 1000;
        abbreviationIndex++;
    }
    const roundedNumber = Math.round(x * 10) / 10;
    const abbreviation = abbreviations[abbreviationIndex];
    return `${roundedNumber}${abbreviation}`;
};
