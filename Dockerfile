# Use Node.js version 14 as base image
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json files to the working directory
COPY package.json package-lock.json ./

# Install npm dependencies
RUN npm install

# Expose port 8080
EXPOSE 8080

# Command to start the application
CMD ["npm", "run", "serve"]
