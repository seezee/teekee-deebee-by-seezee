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
    current.innerHTML = current.innerHTML.toUpperCase();
  };

  if (path === `/`) {
    return;
  } else if (recipes) {
    if (child) {
      home.insertAdjacentHTML(`afterend`, `<div> ❖ </div>`);
    };
    home.insertAdjacentHTML(`afterend`, `<div> ❖ </div><div><a href="/recipes/">RECIPES</a></div>`);
  } else if (rums) {
    if (child) {
      home.insertAdjacentHTML(`afterend`, `<div> ❖ </div>`);
    };
    home.insertAdjacentHTML(`afterend`, `<div> ❖ </div><div><a href="/rums/">RUM CATEGORIES</a></div>`);
  } else if (mixes) {
    if (child) {
      home.insertAdjacentHTML(`afterend`, `<div> ❖ </div>`);
    };
    home.insertAdjacentHTML(`afterend`, `<div> ❖ </div><div><a href="/mixes/">SYRUPS &amp; MIXES</a></div>`);
  } else if (legal) {
    if (child) {
      home.insertAdjacentHTML(`afterend`, `<div> ❖ </div>`);
    };
    home.insertAdjacentHTML(`afterend`, `<div> ❖ </div><div>LEGAL</div>`);
  } else {
    home.insertAdjacentHTML(`afterend`, `<div> ❖ </div>`);
  };

})(document);
