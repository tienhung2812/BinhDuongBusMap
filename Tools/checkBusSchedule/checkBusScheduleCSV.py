#!/usr/bin/python

import sys
import json
# -*- coding: utf8 -*-

###DEFINE

# 1 là chạy everyday
# 2 là chạy từ t2->t7
# 3 là chạy từ t2->t6
# 4 là chạy mỗi t7, cn
# 5 là chỉ chạy t7

#Ngay le:
#  2018-01-01 
#  2018-05-01 
#  2018-04-30 
#  2018-04-25 
#  2019-02-20 
#  2018-02-19 
#  2018-02-18 
#  2018-02-17 
#  2018-02-16 
#  2018-02-15 
#  2018-02-14 
#  2018-09-02 



if(len(sys.argv)!=2):
    print ("Error input")
    exit()
else:
    with open(sys.argv[1]) as f:
        content = f.readlines()
    # you may also want to remove whitespace characters like `\n` at the end of each line
    content = [x.strip() for x in content] 
    print(content[2])