import browser, { Events, Runtime } from 'webextension-polyfill';
import {
    tsWebExtensionMessageHandler,
    TS_WEB_EXTENSION_MESSAGE_HANDLER_NAME,
    TsWebExtensionMessage,
} from './tswebextension';

import {
    MessageType,
    Message,
    ExtractedMessage,
    APP_MESSAGE_HANDLER_NAME,
} from '../common/constants';

type MessageListener<T> = (message: T, sender: Runtime.MessageSender) => unknown;

export class MessageHandler {
  private messageListeners = new Map();

  constructor() {
      this.handleMessage = this.handleMessage.bind(this);
  }

  public init() {
      (browser.runtime.onMessage as Events.Event<MessageListener<Message>>).addListener(this.handleMessage);
  }

  public addListener<T extends MessageType>(type: T, listener: MessageListener<ExtractedMessage<T>>) {
      if (this.messageListeners.has(type)) {
          throw new Error(`${type} listener has already been registered`);
      }

      this.messageListeners.set(type, listener);
  }

  // TODO: runtime validation
  private handleMessage<T extends Message | TsWebExtensionMessage>(message: T, sender: Runtime.MessageSender) {
      if (message.handlerName === TS_WEB_EXTENSION_MESSAGE_HANDLER_NAME) {
          return tsWebExtensionMessageHandler(message, sender);
      }

      if (message.handlerName === APP_MESSAGE_HANDLER_NAME) {
          const listener = this.messageListeners.get(message.type) as MessageListener<T>;
          if (listener) {
              return listener(message, sender);
          }
      }
  }
}

export const messageHandler = new MessageHandler();
