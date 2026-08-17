import express from "express";
import { chromium } from "playwright";

const app = express();
XXXX
app.get("/klan/jeep", async (req, res) => {
    let browser;
    try {
        browser = await chromium.launch({
            headless: false, // pełna przeglądarka
            args: [
                "--disable-blink-features=AutomationControlled",
                "--no-sandbox",
                "--disable-setuid-sandbox",
                "--disable-dev-shm-usage"
            ]
        });

        const context = await browser.newContext({
            viewport: { width: 1280, height: 800 },
            userAgent:
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
                "(KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
            locale: "pl-PL",
            timezoneId: "Europe/Warsaw"
        });

        const page = await context.newPage();

        await page.goto("https://kokscraft.pl/klan/5-JEEP", {
            waitUntil: "networkidle",
            timeout: 60000
        });

        await page.waitForTimeout(5000);

        const html = await page.content();

        res.send(html);
    } catch (err) {
        console.error("Proxy error:", err);
        res.status(500).send("Proxy error");
    } finally {
        if (browser) await browser.close();
    }
});

app.listen(3000, () => {
    console.log("Proxy działa na porcie 3000");
});
