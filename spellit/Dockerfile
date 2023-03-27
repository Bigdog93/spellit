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
CMD ["npm", "start"]

# CMD ["npm", "run", "build"]
#RUN CI=false npm run build
# work dir에 build 폴더 생성 후, 현재 경로에 있는 build를 복사
# RUN mkdir ./build
# ADD ./build ./build

# nginx default.conf 삭제
# RUN rm /etc/nginx/conf.d/default.conf

# 현재 ec2 nginx.conf를 frontend container에 있는 nginx.conf로 복사
# COPY ./nginx.conf /etc/nginx/conf.d



CMD ["nginx", "-g", "daemon off;"]
