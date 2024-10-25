// /src/_includes/breadcrumbs.js

(function (document) {
  `use strict`;

  const home    = document.getElementById(`breadcrumb-home`);
  const current = document.getElementById(`breadcrumb-current`);
  const path    = document.location.pathname;
  const recipes = path.startsWith(`/recipes/`);
  const rums    = path.startsWith(`/rums/`);
  const mixes   = path.startsWith(`/mixes/`);
  const legal   = path.startsWith(`/legal/`);

  let pathArray = path.split('/');
  let child  = pathArray[2];

/*   if (current) {
    current.innerHTML = current.innerHTML.toLowerCase();
  }; */

  if (path === `/`) {
    return;
  } else if (recipes) {
    if (child) {
      home.insertAdjacentHTML(`afterend`, `<span class="breadcrumbs-separator" aria-hidden="true"> ❖ </span>`);
    };
    home.insertAdjacentHTML(`afterend`, `<span class="breadcrumbs-separator" aria-hidden="true"> ❖ </span><span><a href="/recipes/" role="listitem">recipes</a></span>`);
  } else if (rums) {
    if (child) {
      home.insertAdjacentHTML(`afterend`, `<span class="breadcrumbs-separator" aria-hidden="true"> ❖ </span>`);
    };
    home.insertAdjacentHTML(`afterend`, `<span class="breadcrumbs-separator" aria-hidden="true"> ❖ </span><span><a href="/rums/" role="listitem">rum categories</a></span>`);
  } else if (mixes) {
    if (child) {
      home.insertAdjacentHTML(`afterend`, `<span class="breadcrumbs-separator" aria-hidden="true"> ❖ </span>`);
    };
    home.insertAdjacentHTML(`afterend`, `<span class="breadcrumbs-separator" aria-hidden="true"> ❖ </span><span><a href="/mixes/" role="listitem">syrups &amp; mixes</a></span>`);
  } else if (legal) {
    if (child) {
      home.insertAdjacentHTML(`afterend`, `<span class="breadcrumbs-separator" aria-hidden="true"> ❖ </span>`);
    };
    home.insertAdjacentHTML(`afterend`, `<span class="breadcrumbs-separator" aria-hidden="true"> ❖ </span><span role="listitem">legal</span>`);
  } else {
    home.insertAdjacentHTML(`afterend`, `<span class="breadcrumbs-separator" aria-hidden="true"> ❖ </span>`);
  };

})(document);
