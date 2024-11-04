export default async function Page({
  params,
}: {
  params: Promise<{ giftId: string }>;
}) {
  const giftId = (await params).giftId;

  return giftId;
}
