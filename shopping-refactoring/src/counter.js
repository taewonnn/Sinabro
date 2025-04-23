export const setupCounter = () => {
    const countMap = {};

    const increase = ({ productId }) => {
        console.log('+');

        if (countMap[productId] === undefined) {
            countMap[productId] = 0;
        }
        countMap[productId] += 1;

        // return 최종값
        return countMap[productId];
    };

    const decrease = ({ productId }) => {
        console.log('-');
        if (countMap[productId] === undefined) {
            countMap[productId] = 0;
        }
        countMap[productId] -= 1;

        // return 최종값
        return countMap[productId];
    };

    const getTotalCount = () => {
        return Object.values(countMap).reduce((total, current) => {
            total += current;
            return total;
        }, 0);
    };

    return { increase, decrease, getTotalCount };
};
