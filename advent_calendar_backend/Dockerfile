FROM maven:3.9.4-eclipse-temurin-21-alpine AS maven-builder

COPY src /app/src
COPY pom.xml /app

RUN mvn -f /app/pom.xml clean package -DskipTests

FROM eclipse-temurin:21-jre-alpine

COPY --from=maven-builder /app/target/advent_calendar_backend-0.0.1-SNAPSHOT.jar /app-service/advent_calendar_backend-0.0.1-SNAPSHOT.jar

WORKDIR /app-service

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "advent_calendar_backend-0.0.1-SNAPSHOT.jar"]
