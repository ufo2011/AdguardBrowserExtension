import punycode from 'punycode';

/**
 * Helper class to work with URLs
 */
export class UrlUtils {
    static toPunyCode(domain: string) {
        // eslint-disable-next-line no-control-regex
        if (/^[\x00-\x7F]+$/.test(domain)) {
            return domain;
        }
        return punycode.toASCII(domain);
    }

    static getHost(url: string): string | null {
        let firstIdx = url.indexOf('//');
        if (firstIdx === -1) {
        /**
         * It's non hierarchical structured URL (e.g. stun: or turn:)
         * https://tools.ietf.org/html/rfc4395#section-2.2
         * https://tools.ietf.org/html/draft-nandakumar-rtcweb-stun-uri-08#appendix-B
         */
            firstIdx = url.indexOf(':');
            if (firstIdx === -1) {
                return null;
            }
            firstIdx -= 1;
        }

        const nextSlashIdx = url.indexOf('/', firstIdx + 2);
        const startParamsIdx = url.indexOf('?', firstIdx + 2);

        let lastIdx = nextSlashIdx;
        if (startParamsIdx > 0 && (startParamsIdx < nextSlashIdx || nextSlashIdx < 0)) {
            lastIdx = startParamsIdx;
        }

        let host = lastIdx === -1 ? url.substring(firstIdx + 2) : url.substring(firstIdx + 2, lastIdx);

        const portIndex = host.indexOf(':');

        host = portIndex === -1 ? host : host.substring(0, portIndex);
        const lastChar = host.charAt(host.length - 1);
        if (lastChar === '.') {
            host = host.slice(0, -1);
        }

        return host;
    }

    static getDomainName(url: string): string | null {
        const host = UrlUtils.getHost(url);

        if (!host) {
            return null;
        }

        return UrlUtils.getCroppedDomainName(host);
    }

    static getCroppedDomainName(host: string): string {
        return host.indexOf('www.') === 0 ? host.substring(4) : host;
    }
}
