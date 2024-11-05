import { IGift } from "../../../types/gift";
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

  // get gifts from database

  const payload: IGift[] = [
    {
      id: "gift-1",
      name: "Delicious Cake",
      price: 10,
      currency: "USDT",
      type: "1",
      from: "3",
      to: "500",
    },
    {
      id: "gift-2",
      name: "Green Star",
      price: 5,
      currency: "TON",
      type: "2",
      from: "802",
      to: "3K",
    },
    {
      id: "gift-3",
      name: "Blue Star",
      price: 10,
      currency: "TON",
      type: "3",
      from: "458",
      to: "5K",
    },
    {
      id: "gift-4",
      name: "Red Star",
      price: 5,
      currency: "USDT",
      type: "4",
      from: "10K",
      to: "10K",
    },
  ];

  return Response.json({
    success: true,
    payload,
  });
}
