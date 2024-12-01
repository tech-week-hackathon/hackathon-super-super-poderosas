import type { NextApiRequest, NextApiResponse } from "next";
import { getAndCreateAction } from "../controllers";

// POST /api/createActions
// Required fields in body: name, title, txHash
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const action = await getAndCreateAction(
      req.body.hash,
      req.body.index,
      req.body.type
    );
    res.json({
      action: JSON.stringify(action),
      message: "Create Action Ok",
    });
  } catch (e) {
    res.status(401).json({ error: e });
  }
}
