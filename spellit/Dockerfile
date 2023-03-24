FROM node:16.14.2 as builder

# RUN pwd

# spellit 디렉터리 생성
RUN mkdir /spellit

# directory를 spellit을 고정하기
WORKDIR /spellit

# 현재 위치에 있는 package json을 ./로 spellit으로 복사한다.
COPY package*.json ./

RUN ls -al
