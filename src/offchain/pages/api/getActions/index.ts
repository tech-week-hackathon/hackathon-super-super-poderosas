import type { NextApiRequest, NextApiResponse } from "next";
import { getActions } from "@/dbRequest";

// POST /api/userOrders
// Required fields in body: userAddress
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const actions = await getActions();
    res.json({
      actions: JSON.stringify(actions),
      message: "Get Actions Ok",
    });
  } catch (e) {
    res.status(401).json({ error: e });
  }
}
