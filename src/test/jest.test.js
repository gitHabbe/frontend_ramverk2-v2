/**
 * Test for getting started with Selenium.
 */
"use strict";

const webdriver = require("selenium-webdriver");
const By = webdriver.By;

let browser;

describe("Test frontpage", () => {
    beforeAll(done => {
        browser = new webdriver.Builder().
            withCapabilities(webdriver.Capabilities.firefox()).build();

        browser.get("http://localhost:3000/");
        done();
    });
    
    afterAll(done => {
        browser.quit();
        done();
    });

    const clickElement = async text => {
        const elem = await browser.findElement(By.linkText(text));
        await elem.click();
    }

    // const hoverElement = async text => {
    //     const elem = await browser.findElement(By.className(text));
	// 	console.log('TCL: elem', elem)
    //     await elem.onmouseover();
    // }

    const getElementText = async className => {
        const elem = await browser.findElements(By.className(className));
        const text = await elem[0].getText();
        return text;
    }

    const getUrl = async () => {
        const url = await browser.getCurrentUrl();
        return url;
    }

    const getTitle = async () => {
        const title = await browser.getTitle();
        return title;
    }

    const getKmomReport = async () => {
        const reports = await browser.findElement(By.className("reportText"));
        const text = await reports.getText();
        return text;
    }
    
    const fillInput = async (name, text) => {
        const input = await browser.findElement(By.name(name));
        await input.sendKeys(text);
        if (name === "password") {
            await input.sendKeys(webdriver.Key.RETURN);
        }
    }

    const clickButton = async name => {
        const input = await browser.findElement(By.className(name));
        await input.click();
    }

    it("Me-page", async done => {
        await clickElement("Me"); 
        const exp = "Me page";
        const res = await getElementText("me");
        expect(res).toBe(exp);
        done();
    }, 20000)

    it("Me URL", async done => {
        await clickElement("Me");
        const exp = true;
        let res = await getUrl();
        res = res.endsWith("/me");
        expect(res).toBe(exp);
        done();
    }, 20000)

    it("Me title", async done => {
        await clickElement("Me");
        // await hoverElement("has-dropdown");
        let res = await getTitle();
        const exp = "React App";
        expect(res).toBe(exp);
        done();
    }, 20000)

    it("Kmom02 report", async done => {
        browser.get("http://localhost:3000/reports/kmom02");
        const report = await getKmomReport();
        const exp = true;
        let res = report.startsWith("Det var inga större");
        expect(res).toBe(exp);
        res = report.endsWith("borde börja.")
        expect(res).toBe(exp);
        done();
    }, 20000)

    it("Kmom02 report URL", async done => {
        // Jag hade gärna prövat med manuel navigation till kmom02
        // men lyckades inte göra en hover på navbaren...
        browser.get("http://localhost:3000/reports/kmom02");
        let res = await getUrl();
        res = res.endsWith("/reports/kmom02");
        const exp = true;
        expect(res).toBe(exp);
        done();
    }, 20000)

    it("Login-page", async done => {
        await clickElement("Log in");
        await fillInput("email", "aa");
        await fillInput("password", "bb");
        const exp = true;
        await clickButton("submit");
        setTimeout(() => {
            console.log("exp", exp);
        }, 2000);
        let res = await getUrl();
        res = await getUrl();
		console.log('TCL: res', res)
        res = res.endsWith("/me");
        expect(res).toBe(exp);
        // const exp = "Me page";
        // const res = await getElementText("me");
        // expect(res).toBe(exp);
        done();
    }, 20000)
});
