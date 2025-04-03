const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const inputDir = '细菌基因组完成图';
    const outputDir = './';

    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
    }

    const files = fs.readdirSync(inputDir).filter(file => file.endsWith('.html'));

    for (const file of files) {
        const filePath = 'file://' + path.resolve(inputDir, file);
        const pdfPath = path.join(outputDir, file.replace('.html', '.pdf'));

        await page.goto(filePath, { waitUntil: 'networkidle2' });
        await page.pdf({ path: pdfPath, format: 'A4', margin: { top: '20mm', bottom: '20mm' }});

        console.log(`Converted: ${file} -> ${pdfPath}`);
    }

    await browser.close();
})();