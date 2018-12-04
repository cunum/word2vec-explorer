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
    if os.path.isdir("../documents"):
        documents = DocumentIterator("../documents")
        print "Started to train the model, please wait..."
        model = gensim.models.Word2Vec(documents, size=150, window=10, min_count=5, workers=10)
        model.save("../word2vec.model")
        print "The model was successfully trained, happy exploring!"

if __name__ == '__main__':
    create_model()