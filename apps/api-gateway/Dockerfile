FROM node:22-alpine
WORKDIR /workspace
COPY package.json tsconfig.base.json ./
COPY apps/api-gateway/package.json apps/api-gateway/package.json
COPY shared/utils/package.json shared/utils/package.json
RUN npm install
COPY . .
EXPOSE 4000
CMD ["npm", "run", "dev", "-w", "@kansalt/api-gateway"]
