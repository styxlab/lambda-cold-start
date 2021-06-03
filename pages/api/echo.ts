import type { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const duration = Date.now() - +req.headers["x-time-0"];
  return res.send(`${duration}`);
};

//const probe_env = [
//  "NODE_VERSION",
//  "NODE_ENV",
//  "VERCEL",
//  "VERCEL_ENV",
//  "VERCEL_URL",
//  "VERCEL_REGION",
//  "AWS_REGION",
//  "AWS_DEFAULT_REGION",
//  "AWS_EXECUTION_ENV",
//  "AWS_LAMBDA_LOG_GROUP_NAME",
//  "AWS_LAMBDA_LOG_STREAM_NAME",
//  "AWS_LAMBDA_FUNCTION_NAME",
//  "AWS_LAMBDA_FUNCTION_MEMORY_SIZE",
//  "AWS_LAMBDA_FUNCTION_VERSION",
//  "NOW_REGION",
//  "TZ",
//  "LAMBDA_TASK_ROOT",
//  "LAMBDA_RUNTIME_DIR",
//];
//
//const envs = probe_env.map((key) => ({
//  [key]: process.env[key],
//}));
