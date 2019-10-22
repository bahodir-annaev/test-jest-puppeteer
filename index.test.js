describe('Тендер Про, поиск тендеров', () => {

    beforeAll(async () => {
        await page.goto("https://www.tender.pro/index.shtml");
    });

    afterAll(async () => {
        await browser.close();
    })

    it('should have in title "Тендер Про – Электронная торговая площадка B2B"', async () => {
        await expect(page.title()).resolves.toMatch(/Тендер Про – Электронная торговая площадка B2B/);
    });

    it('should have a link with id #form_tenders', async () => {
        const tenderLink = await page.waitForSelector('#form_tenders');
        const linkInnerText = await tenderLink.getProperty('innerText');
        await expect(linkInnerText.jsonValue()).resolves.toMatch('Тендеры')
        await tenderLink.click();
    });

    it('should have in title "Закупки и тендеры"', async () => {
        await page.waitForSelector('title');
        await expect(page.title()).resolves.toMatch(/Закупки и тендеры/);
    });

    it('should search active tenders created today and load into table', async () => {
        await page.waitForSelector('[name=showTendersByState]');
        await page.select("select[name='tendertype']", "0");
        const today = new Date();
        await page.type("#dateb", today.getDate() + "." + (today.getMonth() + 1) + "." + today.getFullYear());

        const submit_button = await page.$("[name='send_form']");
        await submit_button.click();

        await page.waitForSelector('table.baseTable');
        const counter = parseInt((await page.$eval("#my_counter b", counter => counter.innerText)), 10);
        expect(counter).toBeGreaterThan(0);
    });


});
