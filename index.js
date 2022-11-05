const PORT = 5001;
require('dotenv').config();
const ideasURL = process.env.IDEASURL;
const toolsURL = process.env.TOOLSURL;
const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());

app.get("/", function (req, res) {
  res.json({ message: "Web Scrapping Ideas" });
});

app.get("/ideas", (req, res) => {
  axios(ideasURL)
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);
      const ideas = [];

      $(".td", html).each(function () {
        const idea = String($(this).find(".idea").text());
        // const url = ideasURL + $(this).find("a").attr("href");
        if (idea !== "") {
          ideas.push({ idea });
        }
      });
      res.json(ideas);
    })
    .catch((err) => console.log(err));
});

app.get("/domains", function (req, res) {
  axios(ideasURL)
    .then((response) => {
      const resp = response.data;
      const $ = cheerio.load(resp);
      const domains = [];
      const redirect = [];

      $(".tag-link", resp).each(function () {
        const domain = $(this).text().replace(/(\r\n|\n|\r|\t)/gm, "");
        const url = $(this).attr("href");

        domains.push({
          "domain": domain,
          "url": url,
        });
        // redirect.push(url)
      });
      // console.log(redirect)
      res.json(domains);
    })
    .catch((err) => console.log(err));
});

app.get('/tools', function (req, res) {
  axios(toolsURL).then((response) => {
    const resp = response.data;
    const $ = cheerio.load(resp);
    const tools = [];

    $(".tool-meta-title", resp).each(function() {
      const tool = $(this).find("h2").find("a").text();

      tools.push({ tool })
    });
    res.json(tools);
  })
})

app.listen(PORT || 8000, () => console.log(`Server running on PORT ${PORT}`));
