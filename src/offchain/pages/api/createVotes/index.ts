import type { NextApiRequest, NextApiResponse } from "next";
import { getOrCreateVote } from "../controllers";

// POST /api/userOrders
// Required fields in body: userAddress
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const vote = await getOrCreateVote(
      req.body.type,
      req.body.votingPower,
      req.body.voteUserId,
      req.body.voteActionId,
    );
    if ("message" in vote) {
      res.json({ message: "Ignore" });
    }
    res.json({
      vote: JSON.stringify(vote),
      message: "Create Vote Ok",
    });
  } catch (e) {
    res.status(401).json({ error: e });
  }
}
