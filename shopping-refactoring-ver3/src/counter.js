export const setupCounter = () => {
    // React - useState
    // const [countMap, setCountMap] = bindReactiveState({ name: 'countMap', defaultValue: {} });

    let countMap = {};
    const setCountMap = (newCountMap) => {
        countMap = newCountMap;
    };

    const increase = ({ productId }) => {
        const newCountMap = { ...countMap };
        if (newCountMap[productId] === undefined) {
            newCountMap[productId] = 0;
        }
        newCountMap[productId] += 1;
        setCountMap(newCountMap);
    };

    const decrease = ({ productId }) => {
        const newCountMap = { ...countMap };
        if (newCountMap[productId] === undefined) {
            newCountMap[productId] = 0;
        }
        newCountMap[productId] -= 1;
        setCountMap(newCountMap);
    };

    const getTotalCount = () => {
        return Object.values(countMap).reduce((total, current) => {
            total += current;
            return total;
        }, 0);
    };

    return { increase, decrease, getTotalCount };
};
