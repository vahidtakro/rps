export const LocalStorage = {
    set: (field, value) => {
        localStorage.setItem(field, value);
    },
    add: (field) => {
        const currentValue = parseInt(localStorage.getItem(field), 10) || 0;
        localStorage.setItem(field, currentValue + 1);
    },
}
