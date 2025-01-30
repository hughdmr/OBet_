import puppeteer from 'puppeteer';

export async function scrapeBet365() {
  const browser = await puppeteer.launch({
    headless: false, // Set to true to run without UI; false to see the browser action
    defaultViewport: null, // To avoid cutting off parts of the page
  });

  const page = await browser.newPage();

  try {
    // Navigate to the Bet365 homepage
    await page.goto('https://www.bet365.com.au/#/HO/', { waitUntil: 'networkidle0' });

    // Click on the "Allow Cookies" button
    await page.waitForSelector('.ccm-CookieConsentPopup_Accept');
    await page.click('.ccm-CookieConsentPopup_Accept');

    // Wait for the main content to load
    await page.waitForSelector('.your-main-content-selector', { timeout: 10000 }); // Replace with the actual selector

    // Scrape all relevant data from the page
    const data = await page.evaluate(() => {
      const allDataElements = document.querySelectorAll('.data-element-selector'); // Replace with the actual selector
      return Array.from(allDataElements).map(element => element.textContent);
    });

    console.log('Scraped Data:', data);
    return data;
  } catch (error) {
    console.error('Error scraping Bet365:', error);
    throw error;
  } finally {
    // Wait for a certain duration before closing the browser
    await new Promise(resolve => setTimeout(resolve, 10000)); // Wait for 10 seconds
    // Close the browser
    await browser.close();
  }
}

// Call the function and log the output
scrapeBet365()
  .then(data => {
    console.log('Successfully Scraped Data:', data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
