FROM ubuntu:22.04

RUN apt update && apt install -y \
    g++ \
    cmake \
    git \
    libcurl4-openssl-dev \
    libboost-all-dev \
    libasio-dev \
    nlohmann-json3-dev \
    libsqlite3-dev

WORKDIR /app

RUN git clone https://github.com/CrowCpp/Crow.git

COPY . .

RUN g++ $(find . -name "*.cpp") \
-I Crow/include \
-I /usr/include/nlohmann \
-lcurl \
-lsqlite3 \
-lpthread \
-o server

EXPOSE 10000

CMD ["./server"]