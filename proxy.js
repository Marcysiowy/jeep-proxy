import express from "express";
import puppeteer from "puppeteer";

const app = express();

app.get("/klan/jeep", async (req, res) => {
    try {
        const browser = await puppeteer.launch({
            headless: "new",
            args: [
                "--no-sandbox",
                "--disable-setuid-sandbox",
                "--disable-dev-shm-usage"
            ]
        });

        const page = await browser.newPage();

        await page.setUserAgent(
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
            "(KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36"
        );

        await page.goto("https://kokscraft.pl/klan/5-JEEP", {
            waitUntil: "networkidle2",
            timeout: 60000
        });

        await page.waitForTimeout(5000);

        const html = await page.content();
        await browser.close();

        res.send(html);
    } catch (err) {
        console.error("Proxy error:", err);
        res.status(500).send("Proxy error");
    }
});

app.listen(3000, () => {
    console.log("Proxy działa na porcie 3000");
});
