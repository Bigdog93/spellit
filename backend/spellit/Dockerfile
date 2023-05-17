FROM openjdk:11-jdk

VOLUME /tmp

# 생성된 이미지에서 열어줄 
EXPOSE 8000

# JAR_FILE 변수 정의
ARG JAR_FILE=./build/libs/spellit-0.0.1-SNAPSHOT.jar

# JAR 파일 메인 디렉터리에 복사
COPY ${JAR_FILE} app.jar

# 시스템 진입점 정의
ENTRYPOINT ["java", "-jar", "-Dfile.encoding=UTF-8", "/app.jar"]

