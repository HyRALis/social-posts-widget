import {
  createElement,
  append,
  makeParagraphWithHashtagsLinks,
} from "./createElements.js";

const createCardElement = (cardPropertiesObject, key) => {
  append("#widget .cards-container",createElement("div", "widget-card", `card${key}`));
  // CREATE CHILDREN OF CARD
  ;
  append(`#card${key}`, createElement("div", "card-content"));

  append(`#card${key}`, createElement("div", "like-count"));
    
  append(`#card${key}`, createElement("div", "card-overlay"));

  // CREATE CHILDREN FOR CARD-CONTENT
  
  append(`#card${key} .card-content`, createElement("div", "card-header"));

  append(`#card${key} .card-content`, createElement("img", "card-image", "", {
    src: cardPropertiesObject.image,
    alt: `Posted image by ${cardPropertiesObject.name}`, 
  }));

  append(`#card${key} .card-content`, createElement(
    "p",
    "card-caption",
    "",
    "",
    makeParagraphWithHashtagsLinks(cardPropertiesObject.caption)
  ));

  // CREATE CHILDREN FOR CARD-HEADER
  
  append(`#card${key} .card-header`, createElement("div", "poster-info-section"));

  append(`#card${key} .poster-info-section`,createElement("img", "profile-image", "", {
    src: cardPropertiesObject.image,
    alt: `Avatar of ${cardPropertiesObject.name}`,
  }));
  
  append(`#card${key} .poster-info-section`,createElement("div","post-info"));
  
  append(`#card${key} .post-info`,createElement(
    "p",
    "poster-name",
    "",
    "",
    cardPropertiesObject.name
  ));

  
  append(`#card${key} .post-info`,createElement(
    "p",
    "card-caption",
    "",
    "",
    cardPropertiesObject.date
  ));

  // CREATE THE LIKES COUNTER AREA

  append(`#card${key} .like-count`, createElement("span","","",{},cardPropertiesObject.likes));
  // CREATE THE read more in overlay

  append(`#card${key} .card-overlay`, createElement("button","btn-borderonly","",{},"READ MORE"));
};

export default createCardElement;
