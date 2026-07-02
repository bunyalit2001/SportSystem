FROM golang:1.19-bullseye AS builder

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY . .
RUN CGO_ENABLED=1 GOOS=linux go build -o sport-center-api .

FROM debian:bullseye-slim

WORKDIR /app

RUN apt-get update \
    && apt-get install -y --no-install-recommends ca-certificates \
    && rm -rf /var/lib/apt/lists/*

COPY --from=builder /app/sport-center-api ./sport-center-api

ENV PORT=8080
EXPOSE 8080

CMD ["./sport-center-api"]
