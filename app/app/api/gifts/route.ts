import { getSessionUser } from "../auth/session";

export interface IAuthRequest {
  initData: string;
}

export async function GET(request: Request) {
  const user = await getSessionUser();

  if (!user) {
    return Response.json(
      { success: false, message: "Forbidden" },
      { status: 403 }
    );
  }

  return Response.json({
    success: true,
    payload: [
      {
        name: "gift1",
        type: 0,
      },
      {
        name: "gift2",
        type: 1,
      },
      {
        name: "gift3",
        type: 2,
      },
      {
        name: "gift4",
        type: 3,
      },
    ],
  });
}
