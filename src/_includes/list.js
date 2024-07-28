// /src/_includes/list.js

(function (window, document) {
  `use strict`;

  const list = document.querySelectorAll('main ul');
  const listItem = document.querySelectorAll('main ul li');

  list.forEach((el) => {
    el.setAttribute(`role`, `list`);
  });

  listItem.forEach((el) => {
    el.setAttribute(`role`, `listitem`);
  });
})(window, document);
