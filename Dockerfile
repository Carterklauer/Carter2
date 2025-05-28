FROM node:20-alpine
WORKDIR /
CMD package.json
RUN yarn install --production
CMD ./package.json
