
const getCountOf = (key, arr) => {
    let no = 0;
    for (let val of arr) {
        if (val===key) {
            no++;
        }
    }
    return no;
}

const checkNum = (value) => {
    for (let i in value) {
        if (!['0','1','2','3','4','5','6','7','8','9','.','/','-'].includes(value[i])){
            return false;
        }
        if (value[0]==='/') {
            return false;
        }
        if (i!==0 && value[i]==='-') {
            return false;
        }
    }
    if (getCountOf('/', value)>1 || getCountOf('-', value)>1 || getCountOf('.', value)>1) {
        return false;
    }
    return true;
};

export {
    checkNum
}