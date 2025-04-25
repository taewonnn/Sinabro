// decrease / increase 눌렀는데 어떤 상품을 누른 건지 알아야 하기위해!
// 어떤 상품인지 찾는 함수
export function findElement(startingElement, selector) {
    let currentElement = startingElement;
    while (currentElement) {
        if (currentElement.matches(selector)) {
            return currentElement;
        }
        currentElement = currentElement.parentElement;
    }
    return null;
}
