import { auth } from "@clerk/nextjs";

const adminIds = process.env.ADMIN_IDS!.split(",");

export const isAdmin = () => {
  const { userId } = auth();

  if (!userId) {
    return false;
  }

  return adminIds.indexOf(userId) !== -1;
};
