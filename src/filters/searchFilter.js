const elasticlunr = require("elasticlunr");

module.exports = function (collection) {
  // what fields we'd like our index to consist of
  var index = elasticlunr(function () {
    this.addField("title");
    this.addField("type");
    this.addField("characteristic");
    this.addField("base");
    this.addField("ingredients");
    this.addField("garnish");
    this.addField("glass")
    this.setRef("id");
  });

  // loop through each page and add it to the index
  collection.forEach((page) => {
    index.addDoc({
      id: page.url,
      title: page.template.frontMatter.data.title,
      type: page.template.frontMatter.data.type,
      characteristic: page.template.frontMatter.data.characteristic,
      base: page.template.frontMatter.data.base,
      ingredients: page.template.frontMatter.data.ingredients,
      garnish: page.template.frontMatter.data.garnish,
      glass: page.template.frontMatter.data.glass
    });
  });

  return index.toJSON();
};
