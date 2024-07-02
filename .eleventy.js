const browserslist                = require('browserslist');
const eleventyAutoCacheBuster     = require('eleventy-auto-cache-buster');
const eleventyPluginFilesMinifier = require('@sherby/eleventy-plugin-files-minifier');
const esbuild                     = require('esbuild');
const govukEleventyPlugin = require('@x-govuk/govuk-eleventy-plugin')
const Image                       = require('@11ty/eleventy-img');
const markdownIt                  = require('markdown-it');
const markdownItAnchor            = require('markdown-it-anchor');
const markdownItAttrs             = require('markdown-it-attrs');
const outdent                     = require('outdent');
const path                        = require('path');
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

// For Markdown attributes
let options = {
  html: true,
  breaks: true,
  linkify: true
};

let markdownLib = markdownIt(options).use(markdownItAnchor).use(markdownItAttrs);

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
  // For inline SVG; see https://medium.com/@brettdewoody/inlining-svgs-in-eleventy-cffb1114e7b
  eleventyConfig.addNunjucksAsyncShortcode('svgIcon', async (src) => {
    let metadata = await Image(src, {
      formats: ['svg'],
      dryRun: true,
    })
    return metadata.svg[0].buffer.toString()
  });
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
    // Options
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
  // Sorted collection
  // See https://www.11ty.dev/docs/collections/#advanced-custom-filtering-and-sorting
	eleventyConfig.addCollection(`recipesAscending`, function (collectionApi) {
		return collectionApi.getFilteredByTag(`recipes`).sort(function (a, b) {
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
  // Set custom directory for input; otherwise use defaults
  return {
    // When a passthrough file is modified, rebuild the pages:
    passthroughFileCopy: true,
    // Copy any file in these formats:
    templateFormats: [`html`, `njk`, `md`, `js`, `woff2`],
    markdownTemplateEngine: `njk`,
    htmlTemplateEngine: `njk`,
    dataTemplateEngine: `njk`,
    // Set up directory structure:
    dir: {
      input: `src`
    },
  };
};
