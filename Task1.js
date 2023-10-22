const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto('https://example.com'); // Replace with the URL of the website you want to scrape.

  // Extract email
  const email = await page.evaluate(() => {
    const paragraphElement = document.querySelector('p.text-align'); // Use backslashes to escape special characters in class names
    if (paragraphElement) {
      const emailElement = paragraphElement.querySelector('.fa fa-envelope');
      return emailElement ? emailElement.textContent.trim() : null;
    }
    return null;
  });

  // Extract phone number
  const phoneNumber = await page.evaluate(() => {
    const paragraphElement = document.querySelector('call-md-4'); // Use backslashes to escape special characters in class names
    if (paragraphElement) {
      const phoneElement = paragraphElement.querySelector('.fa.fa-phone'); // Replace with the actual class for the phone number element
      return phoneElement ? phoneElement.textContent.trim() : null;
    }
    return null;
  });

  console.log('Email:', email);
  console.log('Phone Number:', phoneNumber);

  await browser.close();
})();
