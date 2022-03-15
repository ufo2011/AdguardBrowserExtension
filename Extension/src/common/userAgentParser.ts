import Bowser from 'bowser';

export const userAgentParser = Bowser.getParser(window.navigator.userAgent);
