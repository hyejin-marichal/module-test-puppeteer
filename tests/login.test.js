const timeout = 15000;

// série de tests sur la page d'accueil
describe("Test login and change password", () => {
    let page;

    // vérification du chargement de la page d'accueil
    test('login and change password', async () => {
        // charger la page d'accueil
        await page.goto('http://polr.alwaysdata.net');
        await page.waitForSelector('#navbar li a');
        await page.evaluate(() => {
            Array
                .from(document.querySelectorAll('#navbar li a'))
                .filter(el => el.textContent === 'Sign In ')[0].click();
        });

        await page.waitForSelector('[name=username]');
        await page.type('[name=username]', 'admin');
        await page.waitForSelector('[name=password]');
        await page.type('[name=password]', 'campus');
        await page.waitForSelector('[name=login]');
        await page.click('[name=login]');
        await page.screenshot({path: './tests/img/login1.png'});

        await page.waitForSelector('.dropdown-toggle');
        await page.$eval('.dropdown-toggle', el => el.click());
        await page.screenshot({path: './tests/img/login2.png'});
        await page.evaluate(() => {
            Array
                .from(document.querySelectorAll('.dropdown-menu li a'))
                .filter(el => el.textContent === 'Settings')[0].click();
        });
        await page.screenshot({path: './tests/img/login3.png'});
        await page.type('[name="current_password"]', 'campus');
        await page.type('[name="new_password"]', 'campus');
        await page.click('.change-password-btn');
        await page.screenshot({path: './tests/img/login4.png'});
        const html = await page.$eval('body', e => e.innerHTML);

        expect(html).toContain("Welcome to your Polr - Campus Annecy dashboard!")
    }, timeout);

    // cette fonction est lancée avant chaque test de cette
    // série de tests
    beforeAll(async () => {
        // ouvrir un onglet dans le navigateur
        page = await global.__BROWSER__.newPage()
    }, timeout)

});
