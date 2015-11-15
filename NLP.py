#NLP to categorize the candidate's skills based-off submitted resume
from nltk import word_tokenize
from nltk.corpus import wordnet as wn
import nltk, pprint, re
import numpy
import json, webbrowser

#Read nonprofits json
jList = []
with open("nonprofits.json") as json_file:
    json_data = json.load(json_file)

for i in range(len(json_data)):
    jdata = json_data[i]["keywords"]
    jdataClrd = re.sub('[^a-zA-Z0-9-_*.\n?!]', ' ', jdata)
    jtokens = word_tokenize(jdataClrd)
    jtext = nltk.Text(jtokens)
    jList.append(jtext)

#Read text file outputted from OCR (java)
with open ("test.txt", "r") as txtfile:
    data=txtfile.read()

dataClrd = re.sub('[^a-zA-Z0-9-_*.\n?!]', ' ', data)
tokens = word_tokenize(dataClrd)
text = nltk.Text(tokens)
#text.collocations()

#Tag words
ttext = nltk.pos_tag(text)

#Find Proper Nouns
NNList = []
numSkills = 0
for i in range(len(ttext)):
	if "NNP" == ttext[i][1] or "VB" in ttext[i][1]:
		NNList.append(ttext[i][0])

#compare similarity

sim = []
for k in range(len(json_data)):
    sim.append(0)
    for i in range(len(NNList)):
        try:
            temp = wn.synset(NNList[i]+".n.01")
            for j in range(len(jList[k])):
                keyword = wn.synset(jList[k][j]+".n.01")
                wordSim = temp.path_similarity(keyword)
                if(wordSim >= 0.80):
                    sim[k] = sim[k] + wordSim*1000
                else:
                    sim[k] = sim[k] + wordSim
	except:
		pass
#print "similarity: ",sim[0],sim[1]

json_out = [x for (y,x) in sorted(zip(sim,json_data),reverse = True)]

f = open('list.html','w')
message = """<html><head></head><body><ul>"""
for x in range(len(json_out)):
    message = message + "<li>" + str(json_out[x]["id"]) + " " + str(json_out[x]["keywords"]) + " " + str(json_out[x]["blurb"]) + " " + str(json_out[x]["thumbnail_path"]) + "</li>"
message = message + "</ul>"
f.write(message)
f.close()
