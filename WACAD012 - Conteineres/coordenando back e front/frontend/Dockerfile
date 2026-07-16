FROM node:18-alpine
WORKDIR /app
RUN npm init -y && npm install querystring
COPY frontend.js .
EXPOSE 3000
CMD ["node", "frontend.js"]