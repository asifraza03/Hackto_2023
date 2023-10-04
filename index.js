const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
const fs = require("fs");

const scrapeMyntra = async () => {
  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    const url = "https://www.myntra.com/";
    await page.goto(url);

    const productname = "mobiles"; // Replace with your search query
    await page.type(".desktop-searchBar", productname);
    await page.keyboard.press("Enter");

    await page.waitForTimeout(1000);
    const content = await page.content();
    const $ = cheerio.load(content);
    const products = [];

    const numberr = 50; // Set the number of products you want to scrape

    $(".product-base").each((index, element) => {
      if (index < numberr) {
        const innerText = $(element).find(".product-product").text();
        const src = $(element)
          .find(".product-imageSliderContainer img")
          .attr("src");
        const price = $(element).find(".product-discountedPrice").text();

        const newData = {
          name: innerText,
          imageurl: src,
          price: price,
          description: "",
        };

        products.push(newData);

        if (products.length === numberr) {
          // Convert the products array to JSON and save it to a file
          const jsonData = JSON.stringify(products, null, 2);

          fs.writeFile("Object2.json", jsonData, (err) => {
            if (err) {
              console.error("Error writing JSON file:", err);
            } else {
              console.log("Data saved to Object2.json.");
            }
          });

          browser.close();
        }
      }
    });
  } catch (error) {
    console.error("Error running Puppeteer script:", error);
  }
};

scrapeMyntra();
