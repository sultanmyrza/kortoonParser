const cheerio = require("cheerio");
const fetch = require("node-fetch");
const fs = require("fs");

function fetchKortoons(url = "https://cointoon.net/") {
  return new Promise((resolve, reject) => {
    try {
      // TODO get body from real fetch
      body = fs
        .readFileSync(
          "./examplePages/kortoonPages/cointoonExampleKortoonPage.html"
        )
        .toString();
      const $ = cheerio.load(body);
      const kortoons = [];
      $(".week_box").each(function(index, element) {
        let a = element.childNodes[5];
        let img = a.childNodes[1];
        kortoons.push({
          title: img.attribs.alt,
          url: a.attribs.href,
          thumb: img.attribs.src
        });
      });

      resolve(kortoons);
    } catch (error) {
      reject(error);
    }
  });
}

function fetchEpisodes(url = "") {
  return new Promise((resolve, reject) => {
    try {
      // TODO: get body from real fetch
      const body = fs
        .readFileSync(
          "./examplePages/episodePages/cointoonExampleEpisodePage.html"
        )
        .toString();
      const $ = cheerio.load(body);
      const episodes = [];
      $(".toon_tlist li a").each((index, element) => {
        console.log(element);
        let episode = {
          title: element.firstChild.data,
          url: element.attribs.href
        };
        episodes.push(episode);
      });
      reolve(episodes);
    } catch (error) {
      reject(error);
    }
  });
}

function fetchScenes(
  url = "https://cointoon.net/comic_view/60833/%EA%B1%B0%EC%A0%88+%EB%AA%BB%ED%95%98%EB%8A%94+%EC%97%AC%EC%9E%90+1%ED%99%94"
) {
  fetch(url)
    .then(res => res.text())
    .then(body => {
      const $ = cheerio.load(body);
      const imageElements = $(".view_img img");
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
