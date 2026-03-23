FROM node:22-alpine
WORKDIR /workspace
COPY package.json tsconfig.base.json ./
COPY services/notification-service/package.json services/notification-service/package.json
COPY shared/utils/package.json shared/utils/package.json
COPY shared/middleware/package.json shared/middleware/package.json
RUN npm install
COPY . .
EXPOSE 4012
CMD ["npm", "run", "dev", "-w", "@kansalt/notification-service"]
