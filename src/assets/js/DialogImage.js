/**
 * @module dialog-image
 * @description A custom element for creating image modals
 * See https://www.raymondcamden.com/2023/12/13/an-image-dialog-web-component.
 */

export default class DialogImage extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    // Get elements, should be one of each only.
    const img           = this.querySelector(`img`);
    const a             = img.parentNode.parentNode;
    const figcaption    = this.querySelector(`figcaption`);
    const caption       = figcaption.innerText;
    const fullImageLink = a.href;

    // Bail early if there's no image wrapped in a link.
    if(!img) {
      console.warn(`dialog-image: No image found. Exiting.`);
      return;
    }

    if(a.nodeName !== `A`) {
      console.warn(`dialog-image: Image not wrapped in link. Exiting.`);
      return;
    }

    // Create the dialog.
    let dialog = document.createElement(`dialog`);
    dialog.setAttribute(`class`, `image-modal`);
    // `method="dialog"` captures the button click and closes the dialog.
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
    // Add the dialog outside of the anchor tag (which is parent),
    // but immediately after.
    a.parentNode.insertBefore(dialog, a.nextSibling);

    let button = this.querySelector(`button`);

    // Prevent click on anchor tag from navigating to image URL
    a.addEventListener(`click`, e => {
      e.preventDefault();
    });

    // Add attribute for accessibility
    img.setAttribute(`tabindex`, `0`);
    img.setAttribute(`aria-haspopup`, `dialog`);

    // Listen for click on image
    img.addEventListener(`click`, e => {
      e.preventDefault();
      // Prevent scrolling outside the modal; see
      // https://www.joshwcomeau.com/css/has/#global-detection-6.
      dialog.setAttribute(`data-disable-document-scroll`, true);
      // Open the modal.
      dialog.showModal();
    });

    // Listen for the enter key click.
    img.addEventListener(`keydown`, (e) => {
        switch (e.key) {
          case `Enter`:
            e.preventDefault();
            // Prevent scrolling outside the modal.
            dialog.setAttribute(`data-disable-document-scroll`, true);
            // Open the modal.
            dialog.showModal();
            break;
          default:
            return;
        }
      },
      true,
    );

    // Listen for button click
    button.addEventListener(`click`, e => {
      // Stop preventDefault() on anchor from propagating to the button.
      e.stopPropagation();
      // Allow scrolling outside the modal.
      dialog.removeAttribute(`data-disable-document-scroll`);
      // Close the modal.
      dialog.close();
    });

    // Listen for the escape key click.
    window.addEventListener(`keydown`, (e) => {
        if (e.defaultPrevented) {
          return;
        }

        switch (e.key) {
          case `Escape`:
            // Allow scrolling outside the modal.
            dialog.removeAttribute(`data-disable-document-scroll`);
            break;
          default:
            return;
        }
      },
      true,
    );

    // Close the dialog when ::backdrop is clicked.
    dialog.addEventListener(`click`, function(e) {
      // Get the dialog boundaries
      const rect = dialog.getBoundingClientRect();
      // Define dialog inner boundary.
      const isInDialog = (rect.top <= e.clientY && e.clientY <= rect.top + rect.height && rect.left <= e.clientX && e.clientX <= rect.left + rect.width);

      // If the click is not inside the boundary, close the dialog.
      if (!isInDialog) {
        dialog.close();
      }
    });
  }
}

if (`customElements` in window) {
  customElements.define(`dialog-image`, DialogImage);
}
