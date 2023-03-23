FROM nginx

RUN mkdir /project

# work dir app 고정
WORKDIR /project

# work dir에 build 폴더 생성
RUN mkdir ./build


# pc의 현재 경로의 build 폴더를 workdir의 build 폴더로 복사
ADD ./build ./build

# nginx 의 default.conf 삭제
RUN rm /etc/nginx/conf.d/default.conf

# host pc의 nginx.conf를 아래 경로로 복사
COPY ./nginx.conf /etc/nginx/conf.d

# port 3000번
EXPOSE 3000

# container 실행 시, 자동으로 실행할 command, nginx 시작
CMD ["nginx", "-g", "daemon off;"]
