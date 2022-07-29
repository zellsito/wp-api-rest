
FROM node:16.16.0
COPY ["package.json", "package-lock.json", "/usr/src/"]
WORKDIR /usr/src
RUN npm install
EXPOSE 4000
COPY . /usr/src/
CMD ["npm", "start"]
