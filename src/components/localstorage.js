const LOSE = 'lose';
const WIN = 'win';
const EQUAL = 'equal';

export const LocalStorage = {
    set: (field, value) => {
        localStorage.setItem(field, value);
    },
    add: (field) => {
        const currentValue = parseInt(localStorage.getItem(field), 10) || 0;
        localStorage.setItem(field, currentValue + 1);
    },
    get: (field) => {
        return localStorage.getItem(field) || 0;
    },
    clear: () => {
        localStorage.clear();
        const data = {};
        data[WIN] = 0;
        data[LOSE] = 0;
        data[EQUAL] = 0;
        return data;
    },
    getData: () => {
        const data = {};
        data[WIN] = LocalStorage.get(WIN);
        data[LOSE] = LocalStorage.get(LOSE);
        data[EQUAL] = LocalStorage.get(EQUAL);
        return data;
    }
}
