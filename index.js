// Importing the required modules
const puppeteer = require('puppeteer');
const fs = require('fs');

async function main () {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('https://www.flipkart.com/search?q=mobiles', {
    timeout: 0,
    waitUntil: 'networkidle0'
  });

  console.log('Scraping Data From Flipkart');
  const productData = await page.evaluate(() => {
    const data = { list: [] };
    const items = document.querySelectorAll('div[data-id]');
    items.forEach((item, index) => {
      console.log(`Scraping Data From Product: ${index}`);
      const id = item.getAttribute('data-id');
      const name = item.querySelector('div.KzDlHZ') && item.querySelector('div.KzDlHZ').textContent;
      const rating = item.querySelector('div.XQDdHH') && item.querySelector('div.XQDdHH').textContent;
      const price = item.querySelector('div.Nx9bqj._4b5DiR') && item.querySelector('div.Nx9bqj._4b5DiR').innerText;
      const description = item.querySelector('div._6NESgJ') && item.querySelector('div._6NESgJ').textContent;
      const link = item.querySelector('a.CGtC98') && item.querySelector('a.CGtC98').href;
      
      data.list.push({
        id: id,
        name: name,
        rating: rating,
        price: price,
        description: description,
        link: link
      });
    });

    return data;
  });

  console.log(`Successfully Scraped ${productData.list.length} Products`);

 // Construct the JSON string with each product on a new line
 let json = '';
 productData.list.forEach((product, index) => {
   json += JSON.stringify(product);
   if (index < productData.list.length - 1) {
     json += ',\n'; // Add comma and new line except after the last product
   } else {
     json += '\n'; // Add newline after the last product
   }
 });

 fs.writeFile('product.json', json, 'utf8', (err) => {
   if (err) {
     console.error('Error writing file:', err);
   } else {
     console.log('Data Extracted Successfully');
   }
 });

 await browser.close(); // The browser is closed after the data is extracted
}

main().catch(err => {
 console.error('Error:', err.message); // Any errors that occur during the process are caught and logged to the console
});

// Main function to scrape the data from the Flipkart website
// This function will open the browser, navigate to the Flipkart website, scrape the data, and save it to a JSON file
// The data scraped includes product id, name, rating, price, description, and link
// The data is saved to a JSON file named 'product.json'

// The main function is asynchronous to handle the asynchronous nature of Puppeteer
// The headless option of the puppeteer.launch method is set to false to run the browser in non-headless mode for debugging
// The timeout option of the page.goto method is set to 0 to disable the timeout for navigation
// The waitUntil option of the page.goto method is set to 'networkidle0' to wait until there are no more than 0 network connections for at least 500 ms
// This ensures that the page is fully loaded before scraping the data
// The data is scraped from the Flipkart search results page for mobiles
// The function uses the evaluate method of the page object to run the JavaScript code in the context of the page
// The JavaScript code extracts the required data from the HTML elements on the page
// The extracted data is stored in an object and returned to the Node.js environment
// The returned data is then converted to a JSON string and written to a file using the fs module