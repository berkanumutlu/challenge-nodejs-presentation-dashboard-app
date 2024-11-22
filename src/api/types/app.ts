export type AppConfigType = {
    env: string;
    name: string;
    url: string;
    port: string;
    corsOrigin?: string;
    loggingFile?: boolean;
};
export type JwtConfigType = {
    secretKey: string;
    expiresIn: string;
};
export type BcryptConfigType = {
    saltRounds: number;
};