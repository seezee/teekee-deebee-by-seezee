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

  if (current) {
    current.innerHTML = current.innerHTML.toLowerCase();
  };

  if (path === `/`) {
    return;
  } else if (recipes) {
    if (child) {
      home.insertAdjacentHTML(`afterend`, `<span class="breadcrumbs-separator"> ❖ </span>`);
    };
    home.insertAdjacentHTML(`afterend`, `<span class="breadcrumbs-separator"> ❖ </span><span><a href="/recipes/">recipes</a></span>`);
  } else if (rums) {
    if (child) {
      home.insertAdjacentHTML(`afterend`, `<span class="breadcrumbs-separator"> ❖ </span>`);
    };
    home.insertAdjacentHTML(`afterend`, `<span class="breadcrumbs-separator"> ❖ </span><span><a href="/rums/">rum categories</a></span>`);
  } else if (mixes) {
    if (child) {
      home.insertAdjacentHTML(`afterend`, `<span class="breadcrumbs-separator"> ❖ </span>`);
    };
    home.insertAdjacentHTML(`afterend`, `<span class="breadcrumbs-separator"> ❖ </span><span><a href="/mixes/">syrups &amp; mixes</a></span>`);
  } else if (legal) {
    if (child) {
      home.insertAdjacentHTML(`afterend`, `<span class="breadcrumbs-separator"> ❖ </span>`);
    };
    home.insertAdjacentHTML(`afterend`, `<span class="breadcrumbs-separator"> ❖ </span><span>legal</span>`);
  } else {
    home.insertAdjacentHTML(`afterend`, `<span class="breadcrumbs-separator"> ❖ </span>`);
  };

})(document);
