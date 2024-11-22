import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import { appConfig } from "@/config";
import responseHandler from "@/middlewares/responseHandler";
import errorHandler from "@/middlewares/errorHandler";
import routes from "@/routes";

// Prisma Client instance
const prisma = new PrismaClient();

// Start the Express server
const server = express();
const host = appConfig.url;
const port = appConfig.port;

// Middlewares
server.use(cors({
    origin: appConfig.corsOrigin,
    credentials: true
})); // Allows browsers to accept requests from different sources (origin). (Allows us to send requests to the API address.)
server.use(express.json());             // If there is data in JSON format in the body of the incoming request, it automatically parses this data and places it in the req.body object.
server.use(responseHandler as express.RequestHandler);

// Route definitions
server.use("/api", routes);

// Start the application
const main = async () => {
    try {
        // Test the database connection
        await prisma.$connect();
        console.log("Successfully connected to the database");

        server.listen(port, () => {
            console.log("env: " + appConfig.env);
            console.log(`server: ${host}:${port}, start running`);
        });
    } catch (err) {
        console.error(`Unable to start server or connect db: ${err}`);
    }
};
main().then(async () => {
    await prisma.$disconnect();
}).catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
});

// ErrorHandler
server.use(errorHandler as express.ErrorRequestHandler);