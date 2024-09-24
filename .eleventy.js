const browserslist                = require('browserslist');
const eleventyAutoCacheBuster     = require('eleventy-auto-cache-buster');
const eleventyPluginFilesMinifier = require('@sherby/eleventy-plugin-files-minifier');
const { EleventyRenderPlugin }    = require('@11ty/eleventy');
const esbuild                     = require('esbuild');
const format                      = require('date-fns/format');
const govukEleventyPlugin         = require('@x-govuk/govuk-eleventy-plugin');
const Image                       = require('@11ty/eleventy-img');
const markdownIt                  = require('markdown-it');
const markdownItAnchor            = require('markdown-it-anchor');
const markdownItAttrs             = require('markdown-it-attrs');
const outdent                     = require('outdent');
// Next 2 constants for JS bundling browser targets
const {resolveToEsbuildTarget}    = require('esbuild-plugin-browserslist');
const target                      = resolveToEsbuildTarget(browserslist(
    'production' [
      '>0.2%',
      'Firefox ESR',
      'not dead',
      'not op_mini all'
    ],
      'development' [
      'last 1 chrome version',
      'last 1 firefox version',
      'last 1 safari version'
    ]
  ), {
  printUnknownTargets: false,
});
const search                      = require('./src/filters/searchFilter');
const { minify }                  = require('terser');

// For Markdown attributes
const markdownItOptions = {
  html: true,
  breaks: true,
  linkify: true
};

const markdownLib = markdownIt(markdownItOptions).use(markdownItAnchor).use(markdownItAttrs);

module.exports = function(eleventyConfig) {

  // Require layout file extensions; see
  // https://www.11ty.dev/docs/layouts/#omitting-the-layouts-file-extension
  eleventyConfig.setLayoutResolution(false);

  // Copy assets to build directory
  eleventyConfig.addPassthroughCopy(`src/assets/images`);
  eleventyConfig.addPassthroughCopy(`src/assets/fonts`);
  // Image shortcode
  const imageShortcode = async (
    src,
    className = undefined,
    alt,
    caption,
    widths = [400, 800, 1280],
    formats = ['webp', 'jpeg'],
    sizes = ['25vw', '50vw', '100vw']
  ) => {

    const imageMetadata = await Image(src, {
      widths: [...widths, null],
      formats: [...formats, null],
      outputDir: '_site/assets/images',
      urlPath: '/assets/images',
    });

    /** Maps a config of attribute-value pairs to an HTML string
     * representing those same attribute-value pairs.
     */
    const stringifyAttributes = (attributeMap) => {
      return Object.entries(attributeMap)
        .map(([attribute, value]) => {
          if (typeof value === 'undefined') return '';
          return `${attribute}="${value}"`;
        })
        .join(' ');
    };

    const sourceHtmlString = Object.values(imageMetadata)
      // Map each format to the source HTML markup
      .map((images) => {
        // The first entry is representative of all the others
        // since they each have the same shape
        const { sourceType } = images[0];

        // Use our util from earlier to make our lives easier
        const sourceAttributes = stringifyAttributes({
          type: sourceType,
          // srcset needs to be a comma-separated attribute
          srcset: images.map((image) => image.srcset).join(', '),
          sizes
        });

        // Return one <source> per format
        return `<source ${sourceAttributes}>`;
      })
      .join('\n');

    const getLargestImage = (format) => {
      const images = imageMetadata[format];
      return images[images.length - 1];
    }

    const largestUnoptimizedImg = getLargestImage(formats[0]);
    const imgAttributes = stringifyAttributes({
      src: largestUnoptimizedImg.url,
      width: largestUnoptimizedImg.width,
      height: largestUnoptimizedImg.height,
      alt,
      loading: 'lazy',
      decoding: 'async',
    });
    const imgHtmlString = `<img ${imgAttributes}>`;

    const pictureAttributes = stringifyAttributes({
      class: className,
    });
    if (caption === undefined) caption = ``;
    const picture = `<figure><picture ${pictureAttributes}>
      ${sourceHtmlString}
      ${imgHtmlString}
    </picture><figcaption>${caption}</figcaption></figure>`;

    return outdent`${picture}`;
  };
  // Needed for paired shortcodes
  eleventyConfig.addPlugin(EleventyRenderPlugin);
  // For inline SVG; see https://medium.com/@brettdewoody/inlining-svgs-in-eleventy-cffb1114e7b
  eleventyConfig.addNunjucksAsyncShortcode('svgIcon', async (src) => {
    let metadata = await Image(src, {
      formats: ['svg'],
      dryRun: true,
    })
    return metadata.svg[0].buffer.toString()
  });
  // JS inline minfication
  eleventyConfig.addNunjucksAsyncFilter(`jsmin`, async function (
    code,
    callback
  ) {
    try {
      const minified = await minify(code);
      callback(null, minified.code);
    } catch (err) {
      console.error(`Terser error: `, err);
      // Fail gracefully.
      callback(null, code);
    }
  });
  // Admonition (callout) shortcode
  eleventyConfig.addPairedShortcode(`callout`, async function(content, type, title) {
    const iconNote = `<svg viewBox="0 0 14 16"><path fill-rule="evenodd" d="M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"></path></svg>`;
    const iconTip = `<svg viewBox="0 0 12 16"><path fill-rule="evenodd" d="M6.5 0C3.48 0 1 2.19 1 5c0 .92.55 2.25 1 3 1.34 2.25 1.78 2.78 2 4v1h5v-1c.22-1.22.66-1.75 2-4 .45-.75 1-2.08 1-3 0-2.81-2.48-5-5.5-5zm3.64 7.48c-.25.44-.47.8-.67 1.11-.86 1.41-1.25 2.06-1.45 3.23-.02.05-.02.11-.02.17H5c0-.06 0-.13-.02-.17-.2-1.17-.59-1.83-1.45-3.23-.2-.31-.42-.67-.67-1.11C2.44 6.78 2 5.65 2 5c0-2.2 2.02-4 4.5-4 1.22 0 2.36.42 3.22 1.19C10.55 2.94 11 3.94 11 5c0 .66-.44 1.78-.86 2.48zM4 14h5c-.23 1.14-1.3 2-2.5 2s-2.27-.86-2.5-2z"></path></svg>`;
    const iconInfo = `<svg viewBox="0 0 14 16"><path fill-rule="evenodd" d="M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"></path></svg>`;
    const iconWarning = `<svg viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8.893 1.5c-.183-.31-.52-.5-.887-.5s-.703.19-.886.5L.138 13.499a.98.98 0 0 0 0 1.001c.193.31.53.501.886.501h13.964c.367 0 .704-.19.877-.5a1.03 1.03 0 0 0 .01-1.002L8.893 1.5zm.133 11.497H6.987v-2.003h2.039v2.003zm0-3.004H6.987V5.987h2.039v4.006z"></path></svg>`;
    const iconDanger = `<svg viewBox="0 0 12 16"><path fill-rule="evenodd" d="M5.05.31c.81 2.17.41 3.38-.52 4.31C3.55 5.67 1.98 6.45.9 7.98c-1.45 2.05-1.7 6.53 3.53 7.7-2.2-1.16-2.67-4.52-.3-6.61-.61 2.03.53 3.33 1.94 2.86 1.39-.47 2.3.53 2.27 1.67-.02.78-.31 1.44-1.13 1.81 3.42-.59 4.78-3.42 4.78-5.56 0-2.84-2.53-3.22-1.25-5.61-1.52.13-2.03 1.13-1.89 2.75.09 1.08-1.02 1.8-1.86 1.33-.67-.41-.66-1.19-.06-1.78C8.18 5.31 8.68 2.45 5.05.32L5.03.3l.02.01z"></path></svg>`;

    let titleStr = ``;

    if(title) {
      titleStr = title;
    } else if(type) {
      titleStr = type.substring(0, 1).toUpperCase() + type.substring(1).toLowerCase();
    } else {
      titleStr = `Info`;
    }

    let typeStr = ``;
    if(type) {
      typeStr = type.toLowerCase();
    }else{
      typeStr = `info`;
    }

    // ID for the admonition
    let noteID = ``;

    // For each admonition, create a string plus an incremented index
    for (let i = 0; i < typeStr.length; i++) {
      noteID = typeStr + `-` + [i];
    }

    let iconType = ``;

    switch(typeStr) {
      case `note`:
        iconType = iconNote;
        break;
      case `tip`:
        iconType = iconTip;
        break;
      case `info`:
        iconType = iconInfo;
        break;
      case `warning`:
        iconType = iconWarning;
        break;
      case `danger`:
        iconType = iconDanger;
        break;
      default:
        iconType = iconNote;
  }

    return `
    <div class="admonition ${typeStr}" id="${noteID}"><div class="admonition-heading"><span class="admonition-icon">${iconType}</span>${titleStr}</div><div class="admonition-content"><stack-l><p>${content}</p></stack-l>
      </div>
    </div>`
  })
  // Register image shortcode
  eleventyConfig.addNunjucksAsyncShortcode('image', imageShortcode);
  // Extended Markdown
  eleventyConfig.setLibrary('md', markdownLib);
  // Cache busting
  eleventyConfig.addPlugin(eleventyAutoCacheBuster, {
    globstring: `**/*.{css,js,png,jpg,jpeg,gif,webp,svg,mp4,ico}`
  });
  // Extended Markdown
  eleventyConfig.addPlugin(govukEleventyPlugin, {
    headingPermalinks: true,
  })
  // HTML minification
  eleventyConfig.addPlugin(eleventyPluginFilesMinifier);
  // JS  & CSS bundling, tree-shaking, & minification
  eleventyConfig.on(`eleventy.before`, async () => {
    await esbuild.build({
      entryPoints: [`src/assets/js/index.js`, `src/assets/css/index.css`],
      bundle: true,
      treeShaking: true,
      outdir: `_site/assets/`,
      sourcemap: true,
      minify: true,
      target // From our constant, set at top of file
    });
  });
  // Watch directories for changes
  eleventyConfig.addWatchTarget(`./src/assets/css/`);
  eleventyConfig.addWatchTarget(`./src/assets/js/`);
  // Search
  eleventyConfig.addFilter(`search`, search);
  // add `date` filter
  eleventyConfig.addFilter('date', function (date, dateFormat) {
    return format(date, dateFormat)
  })
  // Sorted collection
  // See https://www.11ty.dev/docs/collections/#advanced-custom-filtering-and-sorting
  eleventyConfig.addCollection(`recipesAscending`, function (collectionApi) {
    return collectionApi.getFilteredByTag(`recipes`).sort(function (a, b) {
      return a.inputPath.localeCompare(b.inputPath); // sort by path - ascending
    });
  });
  eleventyConfig.addCollection(`recipesAscendingA`, function (collectionApi) {
    return collectionApi.getFilteredByGlob(`**/recipes/a*.md`).sort(function (a, b) {
      return a.inputPath.localeCompare(b.inputPath); // sort by path - ascending
    });
  });
  eleventyConfig.addCollection(`recipesAscendingB`, function (collectionApi) {
    return collectionApi.getFilteredByGlob(`**/recipes/b*.md`).sort(function (a, b) {
      return a.inputPath.localeCompare(b.inputPath); // sort by path - ascending
    });
  });
  eleventyConfig.addCollection(`recipesAscendingC`, function (collectionApi) {
    return collectionApi.getFilteredByGlob(`**/recipes/c*.md`).sort(function (a, b) {
      return a.inputPath.localeCompare(b.inputPath); // sort by path - ascending
    });
  });
  eleventyConfig.addCollection(`recipesAscendingD`, function (collectionApi) {
    return collectionApi.getFilteredByGlob(`**/recipes/d*.md`).sort(function (a, b) {
      return a.inputPath.localeCompare(b.inputPath); // sort by path - ascending
    });
  });
  eleventyConfig.addCollection(`recipesAscendingE`, function (collectionApi) {
    return collectionApi.getFilteredByGlob(`**/recipes/e*.md`).sort(function (a, b) {
      return a.inputPath.localeCompare(b.inputPath); // sort by path - ascending
    });
  });
  eleventyConfig.addCollection(`recipesAscendingF`, function (collectionApi) {
    return collectionApi.getFilteredByGlob(`**/recipes/f*.md`).sort(function (a, b) {
      return a.inputPath.localeCompare(b.inputPath); // sort by path - ascending
    });
  });
  eleventyConfig.addCollection(`recipesAscendingG`, function (collectionApi) {
    return collectionApi.getFilteredByGlob(`**/recipes/g*.md`).sort(function (a, b) {
      return a.inputPath.localeCompare(b.inputPath); // sort by path - ascending
    });
  });
  eleventyConfig.addCollection(`recipesAscendingH`, function (collectionApi) {
    return collectionApi.getFilteredByGlob(`**/recipes/h*.md`).sort(function (a, b) {
      return a.inputPath.localeCompare(b.inputPath); // sort by path - ascending
    });
  });
  eleventyConfig.addCollection(`recipesAscendingI`, function (collectionApi) {
    return collectionApi.getFilteredByGlob(`**/recipes/i*.md`).sort(function (a, b) {
      return a.inputPath.localeCompare(b.inputPath); // sort by path - ascending
    });
  });
  eleventyConfig.addCollection(`recipesAscendingJ`, function (collectionApi) {
    return collectionApi.getFilteredByGlob(`**/recipes/j*.md`).sort(function (a, b) {
      return a.inputPath.localeCompare(b.inputPath); // sort by path - ascending
    });
  });
  eleventyConfig.addCollection(`recipesAscendingK`, function (collectionApi) {
    return collectionApi.getFilteredByGlob(`**/recipes/k*.md`).sort(function (a, b) {
      return a.inputPath.localeCompare(b.inputPath); // sort by path - ascending
    });
  });
  eleventyConfig.addCollection(`recipesAscendingL`, function (collectionApi) {
    return collectionApi.getFilteredByGlob(`**/recipes/l*.md`).sort(function (a, b) {
      return a.inputPath.localeCompare(b.inputPath); // sort by path - ascending
    });
  });
  eleventyConfig.addCollection(`recipesAscendingM`, function (collectionApi) {
    return collectionApi.getFilteredByGlob(`**/recipes/m*.md`).sort(function (a, b) {
      return a.inputPath.localeCompare(b.inputPath); // sort by path - ascending
    });
  });
  eleventyConfig.addCollection(`recipesAscendingN`, function (collectionApi) {
    return collectionApi.getFilteredByGlob(`**/recipes/n*.md`).sort(function (a, b) {
      return a.inputPath.localeCompare(b.inputPath); // sort by path - ascending
    });
  });
  eleventyConfig.addCollection(`recipesAscendingO`, function (collectionApi) {
    return collectionApi.getFilteredByGlob(`**/recipes/o*.md`).sort(function (a, b) {
      return a.inputPath.localeCompare(b.inputPath); // sort by path - ascending
    });
  });
  eleventyConfig.addCollection(`recipesAscendingP`, function (collectionApi) {
    return collectionApi.getFilteredByGlob(`**/recipes/p*.md`).sort(function (a, b) {
      return a.inputPath.localeCompare(b.inputPath); // sort by path - ascending
    });
  });
  eleventyConfig.addCollection(`recipesAscendingQ`, function (collectionApi) {
    return collectionApi.getFilteredByGlob(`**/recipes/q*.md`).sort(function (a, b) {
      return a.inputPath.localeCompare(b.inputPath); // sort by path - ascending
    });
  });
  eleventyConfig.addCollection(`recipesAscendingR`, function (collectionApi) {
    return collectionApi.getFilteredByGlob(`**/recipes/r*.md`).sort(function (a, b) {
      return a.inputPath.localeCompare(b.inputPath); // sort by path - ascending
    });
  });
  eleventyConfig.addCollection(`recipesAscendingS`, function (collectionApi) {
    return collectionApi.getFilteredByGlob(`**/recipes/s*.md`).sort(function (a, b) {
      return a.inputPath.localeCompare(b.inputPath); // sort by path - ascending
    });
  });
  eleventyConfig.addCollection(`recipesAscendingT`, function (collectionApi) {
    return collectionApi.getFilteredByGlob(`**/recipes/t*.md`).sort(function (a, b) {
      return a.inputPath.localeCompare(b.inputPath); // sort by path - ascending
    });
  });
  eleventyConfig.addCollection(`recipesAscendingU`, function (collectionApi) {
    return collectionApi.getFilteredByGlob(`**/recipes/u*.md`).sort(function (a, b) {
      return a.inputPath.localeCompare(b.inputPath); // sort by path - ascending
    });
  });
  eleventyConfig.addCollection(`recipesAscendingV`, function (collectionApi) {
    return collectionApi.getFilteredByGlob(`**/recipes/v*.md`).sort(function (a, b) {
      return a.inputPath.localeCompare(b.inputPath); // sort by path - ascending
    });
  });
  eleventyConfig.addCollection(`recipesAscendingW`, function (collectionApi) {
    return collectionApi.getFilteredByGlob(`**/recipes/w*.md`).sort(function (a, b) {
      return a.inputPath.localeCompare(b.inputPath); // sort by path - ascending
    });
  });
  eleventyConfig.addCollection(`recipesAscendingX`, function (collectionApi) {
    return collectionApi.getFilteredByGlob(`**/recipes/x*.md`).sort(function (a, b) {
      return a.inputPath.localeCompare(b.inputPath); // sort by path - ascending
    });
  });
  eleventyConfig.addCollection(`recipesAscendingY`, function (collectionApi) {
    return collectionApi.getFilteredByGlob(`**/recipes/y*.md`).sort(function (a, b) {
      return a.inputPath.localeCompare(b.inputPath); // sort by path - ascending
    });
  });
  eleventyConfig.addCollection(`recipesAscendingZ`, function (collectionApi) {
    return collectionApi.getFilteredByGlob(`**/recipes/z*.md`).sort(function (a, b) {
      return a.inputPath.localeCompare(b.inputPath); // sort by path - ascending
    });
  });
  eleventyConfig.addCollection(`mixesAscending`, function (collectionApi) {
    return collectionApi.getFilteredByTag(`mixes`).sort(function (a, b) {
      return a.inputPath.localeCompare(b.inputPath); // sort by path - ascending
    });
  });
  eleventyConfig.addCollection(`rumsAscending`, function (collectionApi) {
    return collectionApi.getFilteredByTag(`rums`).sort(function (a, b) {
      return a.inputPath.localeCompare(b.inputPath); // sort by path - ascending
    });
  });
  eleventyConfig.addCollection(`rhumsAscending`, function (collectionApi) {
    return collectionApi.getFilteredByTag(`rhums`).sort(function (a, b) {
      return a.inputPath.localeCompare(b.inputPath); // sort by path - ascending
    });
  });
// Copy `/favicon/` to `_site/`
eleventyConfig.addPassthroughCopy({ 'favicon': '/' });
// Set custom directory for input; otherwise use defaults
  return {
    // Site URL
    url: 'https://tinypaperumbrella.com',
    // When a passthrough file is modified, rebuild the pages:
    passthroughFileCopy: true,
    // Copy any file in these formats:
    templateFormats: [`html`, `njk`, `md`, `js`],
    markdownTemplateEngine: `njk`,
    htmlTemplateEngine: `njk`,
    dataTemplateEngine: `njk`,
    // Set up directory structure:
    dir: {
      input: `src`
    },
  };
};
