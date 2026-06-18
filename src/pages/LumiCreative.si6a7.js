import { applyLumiTheme } from 'public/lumiTheme.js';

// API Reference: https://www.wix.com/velo/reference/api-overview/introduction
// “Hello, World!” Example: https://learn-code.wix.com/en/article/hello-world

$w.onReady(function () {
    applyLumiTheme($w);

    $w('Text').forEach((textElement) => {
        const headingPattern = /lumi\s*(?:creative|vreative)\s*incubator/i;

        if (headingPattern.test(textElement.text)) {
            textElement.text = textElement.text.replace(
                new RegExp(headingPattern.source, 'gi'),
                'LumiCreative12345'
            );
        }
    });
});
