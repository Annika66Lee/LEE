const LUMI_CLASSES = {
    Section: 'lumi-section',
    ColumnStrip: 'lumi-strip',
    Box: 'lumi-box',
    Text: 'lumi-text',
    Button: 'lumi-button',
    TextInput: 'lumi-input',
    TextBox: 'lumi-text-box',
};

const LUMI_HERO =
    'https://raw.githubusercontent.com/Annika66Lee/LEE/main/src/public/assets/lumi-hero-v2.png';

function selectSafely(select, type) {
    try {
        return select(type);
    } catch {
        return [];
    }
}

function applyStyle(element, styles) {
    if (!element.style) {
        return;
    }

    Object.entries(styles).forEach(([property, value]) => {
        try {
            element.style[property] = value;
        } catch {
            // Some Wix element designs expose only a subset of style properties.
        }
    });
}

function recolorText(element) {
    if (!element.html) {
        return;
    }

    const openingTextTag = /<(p|h1|h2|h3|h4|h5|h6|span|li)(\s[^>]*)?>/gi;
    const openingLinkTag = /<a(\s[^>]*)?>/gi;

    element.html = element.html
        .replace(openingTextTag, (match) => {
            if (/style\s*=/i.test(match)) {
                return match.replace(
                    /style=(["'])(.*?)\1/i,
                    'style=$1$2;color:#fff9f2!important;$1'
                );
            }

            return match.replace('>', ' style="color:#fff9f2!important;">');
        })
        .replace(openingLinkTag, (match) => {
            if (/style\s*=/i.test(match)) {
                return match.replace(
                    /style=(["'])(.*?)\1/i,
                    'style=$1$2;color:#49f2d2!important;$1'
                );
            }

            return match.replace('>', ' style="color:#49f2d2!important;">');
        });
}

function applyHeroImage(select) {
    const sections = selectSafely(select, 'Section');
    const strips = selectSafely(select, 'ColumnStrip');
    const images = selectSafely(select, 'Image');
    const heroContainer = sections[0] || strips[0];

    if (heroContainer && heroContainer.background) {
        try {
            heroContainer.background.src = LUMI_HERO;
        } catch {
            // Keep the gradient treatment when a section design locks its image.
        }
    }

    const largestImage = images
        .filter((image) => !image.global)
        .sort(
            (first, second) =>
                (second.width || 0) * (second.height || 0) -
                (first.width || 0) * (first.height || 0)
        )[0];

    if (largestImage) {
        largestImage.src = LUMI_HERO;
        largestImage.alt = 'Luminous glass prism with violet and cyan light trails';
    }
}

/**
 * Adds the Lumi palette to all supported elements on the current page.
 * It uses both Wix style properties and CSS classes so the result remains
 * visible across a wider range of Wix element designs.
 */
export function applyLumiTheme(select) {
    Object.entries(LUMI_CLASSES).forEach(([type, className]) => {
        const elements = selectSafely(select, type);

        elements.forEach((element) => {
            if (element.customClassList) {
                element.customClassList.add(className);
            }
        });
    });

    selectSafely(select, 'Section').forEach((section, index) => {
        applyStyle(section, {
            backgroundColor: index % 2 === 0 ? '#080611' : '#120e23',
        });
    });

    selectSafely(select, 'ColumnStrip').forEach((strip, index) => {
        applyStyle(strip, {
            backgroundColor: index % 2 === 0 ? '#120e23' : '#1c1535',
        });
    });

    selectSafely(select, 'Box').forEach((box) => {
        applyStyle(box, {
            backgroundColor: '#1c1535',
            borderColor: '#9d6cff',
            borderWidth: '2px',
        });
    });

    selectSafely(select, 'Button').forEach((button) => {
        applyStyle(button, {
            backgroundColor: '#9d6cff',
            borderColor: '#49f2d2',
            borderWidth: '2px',
            color: '#080611',
        });
    });

    ['TextInput', 'TextBox', 'Dropdown'].forEach((type) => {
        selectSafely(select, type).forEach((input) => {
            applyStyle(input, {
                backgroundColor: '#120e23',
                borderColor: '#49f2d2',
                borderWidth: '2px',
                color: '#fff9f2',
            });
        });
    });

    selectSafely(select, 'Text').forEach(recolorText);
    applyHeroImage(select);
}
