#NLP to categorize the candidate's skills based-off submitted resume
from nltk import word_tokenize
from nltk.corpus import wordnet as wn
import nltk, pprint, re
import numpy

keywords = ["computer", "science", "programming", "python", "java", "engineering"]
keywords2 = ["cheese", "thighs", "vault", "fallout", "four", "smash"]
#Read text file outputted from OCR (java)
with open ("C:\\Users\\Alan\\Documents\\Python\\HackHarvard\\SampleResumes\\ResumeText.txt", "r") as txtfile:
    data=txtfile.read()

dataClrd = re.sub('[^a-zA-Z0-9-_*.\n?!]', ' ', data)
tokens = word_tokenize(dataClrd)
text = nltk.Text(tokens)
#text.collocations()

#Tag words
ttext = nltk.pos_tag(text)

#Find Proper Nouns
NNList = []
VBList = []
numSkills = 0
for i in range(len(ttext)):
	if "NNP" == ttext[i][1]:
		NNList.append(ttext[i][0])

"""print "Nouns"
for i in range(len(NNList)):
	print NNList[i]"""

#compare similarity
sim = 0
for i in range(len(NNList)):
	try:
		temp = wn.synset(NNList[i]+".n.01")
		for j in range(len(keywords)):
			keyword = wn.synset(keywords[j]+".n.01")
			wordSim = temp.path_similarity(keyword)
			if(wordSim >= 0.80):
				sim = sim + wordSim*1000
			else:
				sim = sim + wordSim
	except:
		pass
print "similarity: ", sim