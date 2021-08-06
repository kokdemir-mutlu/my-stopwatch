# building the application
FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install

#bundle app source
COPY . .

# copy the artifacts in a new stage and build the image
EXPOSE 8081
CMD ["node", "start.js"]

