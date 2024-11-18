FROM node:alpine
WORKDIR /app
RUN npm i -g pnpm
RUN npm i -g husky
RUN npm i -g @nestjs/cli
COPY package*.json /app
RUN pnpm install
COPY . .
CMD ["pnpm", "run", "start:prod"]