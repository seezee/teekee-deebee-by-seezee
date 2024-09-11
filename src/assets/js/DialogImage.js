/**
 * @module dialog-image
 * @description A custom element for creating image modals
 */

export default class DialogImage extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    // Get elements, should be one of each only.
    let img = this.querySelector(`img`);
    let figcaption = this.querySelector(`figcaption`);
    let caption = figcaption.innerText;

    if(!img) {
      console.warn(`dialog-image: No image found. Exiting.`);
      return;
    }

    let parent = img.parentNode.parentNode;
    if(parent.nodeName !== `A`) {
      console.warn(`dialog-image: Image not wrapped in link. Exiting.`);
      return;
    }

    let fullImageLink = parent.href;

    let dialog = document.createElement(`dialog`);

    dialog.setAttribute(`class`, `image-modal`);

    dialog.innerHTML = `
  <form method="dialog">
    <stack-l>
      <figure>
        <stack-l>
          <img src="${fullImageLink}">
          <figcaption>${caption}</figcaption>
        </stack-l>
      </figure>
      <div class="aligncenter">
        <button autofocus class="button-primary" type="submit">Close</button>
      </div>
    </stack-l>
  </form>
    `;
    parent.parentNode.insertBefore(dialog, parent.nextSibling);

    let button = this.querySelector(`button`);

    parent.addEventListener(`click`, e => {
      e.preventDefault();
    });

    img.addEventListener(`click`, e => {
      e.preventDefault();
      dialog.setAttribute(`data-disable-document-scroll`, true);
      dialog.showModal();
    });

    button.addEventListener(`click`, e => {
      dialog.removeAttribute(`data-disable-document-scroll`);
      dialog.hideModal();
    });

    window.addEventListener(
      `keydown`,
      (event) => {
        if (event.defaultPrevented) {
          return;
        }

        switch (event.key) {
          case `Escape`:
            dialog.removeAttribute(`data-disable-document-scroll`);
            break;
          default:
            return;
        }
      },
      true,
    );

  }

}

if (`customElements` in window) {
  customElements.define(`dialog-image`, DialogImage);
}
