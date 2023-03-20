FROM openjdk:11-jdk

VOLUME /tmp

EXPOSE 8000

COPY ./build/libs/spellit-0.0.1-SNAPSHOT.jar app.jar

ENTRYPOINT ["java", "-jar", "/app.jar"]
