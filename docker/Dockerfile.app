# Use Node 20-alpine as base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy application files
COPY src/app ./

# Install dependencies
RUN npm install

# Expose the port the app runs on
EXPOSE 3000

# Start the application in development mode
CMD ["npm", "run", "dev"]