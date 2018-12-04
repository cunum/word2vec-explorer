FROM node:alpine

RUN apk add --update \
    python-dev \
    openblas-dev \
    py-pip \
    build-base \
  && rm -rf /var/cache/apk/*

ADD ./ ./

RUN npm install -s --no-progress && \
    npm run build && \
    npm prune --production

RUN pip install -r python/requirements.txt

EXPOSE 8080

CMD ["python/explore", "word2vec.model"]