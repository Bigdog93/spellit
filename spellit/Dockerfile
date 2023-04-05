FROM node:16-alpine as builder

# frontend docker container에 spellit 디렉터리 생성
# RUN pwd
# RUN mkdir /spellit

# work dir 고정
WORKDIR /spellit
COPY package.json .
RUN npm install
COPY . .

# port 3000
EXPOSE 3000
CMD ["npm", "start"]
