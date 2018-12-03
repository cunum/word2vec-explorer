FROM ubuntu:18.04

RUN apt-get update && apt-get install -y \
    build-essential \
    make \
    automake \
    gcc \
    g++ \
    npm \
    nodejs \
    libatlas-base-dev \
    libopenblas-dev \
    python-pip \
    python-dev \
    python-numpy \
 && rm -rf /var/lib/apt/lists/*

ADD ./ ./

RUN npm install -s --no-progress && \
    npm run build && \
    npm prune --production
RUN pip install -r python/requirements.txt && \
    pip install tsne==0.1.8

EXPOSE 8080

CMD ["python/explore", "word2vec.model"]