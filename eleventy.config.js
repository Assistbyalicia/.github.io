module.exports = function(eleventyConfig) {

  eleventyConfig.addPassthroughCopy("styles.css");
  eleventyConfig.addPassthroughCopy("includes.js");
  eleventyConfig.addPassthroughCopy("robots.txt");
  eleventyConfig.addPassthroughCopy("sitemap.xml");
  eleventyConfig.addPassthroughCopy({ "src/Logo.png": "Logo.png" });
  eleventyConfig.addPassthroughCopy("src/Photo-de-profil.png");
  eleventyConfig.addPassthroughCopy("Capture - Audit de temps.png");
  eleventyConfig.addPassthroughCopy("partials");
  eleventyConfig.addPassthroughCopy("llms.txt");

  // Force les URLs en .html au lieu de /dossier/index.html
  eleventyConfig.addGlobalData("permalink", "{{ page.filePathStem }}.html");

  return {
    dir: {
      input: "src",
      includes: "../_includes",
      output: "_site"
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
};