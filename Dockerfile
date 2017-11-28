FROM node:4.5
EXPOSE 8080
COPY hellonode.js .
CMD node hellonode.js
