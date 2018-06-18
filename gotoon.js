// parser for gotoon.js
const cheerio = require("cheerio");
const fetch = require("node-fetch");
const fs = require("fs");

fetchEpisodes().then(episodes => {
  console.log(episodes);
});
function fetchEpisodes(url = "") {
  return new Promise((resolve, reject) => {
    try {
      const body = fs
        .readFileSync(
          "./examplePages/episodePages/gotoonExampleEpisodePage.html"
        )
        .toString();

      const $ = cheerio.load(body);
      let episodes = [];
      $(".toonEpisodeList a").each((index, element) => {
        let title = element.childNodes[3].childNodes[0].data;
        let url = element.attribs.href;
        episodes.push({
          title,
          url
        });
      });
      resolve(episodes);
    } catch (error) {
      reject(error);
    }
  });
}

function fetchScenes(
  url = `https://www.gotoon.net/view/184167/%ED%86%A1%ED%88%AC%EB%AF%B8-6%ED%99%94-%EC%97%AC%EB%A1%9C%EB%AA%A8%EB%A1%9C-%EA%B0%90%EA%B2%A9`
) {
  fetch(url)
    .then(response => response.text())
    .then(body => {
      const $ = cheerio.load(body);
      const imageElements = $(".contents img");
      const images = [];
      imageElements.each((index, image) => {
        images.push({
          src: image.attribs.src,
          alt: image.attribs.alt
        });
      });
      console.log("Done");
    });
}
