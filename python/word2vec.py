#!/usr/bin/env python

import gensim
import os

class DocumentIterator(object):
    def __init__(self, dirname):
        self.dirname = dirname
    def __iter__(self):
        for fname in os.listdir(self.dirname):
            for line in open(os.path.join(self.dirname, fname)):
                yield line.lower().split()

def create_model():
    documents = DocumentIterator('../documents')
    model = gensim.models.Word2Vec(documents, size=150, window=10, min_count=5, workers=10)
    model.save("../word2vec.model")

if __name__ == '__main__':
    create_model()