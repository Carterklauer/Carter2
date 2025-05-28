FROM node:20-alpine
WORKDIR /
CMD package.json
RUN server.js
