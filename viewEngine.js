const fs = require('fs');
const path = require('path');

class ViewEngine {
    constructor(viewDir) {
        this.viewDir = viewDir;
    }

    render(template, options = {}) {
        const { header = '', footer = '', content = '' } = options;

        const headerContent = header || this.loadTemplate('header');
        const footerContent = footer || this.loadTemplate('footer');
        const mainContent = content || this.loadTemplate(template);

        return `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Custom View</title>
            </head>
            <body>
                ${headerContent}
                <main>
                    ${mainContent}
                </main>
                ${footerContent}
            </body>
            </html>
        `;
    }

    loadTemplate(template) {
        const filePath = path.join(this.viewDir, `${template}.html`);
        return fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf-8') : '';
    }
}

module.exports = ViewEngine;
