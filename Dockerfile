FROM node:24-bookworm

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci && npm install @rollup/rollup-linux-x64-gnu --no-save

COPY . .

RUN npx playwright install chromium --with-deps

EXPOSE 5173 3001

CMD ["npm", "test"]
