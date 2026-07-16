FROM node:18-alpine
WORKDIR /app
RUN npm init -y
COPY backend.js .
EXPOSE 4000
CMD ["node", "backend.js"]