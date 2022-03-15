// TODO: load tswebextension from npm after release
import { TsWebExtension, Configuration } from '@adguard/tswebextension';

export { MESSAGE_HANDLER_NAME as TS_WEB_EXTENSION_MESSAGE_HANDLER_NAME } from '@adguard/tswebextension';

export type { Message as TsWebExtensionMessage } from '@adguard/tswebextension';

const tsWebExtension = new TsWebExtension('web-accessible-resources');

const defaultConfig: Configuration = {
    filters: [],
    allowlist: [],
    userrules: [],
    verbose: false,
    settings: {
        collectStats: true,
        allowlistInverted: false,
        stealth: {
            blockChromeClientData: true,
            hideReferrer: true,
            hideSearchQueries: true,
            sendDoNotTrack: true,
            blockWebRTC: true,
            selfDestructThirdPartyCookies: true,
            selfDestructThirdPartyCookiesTime: 3600,
            selfDestructFirstPartyCookies: true,
            selfDestructFirstPartyCookiesTime: 3600,
        },
    },
};

tsWebExtension.start(defaultConfig);

const tsWebExtensionMessageHandler = tsWebExtension.getMessageHandler();

export {
    tsWebExtension,
    tsWebExtensionMessageHandler,
};
