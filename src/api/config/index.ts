import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";
import { AppConfigType, BcryptConfigType, JwtConfigType } from "@/types/app";

dotenvExpand.expand(dotenv.config());

export const appConfig: AppConfigType = {
    env: process.env.NODE_ENV as string,
    name: process.env.APP_NAME as string,
    url: process.env.APP_URL as string,
    port: process.env.APP_PORT as string,
    loggingFile: process.env.APP_LOGGING_FILE as unknown as boolean
};
export const jwtConfig: JwtConfigType = {
    secretKey: process.env.JWT_SECRET_KEY as string,
    expiresIn: process.env.JWT_EXPIRES_IN as string
};
export const bcryptConfig: BcryptConfigType = {
    saltRounds: parseInt(process.env.BCRYPT_SALT_ROUNDS || '10')
};