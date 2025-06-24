const puppeteer = await import("puppeteer");
const fs = await import("fs/promises");

import {
  CONCERT_URL,
  COOKIES_JSON,
  NIGHT,
  YOUTUBE_VIDEO,
  CHECK_BEST,
} from "./shared";

// Launch browser
const browser = await puppeteer.default.launch({
  headless: false,
  slowMo: 50,
});
const page = await browser.newPage();

// Load saved cookies
const cookiesData = await fs.readFile(COOKIES_JSON, "utf-8");
const cookies = JSON.parse(cookiesData);
await page.setCookie(...cookies);

while (true) {
  const page = await browser.newPage();
  await page.setCookie(...cookies);
  await page.goto(CONCERT_URL, { waitUntil: "networkidle2" });

  const dates = await page.$$("#box_list_date #list_date li");
  console.log(`🎟️ Found ${dates.length} dates`);
  if (!dates[NIGHT]) {
    console.error("❌ The date you selected does not exist.");
    process.exit(1);
  }
  await dates[NIGHT].click();
  await new Promise((r) => setTimeout(r, 1000));

  const seats = await page.$$(".wrap_btn .btn_ticket");

if (seats.length > 0) {
  console.log("✅ Seat(s) available!");

  // 📲 Send phone alert via Pushover
  await fetch("https://api.pushover.net/1/messages.json", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      token: "avsxkxo6ndogx4tvhhu5r3sm2rmqo7", // your API token
      user: "us1kbjgoxswi2d3y6hh44thpkqioqs", // your user key
      title: "🎟️ Seat Found!",
      message: "Tickets are available for August 10 — go grab them!",
    })
  });

  // Optionally also play a YouTube alert
  if (YOUTUBE_VIDEO) {
    const newTab = await browser.newPage();
    await newTab.goto(YOUTUBE_VIDEO);
  }

  break; // stop looping after alert
  } else {
    console.log("🚫 No seats yet. Checking again in 2 minutes...");
    await new Promise((r) => setTimeout(r, 2 * 60 * 1000));
  }
} // 👈 closes the while loop}

await page.close(); // clean up old tab

