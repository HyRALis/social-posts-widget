import {
  createElement,
  append,
  makeParagraphWithHashtagsLinks,
} from "./createElements.js";

import createCardElement from "./card.js";

const fetchData = async () => {
  let response = await fetch("../data.json");

  return await response.json();
};

const createWidget = async () => {
  let data = await fetchData();
//   debugger;
  append("#widget", createElement("div", "widget-container"));
//   debugger;
  append("#widget .widget-container", createElement("div", "cards-container"));
    data.forEach((element,index) => {
        createCardElement(element,index);
    });
  append("#widget .widget-container", createElement("div", "loadmore-container"));
  append("#widget .loadmore-container", createElement("button", "btn-primary","",{},"LOAD MORE"));
};



createWidget();
