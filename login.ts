const puppeteer = await import("puppeteer");
const fs = await import("fs/promises");

const browser = await puppeteer.default.launch({
  headless: false,
  slowMo: 50,
});

const page = await browser.newPage();

await page.goto("https://ticket.melon.com/login/login.htm");

console.log("👋 Please log in manually in the browser window...");

await page.waitForNavigation({ waitUntil: "networkidle2" });

// Save cookies after login
const cookies = await page.cookies();
await fs.writeFile("cookies.json", JSON.stringify(cookies, null, 2));

console.log("✅ Cookies saved to cookies.json");

await browser.close();

