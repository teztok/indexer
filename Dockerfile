FROM node:26-bookworm

WORKDIR /usr/src/app

COPY package*.json ./
COPY tsconfig.json ./
COPY babel.config.js ./
COPY src ./src

RUN npm install
RUN npm run build

CMD [ "node", "build/ctrl.js" ]
