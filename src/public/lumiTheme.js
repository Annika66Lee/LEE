const LUMI_CLASSES = {
    Section: 'lumi-section',
    ColumnStrip: 'lumi-strip',
    Box: 'lumi-box',
    Text: 'lumi-text',
    Button: 'lumi-button',
    TextInput: 'lumi-input',
    TextBox: 'lumi-text-box',
};

/**
 * Adds the Lumi palette to all supported elements on the current page.
 * Unsupported or absent element types are skipped safely.
 */
export function applyLumiTheme(select) {
    Object.entries(LUMI_CLASSES).forEach(([type, className]) => {
        let elements = [];

        try {
            elements = select(type);
        } catch {
            return;
        }

        elements.forEach((element) => {
            if (element.customClassList) {
                element.customClassList.add(className);
            }
        });
    });
}
