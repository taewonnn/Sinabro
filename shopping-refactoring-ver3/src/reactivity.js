export function bindReactiveState({ name, defaultValue }) {
    if (typeof defaultValue !== 'object') {
        throw new Error('bindReactiveState supports on object as defaultValue');
    }

    // defaultValue copy
    let value = defaultValue;

    const getter = () => {
        return value;
    };

    const setter = (newValue) => {
        const oldKeys = Object.keys(value);
        const newKeys = Object.keys(newValue);

        const changedKeys = [];
        const removedKeys = [];

        newKeys.forEach((key) => {
            if (value[key] !== newValue[key]) {
                changedKeys.push(key);
            }
        });

        newKeys.forEach((key) => {
            if (!oldKeys.includes(key)) {
                changedKeys.push(key);
            }
        });

        // 중복 방지 -> set 으로 중복 제거 후 다시 Array.from으로 arr
        // Array.from(new Set())
        const uniqueChangedKeys = Array.from(new Set(changedKeys));
        console.log('💡 uniqueChangedKeys', uniqueChangedKeys);
        uniqueChangedKeys.forEach((key) => {
            const elements = Array.from(document.querySelectorAll(`[data-subscribe-to='${name}'][data-subscription-path='${key}']`));

            elements.forEach((element) => {
                element.innerHTML = newValue[key];
            });
        });

        value = newValue;
    };

    return [getter, setter];
}
