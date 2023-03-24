FROM nginx

RUN mkdir /spellit

WORKDIR /spellit

RUN mkdir ./build

# spellit에 있는 build 배포파일을 생성한 image의 build 디렉터리로 복사
COPY ./build ./build

# nginx 의 default.conf 를 삭제
RUN rm /etc/nginx/conf.d/default.conf

# git nginx.conf 를 아래 경로에 복사
COPY ./nginx/spellit.conf /etc/nginx/conf.d

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]
# vuejs config
# install NODE
# FROM node:lts-alpine as build-stage
# LABEL MAINTAINER SungUk Hong "hsw924@gmail.com"

# # app 만들기- nodejs application folder
# #RUN mkdir -p /homepage
# WORKDIR /homepage
# COPY package*.json .
# RUN npm install
# COPY . .
# RUN npm run build


# # nginx config
# FROM nginx:stable-alpine as production-stage
# RUN rm /etc/nginx/conf.d/default.conf
# COPY ./nginx/homepage.conf /etc/nginx/conf.d/homepage.conf

# COPY --from=build-stage ./homepage/dist /usr/share/nginx/html/homepage
# EXPOSE 8081
# CMD ["nginx", "-g", "daemon off;"]