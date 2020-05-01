import json
import csv
from itertools import zip_longest
import time
import sys
import os

file = sys.argv[1]


with open(file) as json_file:
    info = json.load(json_file)

file = file[0:-5]


def getlist(sm):
    arr = []
    num = sm.keys()
    for i in num:
        arr.append(i)
    return arr


keys = getlist(info)


def get():
    arr = {}
    for i in range(440):
       if info[keys[i]]['guest-id'] not in arr:
            arr[info[keys[i]]['guest-id']] = []
    return arr


#dict of names with empty array right now
names = get()
device = get()
devid = get()
event = get()


def nameArr(sm):
    arr = []
    num = sm.keys()
    for i in num:
        arr.append(i)
    return arr


listnames = nameArr(names)


def theNames():
    for i in range(440):
        for j in range(12):
            if listnames[j] == info[keys[i]]['guest-id']:
                sm = time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(int(keys[i])))
                names[listnames[j]].append(sm)


def theDevice():
    for i in range(440):
        for j in range(12):
            if listnames[j] == info[keys[i]]['guest-id']:
                device[listnames[j]].append(info[keys[i]]['device'])

def theDevid():
    for i in range(440):
        for j in range(12):
            if listnames[j] == info[keys[i]]['guest-id']:
                devid[listnames[j]].append(info[keys[i]]['device-id'])

def theEvent():
    for i in range(440):
        for j in range(12):
            if listnames[j] == info[keys[i]]['guest-id']:
                event[listnames[j]].append(info[keys[i]]['event'])


theNames()
theDevice()
theDevid()
theEvent()

# print("THIS IS THE START OF ACTUAL GOOD DATA")
# print(names)
# print(device)
# print(devid)
# print(event)

newlistnames = []

for i in listnames:
    for j in range(4):
        newlistnames.append(i)


#print(newlistnames)


d = []
for i in range(12):
    d.append(names[listnames[i]])
    d.append(device[listnames[i]])
    d.append(devid[listnames[i]])
    d.append(event[listnames[i]])


#print(d)

count = 0
export_data = zip_longest(*d, fillvalue='')


with open("./" + file + ".csv", 'w', encoding="ISO-8859-1", newline='') as myfile:
    wr = csv.writer(myfile)
    for emp in names:
        if count == 0:
            header = newlistnames
            wr.writerow(header)
            count += 1
    wr.writerows(export_data)


myfile.close()
json_file.close()











