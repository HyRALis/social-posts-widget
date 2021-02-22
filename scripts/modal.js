import {
  createElement,
  append,
  makeParagraphWithHashtagsLinks,
} from "./createElements.js";
import { data } from "./widget.js";

window.openModal = ( element ) => {
  const dataIndex = element.id.split("-").pop();
  const chunkIndex = parseInt(dataIndex / 4);
  const itemIndex = dataIndex % 4;

  const cardData = data[chunkIndex][itemIndex];

  append(
    "body",
    createElement({
      className: "modal-backdrop",
      atributesObject: { onclick: "closeModal()" },
    })
  );
  window.addEventListener(
    "keyup",
    (e) => {
      if (e.key === "Escape") {
        closeModal();
      }
    },
    { once: true }
  );
  append("body .modal-backdrop", createElement({ className: "modal" }));
  append(
    "body .modal",
    createElement({
      tag: "img",
      className: "modal-image",
      attributesObject: {
        src: cardData.image,
        alt: `Posted image by ${cardData.name}`,
      },
    })
  );
  append("body .modal", createElement({ className: "modal-content" }));
  append("body .modal-content", createElement({ className: "modal-creator" }));
  append(
    `body .modal-creator`,
    createElement({ className: "poster-info-section" })
  );
  append(
    `body .modal-creator`,
    createElement({
      tag: "a",
      className: `network-svg ${cardData.source_type}`,
      attributesObject: {
        href: cardData.source_link,
      },
    })
  );
  append(
    `body .modal-content .poster-info-section`,
    createElement({
      tag: "img",
      className: "profile-image",
      attributesObject: {
        src: cardData.profile_image,
        alt: `Avatar of ${cardData.name}`,
      },
    })
  );

  append(
    `body .modal .poster-info-section`,
    createElement({ className: "post-info" })
  );

  append(
    `body .modal .post-info`,
    createElement({
      tag: "p",
      className: "poster-name",
      innerHtml: cardData.name,
    })
  );

  append(
    `body .modal .post-info`,
    createElement({
      tag: "p",
      className: "card-caption",
      innerHtml: cardData.date,
    })
  );

  append(
    `body .modal-content`,
    createElement({
      tag: "p",
      className: "card-caption",
      innerHtml: makeParagraphWithHashtagsLinks(cardData.caption),
    })
  );

  append("body .modal-content", createElement({ className: "modal-likes" }));

  append(`body .modal-likes`, createElement({ className: "like-svg" }));
  append(
    `body .modal-likes`,
    createElement({ tag: "span", innerHtml: cardData.likes })
  );
};

window.closeModal = () => {
  document.querySelector(".modal-backdrop").remove();
};
