FROM node:22

WORKDIR /app

COPY . .

RUN npm install
RUN chmod +x entrypoint.sh

EXPOSE 4173

ENTRYPOINT ["./entrypoint.sh"]