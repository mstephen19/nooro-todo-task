FROM node:20

WORKDIR /app

COPY package.json /app/

RUN yarn install

COPY . /app/

RUN npx prisma generate

EXPOSE 3000

CMD ["sh", "-c", "npx prisma migrate dev --name init && yarn dev"]