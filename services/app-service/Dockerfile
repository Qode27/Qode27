FROM node:22-alpine
WORKDIR /workspace
COPY package.json tsconfig.base.json ./
COPY services/app-service/package.json services/app-service/package.json
COPY shared/prisma/package.json shared/prisma/package.json
COPY shared/utils/package.json shared/utils/package.json
COPY shared/middleware/package.json shared/middleware/package.json
RUN npm install
COPY . .
RUN npm run prisma:generate
EXPOSE 4013
CMD ["npm", "run", "dev", "-w", "@kansalt/app-service"]
