import "server-only";
import { JWTPayload, SignJWT, jwtVerify } from "jose";
import { cookies, headers } from "next/headers";
import { telegramUserMock } from "../../../mocks";

interface ISessionPayload extends JWTPayload {
  userId: number;
  expiresAt: Date;
}

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);
const expirationTime = 7 * 24 * 60 * 60 * 1000;

export async function encrypt(payload: ISessionPayload): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

export async function decrypt(
  session: string | undefined = ""
): Promise<ISessionPayload | undefined> {
  try {
    const { payload } = await jwtVerify<ISessionPayload>(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.log("Failed to verify session");
  }
}

export async function getSessionUser() {
  const userId = (await headers()).get("x-telegram-user");

  // Get user from database

  return telegramUserMock;
}

export async function createSession(userId: number) {
  const expiresAt = new Date(Date.now() + expirationTime);
  const session = await encrypt({ userId, expiresAt });

  (await cookies()).set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

export async function updateSession() {
  const session = (await cookies()).get("session")?.value;
  const payload = await decrypt(session);

  if (!session || !payload) {
    return;
  }

  const expires = new Date(Date.now() + expirationTime);

  const cookieStore = await cookies();
  cookieStore.set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expires,
    sameSite: "lax",
    path: "/",
  });

  return 
}
