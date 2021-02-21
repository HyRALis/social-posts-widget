export const createElementWithClass = (tag="div", className="", id="", attributesObject={} ) => {
    let createdElement = document.createElement(tag);
    className.length !== 0 ? createdElement.className = className : "";
    id.length !== 0 ? createdElement.id = id : "";

    if (!isObjectEmpty(attributesObject)) {
        const attributesProperties = Object.keys(attributesObject);
        attributesProperties.forEach((prop,index)=> {
            createdElement.setAttribute(prop,attributesProperties[prop]);
        })
    }
    return createdElement;
}

export const append = (parentClassName, childClassName) => {
    if (document.getElementsByClassName(parentClassName).length === 0 || document.getElementsByClassName(childClassName).length === 0  ) {
        return console.error("Specify better classNames");
    }else {
        let parentNode = document.getElementsByClassName(parentClassName)[0];
        let childNode = document.getElementsByClassName(childClassName)[0];

        parentNode.appendChild(childNode);
    }
}
 
const isObjectEmpty = (object) => {
    return Object.keys(obj).length === 0;
}