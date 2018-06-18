"parser for https://mangarock.com/manga/mrs-serie-259071/chapter/mrs-chapter-100246033";

const cheerio = require("cheerio");
const fetch = require("node-fetch");

fetchScenes();
function fetchScenes(
  url = "https://mangarock.com/manga/mrs-serie-259071/chapter/mrs-chapter-100246033"
) {
  fetch(url)
    .then(response => response.text())
    .then(body => {
      const $ = cheerio.load(body);
      console.log("Done");
    });
}
