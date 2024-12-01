import type { NextApiRequest, NextApiResponse } from "next";
import { joinMiniGov } from "../controllers";

// POST /api/joinMiniGov
// Required fields in body: userAddress, miniGovName
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const user = await joinMiniGov(req.body.address, req.body.name);
    res.json({
      user: JSON.stringify(user),
      message: "Join Mini Gov Ok",
    });
  } catch (e) {
    res.status(401).json({ error: e });
  }
}
