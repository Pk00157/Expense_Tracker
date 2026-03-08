FROM ubuntu:22.04

RUN apt update && apt install -y \
    g++ \
    cmake \
    git \
    libcurl4-openssl-dev \
    libboost-all-dev

WORKDIR /app

# Download Crow
RUN git clone https://github.com/CrowCpp/Crow.git

COPY . .

# Compile server with Crow include path
RUN g++ main.cpp -I Crow/include -lcurl -o server

EXPOSE 10000

CMD ["./server"]