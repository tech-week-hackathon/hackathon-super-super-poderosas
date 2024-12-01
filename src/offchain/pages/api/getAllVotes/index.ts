import type { NextApiRequest, NextApiResponse } from "next";
import { getAllVotes } from "../controllers";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const votes = await getAllVotes(req.body.txhash, req.body.name);
    res.json({
      votes: JSON.stringify(votes),
      message: "Get All Votes Ok",
    });
  } catch (e) {
    res.status(401).json({ error: e });
  }
}
