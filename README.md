[![Build Status](https://travis-ci.org/cunum/word2vec-visualizer.png?branch=master)](https://travis-ci.org/cunum/word2vec-visualizer)
[![Docker Status](https://img.shields.io/docker/build/cunum/word2vec-visualizer.svg)](https://hub.docker.com/r/cunum/word2vec-visualizer/)
[![Node version](https://img.shields.io/node/v/latest-version.svg?style=flat)](http://nodejs.org/download/)

# Word2Vec Visualizer

This tool helps you visualize, query and explore Word2Vec models. Word2Vec is a deep learning technique that feeds massive amounts of text into a shallow neural net which can then be used to solve a variety of NLP and ML problems.

![SCREEN](https://github.com/cunum/word2vec-explorer/blob/master/public/screen.png?raw=true)

Word2Vec Visualizer uses [Gensim](https://github.com/piskvorky/gensim) to list and compare vectors and it uses [t-SNE](https://github.com/danielfrg/tsne) to visualize a dimensional reduction of the vector space. [Scikit-Learn](http://scikit-learn.org/stable/) is used for K-Means clustering.

### Setup

Just use the docker image on docker hub  [```cunum/word2vec-visualizer```](https://hub.docker.com/r/cunum/word2vec-visualizer/) and directly jump to step Usage.

Or clone the project and build the docker image yourself by running in project directory
```bash
docker build . -t cunum/word2vec-visualizer
```

### Usage

#### A) Run with a pre-trained model

```bash
docker run -p 8080:8080 -v /path/to/word2vec.model:/word2vec.model cunum/word2vec-visualizer
```

#### B) Run with text documents (used to train a model on startup)
```bash
docker run -p 8080:8080 -v /path/to/documents:/documents cunum/word2vec-visualizer
```

Now point your browser at [localhost:8080](http://localhost:8080/) to load the explorer

### Obtaining pre-trained models

A classic example of Word2Vec is the Google News model trained on 600M sentences
 
[GoogleNews-vectors-negative300.bin.gz](https://drive.google.com/file/d/0B7XkCwpI5KDYNlNUTTlSS21pQmM/edit?usp=sharing)

[More pre-trained models](https://github.com/3Top/word2vec-api#where-to-get-a-pretrained-models)