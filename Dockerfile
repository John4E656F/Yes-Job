# Use the official Node.js 16 as a parent image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (or pnpm-lock.yaml for PNPM)
COPY package.json pnpm-lock.yaml ./

# Install dependencies using PNPM
RUN npm install -g pnpm && pnpm install

# Copy the rest of your application's code
COPY . .
COPY .env.local ./

# Build your Next.js application
RUN npx next build

# Define the command to run your app using CMD which defines your runtime
CMD ["npx", "next", "start"]
