export const correctName = (charName) => {
    let temp = charName.split('_');
    if (temp.length > 1) {
        let n1 = temp[0].charAt(0).toUpperCase() + temp[0].slice(1);
        let n2 = temp[1].charAt(0).toUpperCase() + temp[1].slice(1);
        return n1 + " " + n2;
    }
    else {
        return temp[0].charAt(0).toUpperCase() + temp[0].slice(1);
    }
};