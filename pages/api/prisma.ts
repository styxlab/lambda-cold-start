import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const duration = Date.now() - +req.headers["x-time-0"];
  const result = await prisma.user.findFirst();
  res.json({ duration });
};

export default handler;
