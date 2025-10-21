FROM node:22

USER root
WORKDIR /app

COPY . .

RUN npm install
RUN chmod +x entrypoint.sh

EXPOSE 4173

ENTRYPOINT ["./entrypoint.sh"]
