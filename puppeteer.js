const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.goto('http://127.0.0.1:3000', {waitUntil: 'networkidle2'});

  // await page.click('.user input')
  await page.type('.user input', 'admin')

  // await page.click('.pwd input')
  await page.type('.pwd input', '123456A-')

  await page.click('.login-btn')

  await page.waitForNavigation()

  await page.goto('http://127.0.0.1:3000/shopers')

  await page.waitForSelector('.el-icon-plus');

  await page.click('.el-icon-plus')

  // console.log(page)

  // page.setViewport({width: 1280, height: 1996})
  //await page.screenshot({path:'./example.png'});

  // pdf
  // await page.pdf({path: 'hn.pdf', format: 'A4'})

  // 获取视口信息
  // const dimensions = await page.evaluate(() => {
  //   return {
  //     width: document.documentElement.clientWidth,
  //     height: document.documentElement.clientHeight,
  //     deviceScaleFactor: window.devicePixelRatio
  //   }
  // })
  //
  // console.log(dimensions)
  await browser.close();
})();