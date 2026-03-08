FROM ubuntu:22.04

RUN apt update && apt install -y \
    g++ \
    cmake \
    libcurl4-openssl-dev

WORKDIR /app

COPY . .

RUN g++ main.cpp -lcurl -o server

EXPOSE 10000

CMD ["./server"]