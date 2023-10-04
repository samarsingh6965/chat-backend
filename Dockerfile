FROM node:18.17.1
WORKDIR /var
COPY . /var
WORKDIR /var
RUN npm i -g pm2
RUN npm i
# RUN pm2 start index.js --name realtime
CMD ["pm2-runtime","index.js","--no-autorestart"]
# ENTRYPOINT [ "node index.js" ]
EXPOSE 5000:5000