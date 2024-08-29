const elasticlunr = require("elasticlunr");

module.exports = function (collection) {
  // what fields we'd like our index to consist of
  let index = elasticlunr(function () {
    this.addField(`title`);
    this.addField(`searchTitle`);
    this.addField(`type`);
    this.addField(`characteristic`);
    this.addField(`base`);
    this.addField(`ingredients`);
    this.addField(`garnish`);
    this.addField(`glass`);
    this.addField(`origin`);
    this.addField(`source`);
    this.addField(`decade`);
    this.setRef(`id`);
  });

  // loop through each page and add it to the index
  collection.forEach((page) => {
    // Add trimmer, stop words, and language stemming to the pipeline;
    // See http://elasticlunr.com/docs/pipeline.js.html
    index.pipeline.add(
      elasticlunr.trimmer,
      elasticlunr.stopWordFilter,
      elasticlunr.stemmer
    );
    index.addDoc({
      id: page.url,
      title: page.template.frontMatter.data.title,
      searchTitle: page.template.frontMatter.data.searchTitle,
      type: page.template.frontMatter.data.type,
      characteristic: page.template.frontMatter.data.characteristic,
      base: page.template.frontMatter.data.base,
      ingredients: page.template.frontMatter.data.ingredients,
      garnish: page.template.frontMatter.data.garnish,
      glass: page.template.frontMatter.data.glass,
      origin: page.template.frontMatter.data.origin,
      source: page.template.frontMatter.data.source,
      decade: page.template.frontMatter.data.decade
    });
  });

  return index.toJSON();
};
