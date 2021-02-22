import {
  createElement,
  append,
  makeParagraphWithHashtagsLinks,
  dateFormater
} from "./createElements.js";

const createCardElement = (cardPropertiesObject, key) => {
  append(
    "#widget .cards-container",
    createElement({
      className: "widget-card",
      id: `card-${key}`,
      attributesObject: {
        onclick: "openModal(this)",
      },
    })
  );
  // CREATE CHILDREN OF CARD
  append(`#card-${key}`, createElement({ className: "card-content" }));

  append(`#card-${key}`, createElement({ className: "like-count" }));

  // CREATE CHILDREN FOR CARD-CONTENT

  append(
    `#card-${key} .card-content`,
    createElement({ className: "card-header" })
  );

  append(
    `#card-${key} .card-content`,
    createElement({
      tag: "img",
      className: "card-image",
      attributesObject: {
        src: cardPropertiesObject.image,
        alt: `Posted image by ${cardPropertiesObject.name}`,
      },
    })
  );

  append(
    `#card-${key} .card-content`,
    createElement({
      tag: "p",
      className: "card-caption",
      innerHtml: makeParagraphWithHashtagsLinks(cardPropertiesObject.caption),
    })
  );

  // CREATE CHILDREN FOR CARD-HEADER

  append(
    `#card-${key} .card-header`,
    createElement({ className: "poster-info-section" })
  );
  append(
    `#card-${key} .card-header`,
    createElement({
      tag: "a",
      className: `network-svg ${cardPropertiesObject.source_type}`,
      attributesObject: { href: cardPropertiesObject.source_link },
    })
  );
  append(
    `#card-${key} .poster-info-section`,
    createElement({
      tag: "img",
      className: "profile-image",
      attributesObject: {
        src: cardPropertiesObject.profile_image,
        alt: `Avatar of ${cardPropertiesObject.name}`,
      },
    })
  );

  append(`#card-${key} .poster-info-section`, createElement({className:"post-info"}));

  append(
    `#card-${key} .post-info`,
    createElement({
      tag: "p",
      className: "poster-name",
      innerHtml: cardPropertiesObject.name,
    })
  );

  append(
    `#card-${key} .post-info`,
    createElement({
      tag: "p",
      className: "post-date",
      innerHtml: dateFormater(cardPropertiesObject.date).postedDate,
    })
  );
  append(
    `#card-${key} .post-date`,
    createElement({
      tag: "p",
      className: "post-time",
      innerHtml: dateFormater(cardPropertiesObject.date).postedTime,
    })
  );

  // CREATE THE LIKES COUNTER AREA
  append(`#card-${key} .like-count`, createElement({ className: "like-svg" }));
  append(
    `#card-${key} .like-count`,
    createElement({ tag: "span", innerHtml: cardPropertiesObject.likes })
  );
};

export default createCardElement;
