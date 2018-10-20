const appElement = document.querySelector(`#app`);

/**
* рендеринг template
* @param {String} strHtml
* @return {HTMLElement} fragment
*/
const renderTemplate = (strHtml) => {
    const wrapperTemplate = document.createElement(`template`);
    wrapperTemplate.innerHTML = strHtml;
    return wrapperTemplate.content;
};
/**
* вставка данных из template
* @param {HTMLElement} elements
*/
const changeScreen = (...elements) => {
    appElement.innerHTML = ``;
    elements.forEach((element) => {
        appElement.appendChild(element);
    });
};
/**
* удаление HTMLElement
* @param {HTMLElement} element
*/
const deleteElement = (parentElem, element) => {
    parentElem.removeChild(element);
};

export { renderTemplate, changeScreen, deleteElement };
