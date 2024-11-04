import type { TelegramWebApps } from "telegram-webapps-types-new";

declare global {
  interface Window {
    Telegram: TelegramWebApps.SDK;
  }
}

export default class TelegramApi {
  private readonly _tg: TelegramWebApps.WebApp;

  constructor() {
    this._tg = window.Telegram.WebApp;
    this.ready();

    this._tg?.MainButton.setParams({
      color: "#171717",
      text_color: "#fff",
      is_active: true,
      is_visible: false,
    });
  }

  get initDataUnsafe() {
    return this._tg?.initDataUnsafe;
  }

  get initData() {
    return this._tg?.initData;
  }

  get theme() {
    return this._tg?.colorScheme === "light";
  }

  get viewportHeight() {
    return this._tg?.viewportHeight;
  }

  expand() {
    this._tg?.expand();
  }

  enableClosingConfirmation() {
    this._tg?.enableClosingConfirmation();
  }

  get haptic(): TelegramWebApps.HapticFeedback | undefined {
    return this._tg?.HapticFeedback;
  }

  openTelegramChat = (username: string) => {
    this._tg.openTelegramLink(`https://t.me/${username}`);
  };

  ready(): void {
    this._tg?.ready();
  }

  showConfirm(message: string, callback: (confirm: boolean) => void): void {
    this._tg.showConfirm(message, callback);
  }

  onEvent(
    eventType: keyof TelegramWebApps.IEventTypes,
    eventHandler: () => void
  ) {
    this._tg?.onEvent(eventType, eventHandler);
  }

  setMainButton(
    text: string,
    callback: () => void,
    disabled: boolean = false
  ): void {
    this._tg?.MainButton.setText(text);
    this._tg?.MainButton.onClick(callback);
    this.setMainButtonAccessibility(!disabled);
  }

  setMainButtonAccessibility(enable: boolean = true): void {
    if (enable) {
      this._tg?.MainButton.enable();
      this._tg?.MainButton.setParams({ color: "#F00" });
    } else {
      this._tg?.MainButton.disable();
      this._tg?.MainButton.setParams({ color: "#171717" });
    }
  }

  setMainButtonVisibility(show: boolean = true): void {
    if (show) {
      this._tg?.MainButton.show();
    } else {
      this._tg?.MainButton.hide();
    }
  }

  openLink(url: string): void {
    this._tg?.openLink(url);
  }

  close() {
    this._tg?.close();
  }
}
