# https://hub.docker.com/_/node/
FROM node:14

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

EXPOSE 8080

CMD ["npm", "run", "serve"]
