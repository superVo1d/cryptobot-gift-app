import { loadUserInfo } from "../bot/route";
import { createSession } from "./session";
import { validateTelegramWebAppData } from "./validateTelegramWebAppData";

export interface IAuthRequest {
  initData: string;
}

export async function POST(request: Request) {
  const { initData } = (await request.json()) as IAuthRequest;

  if (!initData) {
    return Response.json(
      { success: false, message: "Missing initData" },
      { status: 405 }
    );
  }

  try {
    const user = validateTelegramWebAppData(initData);

    loadUserInfo(user.id);
    // get user from database
    // update if nessecary

    createSession(user.id);

    return Response.json(
      {
        success: true,
        user,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    if (error instanceof Error) {
      return Response.json(
        { success: false, message: error.message },
        { status: 403 }
      );
    }

    return Response.json(
      { success: false, message: "Invalid initData" },
      { status: 403 }
    );
  }
}
