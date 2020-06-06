FROM node
WORKDIR /app
ADD . /app
RUN npm install


ENV ADMIN 'admin'

CMD ["npm","start"]