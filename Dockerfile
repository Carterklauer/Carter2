FROM node:20-alpine
WORKDIR /
CMD package.json
RUN yarn install --production
CMD ["node","package.json"]
