(function (window, document) {
  `use strict`;

  const searchField = document.getElementById(`searchField`);
  const searchHint =  document.getElementById(`search-hint__wrapper`);

  window.addEventListener(
    "keydown",
    (e) => {
      const key = e.key;
      if (e.defaultPrevented) {
        return; // Do nothing if the event was already processed
      }

      if ((e.metaKey) && (key == `k`)) {
        e.preventDefault();
        searchField.focus();
      } else {
        return;
      }

      // Cancel the default action to avoid it being handled twice
      e.preventDefault();
    },
    true,
  );

  searchField.addEventListener(`focusin`, (e) => {
    searchHint.setAttribute(`class`, `hide`);
  });

  searchField.addEventListener(`focusout`, (e) => {
    searchHint.removeAttribute(`class`);
  });

  const search = (e) => {

    const results = window.searchIndex.search(e.target.value, {
      fields:{ // See http://elasticlunr.com/docs/configuration.js.html
        title: {bool: `AND`},
        type: {boost: 1, bool: `AND`},
        characteristic: {bool: `AND`},
        base: {boost: 2, bool: `AND`},
        ingredients: {boost: 3, bool: `AND`},
        garnish: {bool: `AND`},
        glass: {bool: `AND`}
      },
      bool: `OR`,
      expand: true,
    });

    const resEl = document.getElementById(`searchResults`);
    // The message to display when no results are found.
    const noResultsEl = document.getElementById(`noResultsFound`);

    noResultsEl.setAttribute(`hidden`, `hidden`);

    resEl.innerHTML = ``;
    if (results.length > 0) {
      noResultsEl.setAttribute(`hidden`, `hidden`);
      // noResultsEl.style.display = `none`;
      results.map((r) => {
        let { id, title, type, characteristic, base } = r.doc;
        const sep = ', '

        const el = document.createElement(`li`);
        el.setAttribute(`class`, `search-item`);
        resEl.appendChild(el);

        const a = document.createElement(`a`);
        a.setAttribute(`href`, id);
        a.textContent = title;
        el.appendChild(a);

        const innerList = document.createElement(`ul`);

        const typeItem = document.createElement(`li`);
        const typeSVG = document.createElement(`svg`);
        const typeTitle = document.createElement(`title`);
        const typePath = document.createElement(`path`);

        const charItem = document.createElement(`li`);
        const charSVG = document.createElement(`svg`);
        const charTitle = document.createElement(`title`);
        const charPath = document.createElement(`path`);

        const baseItem = document.createElement(`li`);
        const baseSVG = document.createElement(`svg`);
        const baseTitle = document.createElement(`title`);
        const basePath = document.createElement(`path`);

        innerList.setAttribute(`class`, `search-list-nested`);
        innerList.setAttribute(`aria-role`, `list`);

        typeItem.setAttribute(`class`, `type`);
        charItem.setAttribute(`class`, `char`);
        baseItem.setAttribute(`class`, `base`);

        typeSVG.setAttribute(`xmlns`, `http://www.w3.org/2000/svg`);
        typeSVG.setAttribute(`viewBox`, `0 0 512 512`);
        typeSVG.setAttribute(`width`, `24px`);

        baseSVG.setAttribute(`xmlns`, `http://www.w3.org/2000/svg`);
        baseSVG.setAttribute(`viewBox`, `0 0 512 512`);
        baseSVG.setAttribute(`width`, `24px`);

        charSVG.setAttribute(`xmlns`, `http://www.w3.org/2000/svg`);
        charSVG.setAttribute(`viewBox`, `0 0 512 512`);
        charSVG.setAttribute(`width`, `24px`);

        typeTitle.textContent = `Type: `;
        charTitle.textContent = `Charcteristic: `;
        baseTitle.textContent = `Base: `;

        typePath.setAttribute(`d`, `M35.3 0C15.8 0 0 15.8 0 35.3c0 9.4 3.7 18.3 10.3 25L232 281.9V464h-80c-13.3 0-24 10.7-24 24s10.7 24 24 24h208c13.3 0 24-10.7 24-24s-10.7-24-24-24h-80V281.9L501.7 60.3c6.6-6.6 10.3-15.6 10.3-25C512 15.8 496.2 0 476.7 0H35.3zm282.8 176L256 238.1 193.9 176h124.2zm48-48H145.9l-80-80h380.2l-80 80z`); // Cocktail glass

        basePath.setAttribute(`d`, `M391 7c9.4-9.4 24.6-9.4 33.9 0l80 80c9.4 9.4 9.4 24.6 0 33.9-7.5 7.5-18.8 9-27.9 4.4l-72.5 72.5c-8 8-10.9 19.6-9.6 30.9 4 36.7-8.1 74.8-36.2 103L197.3 493.3c-25 25-65.5 25-90.5 0l-88-88c-25-25-25-65.5 0-90.5l33.9 33.9c-6.2 6.2-6.2 16.4 0 22.6l88 88c6.2 6.2 16.4 6.2 22.6 0l36-36L88.7 312.7l-36 36-34-34 161.5-161.4c28.1-28.1 66.3-40.2 103-36.2 11.3 1.2 22.9-1.6 30.9-9.6L386.6 35c-4.6-9-3.1-20.3 4.4-27.9zM200.7 200.7l110.6 110.6 13.5-13.5c17.4-17.4 24.9-41 22.5-63.8-2.4-21.8 2.6-49.3 23.4-70l70.7-70.7-22.7-22.7-70.7 70.7c-20.8 20.8-48.2 25.8-70 23.4-22.9-2.5-46.4 5-63.8 22.4l-13.5 13.5z`); // Bottle

        charPath.setAttribute(`d`, `M0 80C0 35.8 35.8 0 80 0h391c20.8 0 36.1 19.6 31 39.8l-76.4 305.7C457.8 361 480 393.9 480 432v16c0 35.3-28.7 64-64 64H160c-35.3 0-64-28.7-64-64v-16c0-40.5 25.1-75.1 60.6-89.2l-7.3-86.8H80c-44.2 0-80-35.8-80-80V80zm144 352v16c0 8.8 7.2 16 16 16h256c8.8 0 16-7.2 16-16v-16c0-26.5-21.5-48-48-48H192c-26.5 0-48 21.5-48 48zm262.5-208H304c-8.8 0-16-7.2-16-16s7.2-16 16-16h110.5l16-64H304c-8.8 0-16-7.2-16-16s7.2-16 16-16h134.5l12-48H180.2l24 288h174.3l28-112zM80 48c-17.7 0-32 14.3-32 32v96c0 17.7 14.3 32 32 32h65.3L132 48H80zm208 352a24 24 0 1 1 0 48 24 24 0 1 1 0-48z`); // Blender


        typeSVG.appendChild(typeTitle);
        typeSVG.appendChild(typePath);
        charSVG.appendChild(charTitle);
        charSVG.appendChild(charPath);
        baseSVG.appendChild(baseTitle);
        baseSVG.appendChild(basePath);

        typeItem.appendChild(typeSVG)
        charItem.appendChild(charSVG);
        baseItem.appendChild(baseSVG);

        innerList.appendChild(typeItem);
        innerList.appendChild(charItem);
        innerList.appendChild(baseItem);

        if ((Array.isArray(type)) && (Array.isArray(characteristic))) {
          const typeString = type.reduce((accumulator, currentValue) => accumulator + sep + currentValue);
          const charString = characteristic.reduce((accumulator, currentValue) => accumulator + sep + currentValue);

          typeItem.innerHTML += typeString + ` `;
          charItem.innerHTML += charString + ` `;
          baseItem.innerHTML += base;

          el.appendChild(innerList);

        } else if ((Array.isArray(type)) && (!Array.isArray(characteristic))) {
          const typeString = type.reduce((accumulator, currentValue) => accumulator + sep + currentValue);

          typeItem.innerHTML += typeString + ` `;
          charItem.innerHTML += characteristic + ` `;
          baseItem.innerHTML += base;

          el.appendChild(innerList);

        } else if ((!Array.isArray(type)) && (Array.isArray(characteristic))) {
          const charString = characteristic.reduce((accumulator, currentValue) => accumulator + sep + currentValue);

          typeItem.innerHTML += type + ` `;
          charItem.innerHTML += charString + ` `;
          baseItem.innerHTML += base;

          el.appendChild(innerList);

        } else {
          typeItem.innerHTML += type + ` `;
          charItem.innerHTML += characteristic + ` `;
          baseItem.innerHTML += base;

          el.appendChild(innerList);
        };
      });
    } else {
      noResultsEl.removeAttribute(`hidden`);
    }

    const hide = (e) => {
      noResultsEl.setAttribute(`hidden`, `hidden`);
    };

    // Hide the no results message when the search input loses focus.
    document.getElementById(`searchField`).addEventListener(`focusout`, hide);
  };

  fetch(`/search-index.json`).then((response) =>
    response.json().then((rawIndex) => {
      window.searchIndex = elasticlunr.Index.load(rawIndex);
      document.getElementById(`searchField`).addEventListener(`input`, search);
    })
  );
})(window, document);
