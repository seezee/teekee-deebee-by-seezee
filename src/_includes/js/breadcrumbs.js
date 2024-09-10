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
      home.insertAdjacentHTML(`afterend`, `<div class="breadcrumbs-separator"> ❖ </div>`);
    };
    home.insertAdjacentHTML(`afterend`, `<div class="breadcrumbs-separator"> ❖ </div><div><a href="/recipes/">recipes</a></div>`);
  } else if (rums) {
    if (child) {
      home.insertAdjacentHTML(`afterend`, `<div class="breadcrumbs-separator"> ❖ </div>`);
    };
    home.insertAdjacentHTML(`afterend`, `<div class="breadcrumbs-separator"> ❖ </div><div><a href="/rums/">rum categories</a></div>`);
  } else if (mixes) {
    if (child) {
      home.insertAdjacentHTML(`afterend`, `<div class="breadcrumbs-separator"> ❖ </div>`);
    };
    home.insertAdjacentHTML(`afterend`, `<div class="breadcrumbs-separator"> ❖ </div><div><a href="/mixes/">syrups &amp; mixes</a></div>`);
  } else if (legal) {
    if (child) {
      home.insertAdjacentHTML(`afterend`, `<div class="breadcrumbs-separator"> ❖ </div>`);
    };
    home.insertAdjacentHTML(`afterend`, `<div class="breadcrumbs-separator"> ❖ </div><div>legal</div>`);
  } else {
    home.insertAdjacentHTML(`afterend`, `<div class="breadcrumbs-separator"> ❖ </div>`);
  };

})(document);
