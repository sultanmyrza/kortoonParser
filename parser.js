import { rejects } from "assert";

const cheerio = require("cheerio");
const fetch = require("node-fetch");

function parser(url, parserAlgorithm) {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then(response => response.text)
      .then(body => {
        try {
          resolve(parserAlgorithm(body));
        } catch (error) {
          reject(error);
        }
      });
  });
}
