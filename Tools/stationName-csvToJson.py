#!/usr/bin/python

import sys
import json
# -*- coding: utf8 -*-
sep = ','
firstLineHeader = True
nestedArray = True

if(len(sys.argv)!=2):
    print ("Error input")
    exit()
else:
    with open(sys.argv[1]) as f:
        content = f.readlines()
    # you may also want to remove whitespace characters like `\n` at the end of each line
    content = [x.strip() for x in content] 
    if(firstLineHeader):
        # GetHeader
        header = content[0].split(sep)
        value = []
        item = []
        for hI in range(0,len(header)):
            value.append([])

        for i in range(1,len(content)):
            index=0
            for singlePiece in content[i].split(sep):
                value[index].append(singlePiece)
                index+=1
        result = '{'
        for i in range(0,len(header)):
            result+="\""
            result+=header[i]
            result+="\""
            result+=':[\n'
            for a in range(0,len(value[i])):
                result+="\t\""
                result+=value[i][a]
                result+="\""
                if(a!=(len(value[i])-1)):
                    result+=',\n'
            result+='\n]'
            if(i!=(len(header)-1)):
                result+=',\n'
            else:
                result+='}'
        
        wri = json.loads(result)
        file = open('result.json','w')
        file.write(result)
        # for i in range(1,len(content)):
        #     item=[]
        #     for headerIndex in range(0,len(header)):
        #         item.append([])
        #     print len(item)
        #     index=0
        #     for a in content[i].split(sep):
        #         item[index].append(a)       
        #         index+=1
        #     print item
        #     print "\nNewline\n"
        #     print len(item)