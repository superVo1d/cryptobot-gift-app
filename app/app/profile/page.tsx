"use client";

import { UserPreview } from "../../components/UserPreview";
import { useTelegramApi } from "../../contexts/TelegramApiContext";

export default function Page() {
  const { user } = useTelegramApi();

  return <div>{user && <UserPreview user={user} />}</div>;
}
