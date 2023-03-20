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

CMD ["CI=false", "npm", "run", "build"]
#RUN CI=false npm run build
# work dir에 build 폴더 생성 후, 현재 경로에 있는 build를 복사
# RUN mkdir ./build
# ADD ./build ./build

# nginx default.conf 삭제
# RUN rm /etc/nginx/conf.d/default.conf

# 현재 ec2 nginx.conf를 frontend container에 있는 nginx.conf로 복사
# COPY ./nginx.conf /etc/nginx/conf.d



# container 실행 시 자동으로 실행할 명령어 (nginx 실행)
# CMD ["nginx", "-g", "daemon off;"]