import {
  createElement,
  append,
  makeParagraphWithHashtagsLinks,
} from "./createElements.js";

import createCardElement from "./card.js";

let numberOfPagesLoaded = 0;
let data;

const fetchData = async () => {
  let response = await fetch("../data.json");

  return await response.json();
};

const createWidget = async () => {
  data = await fetchData();
  data = dataChunks(data, 4);

  append("#widget", createElement("div", "widget-container"));
  
  append("#widget .widget-container", createElement("div", "cards-container"));
    loadCards(data[numberOfPagesLoaded]);
  append("#widget .widget-container", createElement("div", "loadmore-container"));
  append("#widget .loadmore-container", createElement("button", "btn-primary load-more","",{onclick: 'loadMore()'},"LOAD MORE"));
};

const dataChunks = (dataArray, chunkLength) => {
    let [...newData] = dataArray;
    let chunkedData = [];
    while (newData.length) {
        chunkedData.push(newData.splice(0,chunkLength));
    }
    return chunkedData;
}
const loadCards = (data) => {
    data.forEach((element,index) => {
        createCardElement(element,numberOfPagesLoaded*4 + index);
    });
}
window.loadMore = ( ) => {
    numberOfPagesLoaded ++;
    loadCards(data[numberOfPagesLoaded]);
    if(numberOfPagesLoaded === data.length-1) {
        document.getElementsByClassName("loadmore-container")[0].remove();
    }        
}

createWidget();
