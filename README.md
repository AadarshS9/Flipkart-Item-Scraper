# Flipkart Scraper with Puppeteer

## Overview
This project utilizes Puppeteer, a Node library, to scrape product data from Flipkart. The script navigates through Flipkart's mobiles section, extracts relevant product details such as name, rating, price, description, and link, and stores them in a JSON file (`product.json`).

## Features
- **Scraping:** Fetches product information (name, rating, price, description, link) from Flipkart dynamically using Puppeteer.
- **JSON Output:** Outputs scraped data into a structured JSON format (`product.json`).
- **Error Handling:** Includes error handling to manage potential issues during scraping and file writing.

## Requirements
- Node.js
- npm (Node Package Manager)
- Puppeteer (automatically installed via `npm install`)
- fs 

## Installation
1. ```
   npm init -y
   ```

2. ```
   npm install puppeteer fs
   ```

3. ```
   node index
   ```

## Output
View the output in `product.json`.

## Notes
- This script is designed for educational purposes and should be used responsibly and in accordance with Flipkart's terms of service.
- Feel free to expand functionality or modify the script for other websites or additional data points.

## Credits and References
https://www.youtube.com/watch?v=zN0xsOcvBbQ&list=PLH6nRB03rCrP3iYQnhxQkfF46yGk3TESL&index=4
