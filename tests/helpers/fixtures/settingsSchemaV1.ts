export const getSettingsV1 = () => ({
    'protocol-version': '1.0',
    'general-settings': {
        'app-language': 'en-US',
        'allow-acceptable-ads': false,
        'show-blocked-ads-count': true,
        'autodetect-filters': true,
        'safebrowsing-enabled': true,
        'filters-update-period': 86400000,
        // Appearance theme can includes escaped quotes when extension will get
        // old settings from storage.
        'appearance-theme': '\"dark\"',
    },
    'extension-specific-settings': {
        'use-optimized-filters': true,
        'collect-hits-count': false,
        'show-context-menu': true,
        'show-info-about-adguard': false,
        'show-app-updated-info': true,
        'hide-rate-adguard': true,
        'user-rules-editor-wrap': false,
    },
    'filters': {
        'enabled-filters': [14, 16, 17, 1, 224, 2, 3, 4, 6, 11],
        'enabled-groups': [1, 2, 3, 4, 5, 6, 7, 0],
        'custom-filters': [
            {
                'customUrl': 'https://testcases.agrd.dev/Filters/css-rules/css-rules.txt',
                'enabled': false,
                'title': 'Rules for CSS tests',
            },
            {
                'customUrl': 'https://testcases.agrd.dev/Filters/element-hiding-rules/test-element-hiding-rules.txt',
                'enabled': true,
                'title': 'Rules for element hiding rules test',
            },
            {
                'customUrl': 'https://testcases.agrd.dev/Filters/generichide-rules/generichide-rules.txt',
                'enabled': true,
                'title': 'Rules for generic hide tests',
                'trusted': true,
            },
        ],
        'user-filter': {
            'rules': '||example.com^$document\nexample.org###h1',
            'disabled-rules': '',
            'enabled': true,
        },
        'whitelist': {
            'inverted': true,
            'domains': [
                'domain1.com',
                'domain2.com',
            ],
            'inverted-domains': [
                'domain3.com',
                'domain4.com',
            ],
            'enabled': true,
        },
    },
    'stealth': {
        'stealth_disable_stealth_mode': false,
        'stealth-hide-referrer': true,
        'stealth-hide-search-queries': true,
        'stealth-send-do-not-track': true,
        'stealth-block-webrtc': true,
        'stealth-remove-x-client': true,
        'stealth-block-third-party-cookies': true,
        'stealth-block-third-party-cookies-time': 1080,
        'stealth-block-first-party-cookies': true,
        'stealth-block-first-party-cookies-time': '4444',
        'block-known-trackers': true,
        'strip-tracking-parameters': true,
    },
});
