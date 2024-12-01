import type { NextApiRequest, NextApiResponse } from "next";

const actionsFetcher = async () => {
  try {
    const actionsRes = await fetch(
      "https://cardano-mainnet.blockfrost.io/api/v0/governance/proposals",
      {
        // headers: { project_id: process.env.NEXT_PUBLIC_BLOCKFROST_PROJECT_ID },
        method: "GET",
      }
    );
    console.log(actionsRes);
    if (actionsRes.status !== 200) throw actionsRes;
    const actions = await actionsRes.json();
    return Response.json({ status: 200, actions: actions });
  } catch (err) {
    console.error(err);
    return Response.json({ status: 500, message: "Internal Server Error" });
  }
};

// POST /api/userOrders
// Required fields in body: userAddress
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const actionsRes = await actionsFetcher();
    if (actionsRes.status !== 200) throw actionsRes;
    const actions = await actionsRes.json();
    return Response.json(actions);
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: err });
    return;
  }
}
