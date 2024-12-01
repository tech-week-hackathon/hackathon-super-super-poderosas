import type { NextApiRequest, NextApiResponse } from "next";
import { getAllMiniGovs } from "../controllers";

// POST /api/userOrders
// Required fields in body: userAddress
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const miniGovs = await getAllMiniGovs();
    res.json({
      miniGovs: JSON.stringify(miniGovs),
      message: "Get Mini Govs Ok",
    });
  } catch (e) {
    res.status(401).json({ error: e });
  }
}
