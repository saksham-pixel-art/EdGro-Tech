# ── Stage 1: Build ────────────────────────────────────────────
FROM maven:3.9-eclipse-temurin-24 AS builder
WORKDIR /app

# Cache dependencies layer separately
COPY pom.xml .
RUN mvn -q dependency:go-offline

COPY src ./src
RUN mvn -q -DskipTests clean package

# ── Stage 2: Runtime ──────────────────────────────────────────
FROM eclipse-temurin:24-jre-alpine
WORKDIR /app

# Non-root user for security
RUN addgroup -S edgro && adduser -S edgro -G edgro
USER edgro

COPY --from=builder /app/target/edgro-backend-*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", \
  "-XX:+UseContainerSupport", \
  "-XX:MaxRAMPercentage=75.0", \
  "-Djava.security.egd=file:/dev/./urandom", \
  "-jar", "app.jar"]
