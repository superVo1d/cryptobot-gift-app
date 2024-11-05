import { Bot, GrammyError, webhookCallback } from "grammy";
import { promises as fs } from "fs";
import path from "path";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

const telegramToken = process.env.TELEGRAM_TOKEN;

if (!telegramToken)
  throw new Error("TELEGRAM_TOKEN environment variable not found.");

const bot = new Bot(telegramToken);

bot.on("message:text", async (ctx) => {
  await ctx.reply(ctx.message.text);
});

export const POST = webhookCallback(bot, "std/http");

export async function loadUserInfo(userId: number) {
  try {
    const user = await bot.api.getChat(userId);
    const fileName = `${userId}.jpg`;
    let photoUrl = null;

    if (user.photo) {
      const fileId = user.photo.big_file_id;

      try {
        const file = await bot.api.getFile(fileId);
        const filePath = `https://api.telegram.org/file/bot${telegramToken}/${file.file_path}`;

        const res = await fetch(filePath);
        const buffer = await res.arrayBuffer();

        const fileSavePath = path.join(process.cwd(), "public", "f", fileName);
        await fs.writeFile(fileSavePath, Buffer.from(buffer));
        photoUrl = `/f/${fileName}`;
      } catch (err) {
        console.error("Error downloading image:", err);
      }

      return {
        bio: user.bio,
        photo: photoUrl,
      };
    }
  } catch (error) {
    if (error instanceof GrammyError) {
      console.error("Failed to load user info:", error.message);
    }
    return {};
  }
}
