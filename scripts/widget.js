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
  append(
    "#widget .widget-container",
    createElement("div", "loadmore-container")
  );
  append(
    "#widget .loadmore-container",
    createElement(
      "button",
      "btn-primary load-more",
      "",
      { onclick: "loadMore()" },
      "LOAD MORE"
    )
  );

  // CREATE MODAL
  
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

window.openModal = ( el ) => {
  const dataIndex =  el.id.split("-").pop();
  const chunkIndex = parseInt(dataIndex / 4);
  const itemIndex = dataIndex % 4;
  
  const cardData = data[chunkIndex][itemIndex]

  append("body", createElement("div","modal-backdrop","",{onclick: "closeModal()"}));
  window.addEventListener("keyup", (e)=> {
    if (e.key === "Escape") {
        closeModal();
    }
  }, {once: true})
  append("body .modal-backdrop", createElement("div", "modal"));
  append("body .modal", createElement("img", "modal-image","", {
    src: cardData.image,
    alt: `Posted image by ${cardData.name}`, 
  }));
  append("body .modal", createElement("div", "modal-content"));
  append("body .modal-content", createElement("div", "modal-creator"));
  append(`body .modal-creator`, createElement("div", "poster-info-section"));
  append(`body .modal-creator`, createElement("a", `network-svg ${cardData.source_type}`,"",{href: cardData.source_link}));
  append(`body .modal-content .poster-info-section`,createElement("img", "profile-image", "", {
    src: cardData.profile_image,
    alt: `Avatar of ${cardData.name}`,
  }));
  
  append(`body .modal .poster-info-section`,createElement("div","post-info"));
  
  append(`body .modal .post-info`,createElement(
    "p",
    "poster-name",
    "",
    "",
    cardData.name
  ));

  
  append(`body .modal .post-info`,createElement(
    "p",
    "card-caption",
    "",
    "",
    cardData.date
  ));

  append(`body .modal-content`, createElement(
    "p",
    "card-caption",
    "",
    "",
    makeParagraphWithHashtagsLinks(cardData.caption)
  ));

  append("body .modal-content", createElement("div", "modal-likes"));

  append(`body .modal-likes`, createElement("div","like-svg"));
  append(`body .modal-likes`, createElement("span","","",{},cardData.likes));

}

window.closeModal = () => {
    document.querySelector(".modal-backdrop").remove();
}
createWidget();
