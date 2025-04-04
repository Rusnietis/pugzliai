
export const validate = (value, input, errors, rules) => {
    for (let i = 0; i < rules.length; i++) {
        let result;
        if (!Array.isArray(rules[i])) {
            result = rules[i](value);
        } else {
            result = rules[i][0](value, rules[i][1]);
        }

        if (result === 1) {
            return true
        }
        if (result === 0) {
            continue;
        }
        if (result !== true) {
            errors.set(input, input + ': ' + result);
            return false;
        }
    }
    return true
}

export const sometimes = value => {
    if (value) {
        return 0;
    }
    return 1;
}

export const required = value => {
    if (value) {
        return true;
    }
    return 'Required';
}

export const min = (value, min) => {
    if (typeof value === 'number') {
        if (value >= min) {
            return true;
        }
        return 'Too small minimum' + min;
    }
    if (value.length >= min) {
        return true;
    }
    return 'Too short minimum ' + min + ' characters';
}

export const max = (value, max) => {
    if (typeof value === 'number') {
        if (value <= max) {
            return true;
        }
        return 'Too big maximum' + max;
    }
    if (value.length <= max) {
        return true;
    }
    return 'Too long maximum ' + max + ' characters';
}

export const string = value => {
    if (typeof value === 'string') {
        return true;
    }
    return 'Not a string';
}

export const integer = value => {
    const n = Number(value);
    if (!isNaN(n)) {
        return 'Not a number'
    }
    if (n === parseInt(n, 10)) {
        return true;
    }
    return 'Not an integer';
}

export const number = value => {
    if (typeof value === 'number') {
        return true;
    }
    return 'Not a number';
}

export const lettersOnly = value => {
    if (value.match(/^[a-zA-Z]+$/)) {
        return true;
    }
    return 'Only Letters';
}

export const date = value => {

    const d = new Date(value);

    if (d instanceof Date && !isNaN(d)) {
        return true;
    }
    return 'Invalid date format or date is missing';
}

export const inNumbers = (value, numbers) => {
    if (numbers.includes(+value)) {
        return true;
    }
    return 'Invalid value';
}