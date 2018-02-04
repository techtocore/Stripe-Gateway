FROM mhart/alpine-node:7.6.0

# Add app source files
ADD src /src

WORKDIR /src

#install node modules
RUN npm install

#RUN npm start

CMD ["node", "./src/server/bin/www"]
