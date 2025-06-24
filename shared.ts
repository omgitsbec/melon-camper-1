import type { Page } from "puppeteer"

/**
 * The paths to your JSON file for cookies.
 */
export const COOKIES_JSON = "./cookies.json"

/**
 * If false, a Chromium tab will open, and you'll be able to see the automation run.
 */
export const IS_HEADLESS: boolean = false

/**
 * The link to the Melon Global login page.
 */
export const LOGIN_URL: string =
  "https://gmember.melon.com/login/login_form.htm?langCd=EN"

/**
 * The link to your target concert, on the Melon Global website.
 */
export const CONCERT_URL =
  "https://tkglobal.melon.com/performance/index.htm?langCd=EN&prodId=211530"

/**
 * Sometimes, concerts run over multiple days.
 * For which of these days are you looking for tickets?
 * 0-indexed number.
 */
export const NIGHT: number = 1

/**
 * It's typically unlikely for the best tickets (for example, VIP/floor) to be found.
 * You can forego checking these sections.
 */
export const CHECK_BEST: boolean = false

/**
 * How many times should it check through every section, before giving up?
 */
export const LOOPS: number = 100

/**
 * The YouTube video to play when a ticket is found.
 */
export const YOUTUBE_VIDEO: string =
  "https://www.youtube.com/watch?v=Ngpf6UtPn4k"

export const loadBrowser = async (page: Page, WEBSITE_URL: string) => {
  await page.goto(WEBSITE_URL)

  await page.setViewport({ width: 1080, height: 1024 })

  await page.waitForNetworkIdle()
}

export const delay = async (time: number) => {
  return new Promise(function (resolve) {
    setTimeout(resolve, time)
  })
}
