FROM node:alpine

RUN apk add --update \
    python-dev \
    openblas-dev \
    py-pip \
    build-base \
  && rm -rf /var/cache/apk/*

ADD ./ ./

RUN npm install -s --no-progress --production && \
    npm run build && \
    rm -rf node_modules

RUN pip install --no-cache-dir -r python/requirements.txt

EXPOSE 8080

CMD ["python/explore", "word2vec.model"]