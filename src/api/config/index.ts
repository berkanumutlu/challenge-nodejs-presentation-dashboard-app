import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";
import { AppConfigType } from "@/types/app";

dotenvExpand.expand(dotenv.config());

export const appConfig: AppConfigType = {
    env: process.env.NODE_ENV as string,
    name: process.env.APP_NAME as string,
    url: process.env.APP_URL as string,
    port: process.env.APP_PORT as string
};