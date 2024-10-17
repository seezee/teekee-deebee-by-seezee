/**
 * @module tiki-dialog-gallery
 * @description A custom element for creating gallery modals
 */

export default class DialogGallery extends HTMLElement {

  constructor() {
    super();
  }

  connectedCallback() {
    const breaks      = this.getElementsByTagName(`br`);
    const firstPara   = this.getElementsByTagName(`p`)[0];
    let   imgNodeList = this.querySelectorAll(`img`);
    const defaultImg  = imgNodeList[0];
    let   defaultSrc  = defaultImg.getAttribute(`src`);
    let   defaultAlt  = defaultImg.getAttribute(`alt`);
    let   imgListHtml;
    let   imgWrapper  = defaultImg.parentNode;

    // Remove the breaks generated by the Markdown parser.
    for(
      let i=breaks.length-1;
      i>=0;
      i--) {
        breaks[i].parentNode.removeChild(breaks[i]);
      };

    // Add attribute for kbd accessibility.
    imgNodeList.forEach(imgNodeList => imgNodeList.setAttribute(`tabindex`, `0`));

    // Convert the nodelist to HTML so we can append it to the modal.
    imgListHtml = Array.prototype.reduce.call(imgNodeList, function(html, node) {
      return html + ( node.outerHTML || node.nodeValue );
    }, "");

    // Call this *after* previous so it doesn't get set on the modal thumbnails.
    imgNodeList.forEach(imgNodeList => imgNodeList.setAttribute(`aria-haspopup`, `dialog`));

    // The Markdown parser inserts a paragraph around our gallery,
    // so we must add the wrapper class here.
    imgWrapper.classList.add(`masonry`);

    // Create the dialog.
    let modal = document.createElement(`dialog`);
    modal.classList.add(`gallery-modal`);
    // `method="dialog"` captures the button click and closes the dialog.
    modal.innerHTML = `
    <stack-l>
      <form method="dialog">
        <stack-l>
          <div class="container">
            <div class="gallery--img_main">
              <figure>
                <stack-l>
                  <img src="${defaultSrc}" alt="${defaultAlt}" id="current">
                  <figcaption></figcaption>
                </stack-l>
              </figure>
            </div>
            <div class="gallery--thumbs">
              ${imgListHtml}
            </div>
          </div>
          <div class="aligncenter">
            <button class="button button-primary" type="submit">Close</button>
          </div>
        </stack-l>
      </form>
      <details>
        <summary>KEYBOARD HINTS</summary>
          <stack-l>
            <dl>
              <stack-l>
                <dt>MacOS</dt>
                <dd><pre><ul><li>Move forward     = <kbd>&rarr;</kbd> <em>or</em> <kbd>↹ Tab</kbd></li><li>Move backward    = <kbd>&larr;</kbd> <em>or</em> <kbd>⇧ Shift</kbd> + <kbd>↹ Tab</kbd></li><li>Move down        = <kbd>⇧ Shift</kbd> + <kbd>&uarr;</kbd></li><li>Move up          = <kbd>⇧ Shift</kbd> + <kbd>&darr;</kbd></li><li>Jump to end      = <kbd><span aria-hidden>⌘</span><span class="sr-only">Command key</span></kbd> + <kbd>&rarr;</kbd></li><li>Jump to start    = <kbd><span aria-hidden>⌘</span><span class="sr-only">Command key</span></kbd> + <kbd>&larr;</kbd></li><li>Display selected = <kbd>Enter</kbd></li></ul></pre>
                </dd>
                <dt>Windows</dt>
                <dd><pre><ul><li>Move forward     = <kbd>&rarr;</kbd> <em>or</em> <kbd>↹ Tab</kbd></li><li>Move backward    = <kbd>&larr;</kbd> <em>or</em> <kbd>Shift</kbd> + <kbd>↹ Tab</kbd></li><li>Move down        = <kbd>⇧ Shift</kbd> + <kbd>&uarr;</kbd></li><li>Move up          = <kbd>⇧ Shift</kbd> + <kbd>&darr;</kbd></li><li>Jump to end      = <kbd><span aria-hidden>⊞ Windows</span><span class="sr-only">Windows key</span></kbd> + <kbd>&rarr;</kbd></li><li>Jump to start    = <kbd><span aria-hidden>⊞ Windows</span><span class="sr-only">Windows key</span></kbd> + <kbd>&larr;</kbd></li><li>Display selected = <kbd>Enter</kbd></li></ul></pre></details></stack-l></dd>
              </stack-l>
            </dl>
          </stack-l>
            `

    // Add the dialog inside of the web component, after the gallery thumbs.
    this.insertBefore(modal, this.parentNode.nextSibling);

    // <dialog> variables.
    const current       = modal.querySelector(`#current`);
    const thumbs        = modal.querySelector(`.gallery--thumbs`);
    const thumbsList    = modal.querySelectorAll(`.gallery--thumbs img`);
    const closeButton   = modal.querySelector(`button`);
    const details       = modal.getElementsByTagName(`details`)[0];
    const summary       = details.firstElementChild;
    // Set this attribute if the image source path is relative.
    const stripProtocol = this.getAttribute(`rel`);
    // If this attribute is present, it will affect all galleries on the page.
    // The final gallery wins because its style rule is read last.
    let   cols          = this.getAttribute(`cols`);

    cols                = parseInt(cols);

    // Default columns for thumbnails is 8.
    if (!cols) {
      cols = 6;
    };

    // Update the number of columns based on the cols attribute.
    thumbs.classList.add(`gallery--thumbs_` + cols);

    // Show the keyboard hint only if the hint attribute === TRUE.
    if (!this.hasAttribute(`hint`)) {
      details.setAttribute(`hidden`, true);
    } else {
      details.removeAttribute(`hidden`);
    };

    /**
     * Open and close the dialog, update the featured image, and handle focus.
     */

    // Listen for click on image.
    imgNodeList.forEach(
      imgNodeList => imgNodeList.addEventListener(`click`, (e) => {
        e.preventDefault();

        // Prevent scrolling outside the modal; see
        // https://www.joshwcomeau.com/css/has/#global-detection-6.
        modal.setAttribute(`data-disable-document-scroll`, true);

        // Get the clicked image alt.
        const clickedAlt = e.target.getAttribute(`alt`);

        // Remove the `current` class from every image.
        thumbsList.forEach(thumbsList => (thumbsList.classList.remove(`current`)));
        // Change featured image src to src of clicked image.
        let imgSrc = e.target.src;

        // Get the hostname from the image URL.
        let host = imgSrc.match(/:\/\/(www\.)?(.[^/:]+)/i)[2];

        // If the image is hosted on the dev or production server or if the
        // stripProtocol attribute is set, strip the protocol and domain from
        // the URL. Only works if the URL uses a relative path!
        if (host === `localhost` || host === `127.0.0.1` || this.hasAttribute(`rel`)) {
          imgSrc = imgSrc.replace(/^.*\/\/[^\/]+/, '');
        };

        // Set the featured image path.
        current.src = imgSrc;

        // Set the featured image alt.
        current.setAttribute(`alt`, clickedAlt);

        // Update the figcaption.
        currentCaption.innerText = clickedAlt;

        // Find the matching thumbnail. Resulting nodelist should contain only
        // one item.
        const matchingImg = thumbs.querySelectorAll(`[src="${imgSrc}"]`)[0];

        // Add the `current` class to the thumbnail.
        matchingImg.classList.add(`current`);

        // Remove autofocus if it is set.
        thumbsList.forEach(thumbsList => (thumbsList.removeAttribute(`autofocus`)));

        // Autofocus on the thumbnail.
        matchingImg.setAttribute(`autofocus`, true);

        // Open the modal.
        modal.showModal();
      })
    );

    // Listen for the enter key click.
    imgNodeList.forEach(
      imgNodeList => imgNodeList.addEventListener(`keydown`, (e) => {
        switch (e.key) {
          case `Enter`:
            e.preventDefault();
            const clickedAlt = e.target.getAttribute(`alt`);

            modal.setAttribute(`data-disable-document-scroll`, true);

            let imgSrc  = e.target.src;
            let host = imgSrc.match(/:\/\/(www\.)?(.[^/:]+)/i)[2];

            if (host === `localhost` || host === `127.0.0.1` || this.hasAttribute(`hint`)) {
              imgSrc = imgSrc.replace(/^.*\/\/[^\/]+/, '');
            };

            current.src = imgSrc;

            current.setAttribute(`alt`, clickedAlt);

            currentCaption.innerText = clickedAlt;

            thumbsList.forEach(thumbsList => (thumbsList.classList.remove(`current`)));

            const matchingImg = thumbs.querySelectorAll(`[src="${imgSrc}"]`)[0];

            matchingImg.classList.add(`current`);

            thumbsList.forEach(thumbsList => (thumbsList.removeAttribute(`autofocus`)));

            matchingImg.setAttribute(`autofocus`, true);

            modal.showModal();

            break;
            default:
            return;
          }
        },
        true,
      )
    );

     // Listen for button click
    closeButton.addEventListener(`click`, (e) => {
      // Stop preventDefault() on parent elements from propagating to the button.
      e.stopPropagation();

      // Allow scrolling outside the modal.
      modal.removeAttribute(`data-disable-document-scroll`);

      // Close the modal.
      modal.close();
    });

    // Listen for the escape key click.
    window.addEventListener(`keydown`, (e) => {
        if (e.defaultPrevented) {
          return;
        }

        switch (e.key) {
          case `Escape`:
            // Allow scrolling outside the modal.
            modal.removeAttribute(`data-disable-document-scroll`);
            break;
          default:
            return;
        }
      // Set useCapture flag to true; see
      // https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#usecapture
      }, true );


    // Close the dialog when ::backdrop is clicked.
    modal.addEventListener(`click`, (e) => {
      // Get the dialog boundaries
      const rect = modal.getBoundingClientRect();
      // Define dialog inner boundary.
      const isInDialog = (rect.top <= e.clientY && e.clientY <= rect.top + rect.height && rect.left <= e.clientX && e.clientX <= rect.left + rect.width);

      // If the click is not inside the boundary, close the dialog.
      if (!isInDialog) {
        modal.removeAttribute(`data-disable-document-scroll`);
        modal.close();
      }
    });

    /**
     * Event listeners for *inside* the modal.
     * Navigate, select featured image, and toggle <details>.
     */

    // The event listener for the modal thumbnails.
    thumbs.addEventListener(`click`, imgClick);

    let currentCaption = current.nextElementSibling;

    function imgClick(e) {
      e.preventDefault();

      // Get the clicked image alt attribute.
      const clickedAlt = e.target.getAttribute(`alt`);

      // Remove the `current` class to reset the thumbnail opacity.
      thumbsList.forEach(thumbsList => (thumbsList.classList.remove(`current`)));

      // Remove autofocus.
      thumbsList.forEach(thumbsList => (thumbsList.removeAttribute(`autofocus`)));

      // Change current image src to src of clicked image.
      current.src = e.target.src;

      // Update the figcaption.
      currentCaption.innerText = clickedAlt;

      // Set the alt tag on the featured image.
      current.setAttribute(`alt`, clickedAlt);

      // Add fade-in class to the featured image.
      current.classList.add(`fade-in`);

      // Remove fade-in class after .5 seconds.
      setTimeout(() => current.classList.remove(`fade-in`), 500);

      // Add the `current` class to change the opacity on the clicked image.
      e.target.classList.add(`current`);
    }

    thumbs.addEventListener(`keydown`, (e) => {
      let prevFocused = document.activeElement;
      let parent      = prevFocused.parentNode;
      let prevIndex   = Array.prototype.indexOf.call(parent.children, prevFocused);
      let total       = thumbsList.length;
      let remainder   = total % cols;
      let goUp        = (total - remainder) + 1 + prevIndex;
      let goUpShort   = (total - remainder) - (cols - 1) + prevIndex;
      let goDown      = (remainder - total) + (prevIndex + 1);
      let goDownShort = (remainder - total) + (cols + 1) + prevIndex;

      if (goDownShort > cols) {
        goDownShort = goDownShort - cols;
      };

      if (e.defaultPrevented) {
        return; // Do nothing if the event was already processed
      };

      if (e.metaKey) { // The CMD key combo listener.
        switch (e.key) {
          case `ArrowLeft`:
            e.preventDefault();

            // Get the first thumbnail.
            let firstFocused = prevFocused.parentNode.firstElementChild;

            // Move focus to the first thumbnail.
            firstFocused.focus();

            break;

          case `ArrowRight`:
            e.preventDefault();

             // Get the last thumbnail.
            let lastFocused = prevFocused.parentNode.lastElementChild;

            // Move focus to the last thumbnail.
            lastFocused.focus();

            break;

          default:
            return;
        }
        // Cancel the default action to avoid it being handled twice.
        e.preventDefault();
      } else if (e.shiftKey) { // The shift key combo listener.
        switch (e.key) {
          case `ArrowUp`:
            e.preventDefault();

            // Get the offset to the previous row, based on `cols` attribute.
            let upFocusedIndex = prevIndex - (cols - 1);

            let upFocused;

            // Offset is not a negative number.
            if (upFocusedIndex > 0) {
            // Find the element directly above.
              upFocused = parent.querySelector(`:nth-child(${upFocusedIndex})`);
            } else {
              // But if offset is negative, to to the last row.
              upFocused = parent.querySelector(`:nth-child(${goUp})`);

              // If selected image is on the penultimate row but has no image
              // below it (because the last row is short), jump to the first
              // row.
              if (upFocused < total) {
                upFocused = parent.querySelector(`:nth-child(${goUpShort})`);
              };

            };

            // Move focus to the element.
            upFocused.focus();

            break;

          case `ArrowDown`:
            e.preventDefault();

            // Get the offset to the next row, based on `cols` attribute.
            let downFocusedIndex = prevIndex + (cols + 1);

            let downFocused;

            // Index does not exceed the number of items.
            if (downFocusedIndex < total + 1) {
              downFocused = parent.querySelector(`:nth-child(${downFocusedIndex})`);
            } else {
              // Index exceeds number of items; jump to first row.
              downFocused = parent.querySelector(`:nth-child(${goDown})`);

              // Item is in penultimate row and last row is short; calculate
              // offset to find first row.
              if (downFocusedIndex > total - (cols + 1)) {
                downFocused = parent.querySelector(`:nth-child(${goDownShort})`);
              };
            };

            downFocused.focus();

            break;

          default:
            return;
        }
        e.preventDefault();
      } else {
        switch (e.key) {

          case `Enter`:
            e.preventDefault();
            const clickedAlt = e.target.getAttribute(`alt`);

            thumbsList.forEach(thumbsList => (thumbsList.classList.remove(`current`)));

            thumbsList.forEach(thumbsList => (thumbsList.removeAttribute(`autofocus`)));

            current.src = e.target.src;

            currentCaption.innerText = clickedAlt;

            current.setAttribute(`alt`, clickedAlt);

            current.classList.add(`fade-in`);

            setTimeout(() => current.classList.remove(`fade-in`), 500);

            e.target.classList.add(`current`);

            break;

          case `ArrowLeft`: // Navigate through the thumbnails.

            if (prevFocused.nodeName === `IMG` && prevFocused.parentNode.classList.contains(`gallery--thumbs`)) {

              e.preventDefault();

              let prevChoice = prevFocused.previousElementSibling;

              if (prevChoice) {
                prevChoice.focus();
              } else {
                prevFocused.parentNode.lastElementChild.focus();
              };

            } else {
              return;
            };

            break;

          case `ArrowRight`:

            if (prevFocused.nodeName === `IMG` && prevFocused.parentNode.classList.contains(`gallery--thumbs`)) {

              e.preventDefault();

              let nextChoice = prevFocused.nextElementSibling;

              if (nextChoice) {
                nextChoice.focus();
              } else {
                prevFocused.parentNode.firstElementChild.focus();
              }

            } else {
              return;
            };

            break;
          default:
            return;
        }
        e.preventDefault();
      };
    }, true );

    // Keyboard events for the <details> & <summary> element.
    summary.addEventListener(`keydown`, (e) => {
      switch (e.key) {
        case `Enter`:
          e.preventDefault();
          details.toggleAttribute(`open`);
          break;
        case ` `:
          e.preventDefault();
          details.toggleAttribute(`open`);
          break;
        default:
          return;
      }
    }, true );

  };
};

if (`customElements` in window) {
  customElements.define(`tiki-dialog-gallery`, DialogGallery);
}
