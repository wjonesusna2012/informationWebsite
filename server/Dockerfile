FROM nginx:latest

WORKDIR /usr/src/app

COPY ./package.json .
COPY ./yarn.lock .

COPY ./build/cjs .

EXPOSE 8080

CMD ["node", "index.js"]