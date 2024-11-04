import crypto from "crypto";

const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN as string;

interface TelegramData {
  auth_date: string;
  [key: string]: string;
}

class TelegramDataError extends Error {}
class TelegramDataIsOutdated extends Error {}

export function validateTelegramWebAppData(
  initData: string
): Record<string, any> {
  /*
    Check if received data from Telegram Mini App is real.

    Based on SHA and HMAC algothims.
    Instructions - https://core.telegram.org/bots/webapps#validating-data-received-via-the-mini-app
  */

  if (!initData) {
    throw new TelegramDataError("This is not Telegram data.");
  }

  const data: TelegramData = initData.split("&").reduce((acc, part) => {
    const [key, value] = part.split("=");
    acc[key] = decodeURIComponent(value);
    return acc;
  }, {} as TelegramData);

  const receivedHash = data.hash;
  const authDate = data.auth_date;

  delete data.hash;

  if (!receivedHash || !authDate) {
    throw new TelegramDataError(
      "Invalid data format: Missing required fields."
    );
  }

  // Generate data_check_string
  const dataCheckString = Object.keys(data)
    .sort()
    .map((key) => `${key}=${data[key]}`)
    .join("\n");

  console.log(dataCheckString);

  // Generate secret key using bot token
  const secretKey = crypto
    .createHmac("sha256", "WebAppData")
    .update(TELEGRAM_TOKEN)
    .digest();
  const computedHash = crypto
    .createHmac("sha256", secretKey)
    .update(dataCheckString)
    .digest("hex");

  // Check if session is outdated
  // if (isTelegramSessionOutdated(authDate)) {
  //   throw new TelegramDataIsOutdated(
  //     "Telegram authentication session is expired."
  //   );
  // }

  // Validate computed hash against received hash
  if (computedHash !== receivedHash) {
    throw new TelegramDataError("Invalid Telegram data: Hash mismatch.");
  }

  return JSON.parse(data.user);
}

function isTelegramSessionOutdated(authDate: string): boolean {
  const ONE_DAY_IN_SECONDS = 86400;
  const currentTime = Math.floor(Date.now() / 1000);
  const authTime = parseInt(authDate, 10);
  return currentTime - authTime > ONE_DAY_IN_SECONDS;
}
