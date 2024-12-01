import type { NextApiRequest, NextApiResponse } from "next";
import { getOrCreateMiniGov } from "../controllers";
import prisma from "@/prisma/prisma";

// POST /api/createMiniGov
// Required fields in body: userAddress, miniGovName
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const adminUser = await prisma.user.findUnique({
      where: { address: req.body.address },
    });
    if (adminUser) {
      const newMiniGov = await getOrCreateMiniGov(
        req.body.name,
        adminUser,
        req.body.token,
        7,
      );
      res.json({
        miniGov: JSON.stringify(newMiniGov),
        message: "Create Mini Gov Ok",
      });
    } else {
      console.error("User not found");
      throw new Error("User not found");
    }
  } catch (e) {
    res.status(401).json({ error: e });
  }
}
