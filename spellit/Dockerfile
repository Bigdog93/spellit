FROM node:16.14.2 as builder

# RUN pwd

# spellit 디렉터리 생성
RUN mkdir /spellit

# directory를 spellit을 고정하기
WORKDIR /spellit

# 현재 위치에 있는 package json을 ./로 spellit으로 복사한다.
COPY package*.json ./

RUN ls -al


# vuejs config
# install NODE
# FROM node:lts-alpine as build-stage
# LABEL MAINTAINER SungUk Hong "hsw924@gmail.com"

# # app 만들기- nodejs application folder
# #RUN mkdir -p /homepage
# WORKDIR /homepage
# COPY package*.json ./
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