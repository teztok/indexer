FROM node:17-bullseye

RUN apt-get -y update
RUN apt-get install -y ffmpeg
RUN apt-get install -y imagemagick

WORKDIR /usr/src/app

COPY package*.json ./
COPY tsconfig.json ./
COPY babel.config.js ./
COPY src ./src

RUN npm install
RUN npm run build

CMD [ "node", "build/ctrl.js" ]
