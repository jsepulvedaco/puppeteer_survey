'use strict';

const puppeteer = require(`puppeteer`)

const URL = ``
const siSelector = `[id*="form"] > span:nth-child(5) input`
const clickSelector = `span[class*="_vote-btn"].vote-btn.btn.visible`
let browser = '' // this asignation allows to close the browser if something fails

;(async () => {
    
    for (let i = 0; i < 8000; i++) {
        await loadPage(i)
    }

})()

async function loadPage(i) {
    if (browser !== '')
        await browser.close()

    try {
        browser = await puppeteer.launch() //{ headless: false } if you want to show chromium
        const page = await browser.newPage()
        //await page.setViewport({ width: 1280, height: 800 })

        console.log(`Waiting for page to load`)
        await page.goto(URL, { waitUntil: `networkidle2` }); //networkidle2 to wait till page loads (when there's less than 2 requests goin on)

        console.log(`waiting for selector  "${siSelector}"`)
        await page.waitForSelector(siSelector)
        
        console.log(`clicking "${siSelector}"`)
        await page.click(siSelector)
        
        console.log(`sleeping one second before removing alert`)
        await sleep(1000)
        
        console.log(`removing alert`) // we reassign the InterPoll variable overriding it with the alert commented
        
        console.log(`waiting for selector  "${clickSelector}"`)
        await page.waitForSelector(clickSelector)

        console.log(`sleeping one second before clicking vote`)
        await sleep(1000)

        console.log(`clicking  "${clickSelector}"`)
        await page.click(clickSelector)

        console.log(`closing chromium`)
        await browser.close()

        console.log(`vote count: ${i+1}\n`)

        await sleep(7000)

    } catch (error) {
        console.log(`oops, error: ${error}\n`)
        await loadPage(i)
    }
} 

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
