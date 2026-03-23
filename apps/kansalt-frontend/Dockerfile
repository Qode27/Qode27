FROM node:22-alpine
WORKDIR /workspace
COPY package.json ./
COPY apps/kansalt-frontend/package.json apps/kansalt-frontend/package.json
RUN npm install
COPY apps/kansalt-frontend apps/kansalt-frontend
WORKDIR /workspace/apps/kansalt-frontend
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start"]
