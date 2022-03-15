import browser from 'webextension-polyfill';

import { messageHandler } from '../message-handler';
import { MessageType, OpenAbuseTabMessage, OpenSiteReportTabMessage } from '../../common/messages';
import { userAgentParser } from '../../common/userAgentParser';
import { TabsApi } from '../extension-api/tabs';
import { tsWebExtension } from '../tswebextension';
import { UrlUtils } from '../utils/url';

export class UiService {
    static baseUrl = browser.runtime.getURL('/');

    static settingsUrl = UiService.getExtensionPageUrl('options.html');

    static filteringLogUrl = UiService.getExtensionPageUrl('filtering-log.html');

    static init() {
        messageHandler.addListener(MessageType.OPEN_SETTINGS_TAB, UiService.openSettingsTab);
        messageHandler.addListener(MessageType.OPEN_FILTERING_LOG, UiService.openFilteringLog);
        messageHandler.addListener(MessageType.OPEN_ABUSE_TAB, UiService.openAbuseTab);
        messageHandler.addListener(MessageType.OPEN_SITE_REPORT_TAB, UiService.openSiteReportTab);
        messageHandler.addListener(MessageType.OPEN_ASSISTANT, UiService.openAssistant);
    }

    // listeners

    static async openSettingsTab(): Promise<void> {
        const settingTab = await TabsApi.findOne({ url: UiService.settingsUrl });

        if (settingTab) {
            await TabsApi.focus(settingTab);
        } else {
            await browser.tabs.create({ url: UiService.settingsUrl });
        }
    }

    static async openFilteringLog(): Promise<void> {
        const filteringLogTab = await TabsApi.findOne({ url: UiService.filteringLogUrl });

        if (filteringLogTab) {
            await TabsApi.focus(filteringLogTab);
        } else {
            await browser.windows.create({ url: UiService.filteringLogUrl, type: 'popup' });
        }
    }

    static async openAbuseTab({ data }: OpenAbuseTabMessage): Promise<void> {
        const { url } = data;

        let browserName = userAgentParser.getBrowserName();
        let browserDetails: string | undefined;

        // TODO: list of supported browsers (move to common?)
        // https://github.com/lancedikson/bowser#filtering-browsers
        const isSupportedBrowser = userAgentParser.satisfies({
            chrome: '>=79',
            firefox: '>=78',
            opera: '>=66',
        });

        if (!isSupportedBrowser) {
            browserDetails = browserName;
            browserName = 'Other';
        }

        const filterIds = tsWebExtension.configuration.filters.map(filter => filter.filterId);

        await browser.tabs.create({
            url: `https://reports.adguard.com/new_issue.html?product_type=Ext&product_version=${
                encodeURIComponent(browser.runtime.getManifest().version)
            }&browser=${encodeURIComponent(browserName)
            }${browserDetails ? `&browser_detail=${encodeURIComponent(browserDetails)}` : ''
            }&url=${encodeURIComponent(url)
            }${filterIds.length > 0 ? `&filters=${encodeURIComponent(filterIds.join('.'))}` : ''
            }${UiService.getStealthString(filterIds)
            }${UiService.getBrowserSecurityString()}`,
        });
    }

    // TODO: implement when settings service will be created (move to steath service?)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    static getStealthString(filterId: number[]): string {
        return '';
    }

    // TODO: implement when settings service will be created
    static getBrowserSecurityString(): string {
        return '';
    }

    static async openSiteReportTab({ data }: OpenSiteReportTabMessage): Promise<void> {
        const { url } = data;

        const domain = UrlUtils.getDomainName(url);

        if (!domain) {
            return;
        }

        const punycodeDomain = UrlUtils.toPunyCode(domain);

        await browser.tabs.create({
            // eslint-disable-next-line max-len
            url: `https://adguard.com/site.html?domain=${encodeURIComponent(punycodeDomain)}&utm_source=extension&aid=16593`,
        });
    }

    static async openAssistant(): Promise<void> {
        const activeTab = await TabsApi.findOne({ active: true });
        tsWebExtension.openAssistant(activeTab.id);
    }

    // helpers

    static getExtensionPageUrl(path: string) {
        return `${UiService.baseUrl}pages/${path}`;
    }
}
