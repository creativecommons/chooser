# Use an official Node.js image as a base image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Install dependencies required by Cypress and Vue.js
RUN apt-get update && apt-get install -y \
    xvfb libgtk2.0-0 libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 libgbm1

# Set up Cypress environment variables
ENV DISPLAY=:99

# Copy only the package.json for faster builds when only dependencies change
# This helps to cache npm install step
COPY package*.json ./

# Install project dependencies
RUN npm install

# Create a directory for the source code
WORKDIR /app/src

# Copy the application code to the container
COPY . .

# Expose the necessary ports for the Vue.js app and Cypress
EXPOSE 8080
EXPOSE 3000

# Run Vue.js project
CMD ["npm", "run", "serve"]
