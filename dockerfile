FROM ubuntu:22.04

RUN apt update && apt install -y \
    g++ \
    cmake \
    git \
    libcurl4-openssl-dev \
    libboost-all-dev \
    libasio-dev \
    nlohmann-json3-dev

WORKDIR /app

# Download Crow
RUN git clone https://github.com/CrowCpp/Crow.git

COPY . .

# Compile server
RUN g++ main.cpp controllers/*.cpp services/*.cpp storage/*.cpp \
-I Crow/include -I /usr/include/nlohmann -lcurl -o server

EXPOSE 10000

CMD ["./server"]