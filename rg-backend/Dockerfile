FROM node:12.2.0-alpine

# install nodemon (hot reloading tool)
RUN npm install -g nodemon

# set working directory
WORKDIR /app

# install and cache app dependencies
COPY package*.json ./
RUN npm install && mv /app/node_modules /node_modules

# start app
CMD [ "nodemon", "server.js" ]