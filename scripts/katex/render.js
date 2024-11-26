function renderMathInElement(element) {
    let elementContent = element.innerHTML;
    const inlineMathRegex = /\$(.+?)\$/g;
    const blockMathRegex = /\$\$(.+?)\$\$/g;
    elementContent = elementContent.replace(blockMathRegex, (match, math) => {
        return `<span class="katex-block">${katex.renderToString(math, { displayMode: true })}</span>`;
    });
    elementContent = elementContent.replace(inlineMathRegex, (match, math) => {
        return `<span class="katex-inline">${katex.renderToString(math, { displayMode: false })}</span>`;
    });
    element.innerHTML = elementContent;
}
function renderMathInElements(elements) {
    elements.forEach(element => {
        renderMathInElement(element);
    });
}
function initializeMathRendering() {
    const contentElement = document.getElementById('content');
    // Изначально рендерим, если элементы уже есть
    renderMathInElements(document.querySelectorAll('.math_equation'));
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach(node => {
                    // Проверяем, является ли добавленный узел элементом с классом .math_equation
                    if (node.nodeType === Node.ELEMENT_NODE && node.classList.contains('math_equation')) {
                        renderMathInElement(node);
                    }
                    // Если добавлены дочерние элементы, ищем внутри них
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        const newMathElements = node.querySelectorAll('.math_equation');
                        renderMathInElements(newMathElements);
                    }
                });
            }
        });
    });
    const config = { childList: true, subtree: true };
    observer.observe(contentElement, config);
}
window.onload = initializeMathRendering;