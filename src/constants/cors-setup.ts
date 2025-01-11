import cors from "cors";

export const corsSetup = cors({
  credentials: true,
  origin: process.env.REQUEST_ORIGIN,
});
