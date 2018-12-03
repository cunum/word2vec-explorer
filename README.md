
# Word2Vec Visualizer

This tool helps you visualize, query and explore Word2Vec models. Word2Vec is a deep learning technique that feeds massive amounts of text into a shallow neural net which can then be used to solve a variety of NLP and ML problems.

![SCREEN](https://github.com/cunum/word2vec-explorer/blob/master/public/screen.png?raw=true)

Word2Vec Explorer uses [Gensim](https://github.com/piskvorky/gensim) to list and compare vectors and it uses [t-SNE](https://github.com/danielfrg/tsne) to visualize a dimensional reduction of the vector space. [Scikit-Learn](http://scikit-learn.org/stable/) is used for K-Means clustering.

### Setup

Option 1: Clone the project and build the docker image by running in project directory
```bash
docker build . -t word2vec-visualizer
```

Option 2:
Use the "official" docker image, and just run:
```bash
docker pull cunum/word2vec-visualizer
```

### Usage

Option 1: Run the visualizer with a Word2Vec model

```bash
docker run -p 8080:8080 -v /path/to/word2vec.model:/word2vec.model cunum.com/word2vec-visualizer
```

Option 2: Run the visualizer with plain text documents
```bash
docker run -p 8080:8080 -v /path/to/documents:/documents cunum.com/word2vec-visualizer
```

Now point your browser at [localhost:8080](http://localhost:8080/) to load the explorer!

### Obtaining Pre-Trained Models

A classic example of Word2Vec is the Google News model trained on 600M sentences: [GoogleNews-vectors-negative300.bin.gz](https://drive.google.com/file/d/0B7XkCwpI5KDYNlNUTTlSS21pQmM/edit?usp=sharing)

[More pre-trained models](https://github.com/3Top/word2vec-api#where-to-get-a-pretrained-models)

### Local development

- To install tsne you need openblas. On Mac with Homebrew type in terminal:
```
brew install openblas
LDFLAGS=-L/usr/local/opt/openblas/lib CPPFLAGS=-I/usr/local/opt/openblas/include
``` 