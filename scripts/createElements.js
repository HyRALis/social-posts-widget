

export const createElement = (
    tag = "div",
    className = "",
    id = "",
    attributesObject = {},
    innerHtml = ""
) => {

    let createdElement = document.createElement(tag);
    
    className.length !== 0 ? (createdElement.className = className) : "";
    id.length !== 0 ? (createdElement.id = id) : "";
    createdElement.innerHTML = innerHtml;
    
    if (!isObjectEmpty(attributesObject)) {
        const attributesProperties = Object.keys(attributesObject);
        attributesProperties.forEach((prop) => {
            createdElement.setAttribute(prop, attributesObject[prop]);
        });
    }
    
    return createdElement;
};

export const append = (parentSelector, childNode) => {
        let parentNode = document.querySelector(parentSelector);
        // debugger;
        parentNode.appendChild(childNode);
};

export const makeParagraphWithHashtagsLinks = (string) => {
    let paragraphArray = string.split(" ");
    paragraphArray = paragraphArray.map((word) => {
        if (isHastag(word)) {
            return (word = `<a href="#">${word}</a>`);
        } else return word;
    });
    return paragraphArray.join(" ");
};

const isHastag = (word) => {
    return (
        word.split("").filter((char) => {
            return char === "#";
        }).length !== 0
    );
};

const isObjectEmpty = (object) => {
    return Object.keys(object).length === 0;
};