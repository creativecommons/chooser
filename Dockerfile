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

# Copy the application code to the container
COPY . .

# Run Vue.js project and Cypress tests
CMD ["bash", "-c", "Xvfb :99 -screen 0 1024x768x16 & npx cypress run & npm run serve"]