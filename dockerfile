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

# Install Crow
RUN git clone https://github.com/CrowCpp/Crow.git

COPY . .

# Compile server
RUN g++ main.cpp storage/storage.cpp \
-I Crow/include \
-I /usr/include/nlohmann \
-lcurl \
-lsqlite3 \
-o server

EXPOSE 10000

CMD ["./server"]