import type { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("start hello", Date.now());
  res.send(`Hello from /api/hello`);
  console.log("end hello", Date.now());
  return;
};
