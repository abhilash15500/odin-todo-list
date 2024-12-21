function helperFunction(tag, classes = [], textContent, src, attributes = {}) {
    
    const element = document.createElement(tag);

    classes.forEach(classInstance => {
        element.classList.add(classInstance);
    });

    if (textContent) {
        element.textContent = textContent;
    };

    if (src) {
        element.setAttribute('src', src);
    };

    if (attributes) {
        for (const key in attributes) {
            element.setAttribute(key, attributes[key]);
        }
    };

    return element;
};


export { helperFunction };