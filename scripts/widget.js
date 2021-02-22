import { createElement, append } from "./createElements.js";
import createCardElement from "./card.js";
import "./modal.js";

export let data;
let numberOfPagesLoaded = 0;

const fetchData = async () => {
  let response = await fetch("../data.json");

  return await response.json();
};

const createWidget = async () => {
  data = await fetchData();
  data = dataChunks(data, 4);

  append("#widget", createElement({ className: "widget-container" }));

  append(
    "#widget .widget-container",
    createElement({ className: "cards-container" })
  );
  loadCards(data[numberOfPagesLoaded]);
  append(
    "#widget .widget-container",
    createElement({ className: "loadmore-container" })
  );
  append(
    "#widget .loadmore-container",
    createElement({
      tag: "button",
      className: "btn-primary load-more",
      attributesObject: { onclick: "loadMore()" },
      innerHtml: "LOAD MORE",
    })
  );
};

const dataChunks = (dataArray, chunkLength) => {
  let [...newData] = dataArray;
  let chunkedData = [];
  while (newData.length) {
    chunkedData.push(newData.splice(0, chunkLength));
  }
  return chunkedData;
};
const loadCards = (data) => {
  data.forEach((element, index) => {
    createCardElement(element, numberOfPagesLoaded * 4 + index);
  });
};

window.loadMore = () => {
  numberOfPagesLoaded++;
  loadCards(data[numberOfPagesLoaded]);
  if (numberOfPagesLoaded === data.length - 1) {
    document.getElementsByClassName("loadmore-container")[0].remove();
  }
};

createWidget();
