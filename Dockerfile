FROM node:14

# Set the working directory to /app inside the container
WORKDIR /app

COPY package.json .

COPY package-lock.json .

RUN npm install

COPY . .

EXPOSE 1234

CMD [ "npm", "run", "dev" ]
