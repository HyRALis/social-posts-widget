

export const createElement = ({
    tag = "div",
    className = "",
    id = "",
    attributesObject = {},
    innerHtml = ""
}) => {

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

export const dateFormater = (dateString) => {
    const months = {
        "01" : "Jan",
        "02" : "Feb",
        "03" : "Mar",
        "04" : "Apr",
        "05" : "May",
        "06" : "Jun",
        "07" : "Jul",
        "08" : "Aug",
        "09" : "Sep",
        "10" : "Oct",
        "11" : "Nov",
        "12" : "Dec",
    };

    let dateNotFormated = dateString.split(" ")[0];
    let timeNotFormated = dateString.split(" ")[1];

    let postedDate = dateNotFormated.split("-");
    swapElement(postedDate,0,2);
    postedDate[1] = months[postedDate[1]];
    postedDate = postedDate.join(" "); 
    
    let postedTime = timeNotFormated.split(":").splice(0,2).join(":");
    
    return ({
        postedDate,
        postedTime,   
    })
 }

 const swapElement= (array, indexA, indexB) => {
    let temp = array[indexA];
    array[indexA] = array[indexB];
    array[indexB] = temp;
  }

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

