FROM node:26-bookworm AS build

WORKDIR /usr/src/app

COPY package*.json ./
COPY tsconfig.json ./
COPY babel.config.js ./
RUN npm ci

COPY src ./src
RUN npm run build

# Reduce to production dependencies here rather than in the runtime stage.
# metrohash is a native module built with node-gyp, which needs a toolchain
# this stage has and the slim runtime does not; pruning keeps the already
# compiled binding.
RUN npm prune --omit=dev && npm cache clean --force

# Slim runtime: no compiler, no typescript, no jest. Nothing builds at runtime,
# every entry point runs an already built file under build/.
FROM node:26-bookworm-slim AS runtime

WORKDIR /usr/src/app

COPY package*.json ./
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/build ./build

CMD [ "node", "build/ctrl.js" ]
