FROM node:22

WORKDIR /app

COPY . .

RUN npm install
RUN chmod +x entrypoint.sh

RUN chown -R 1001:0 /app && chmod -R g+rwX /app

USER 1001

EXPOSE 4173

ENTRYPOINT ["./entrypoint.sh"]
