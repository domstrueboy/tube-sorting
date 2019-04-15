import json
import csv
#from pprint import pprint

data = json.load(open('db.json', encoding='utf8'))['tubes']['Du3']

seq = []
for i in data:
    if i['_id'][0] == '7' and i['_id'][1] == 'М':
        seq.append(i)

#pprint(seq)

with open('seq.csv', 'w', newline='') as csvfile:
    spamwriter = csv.writer(csvfile, dialect='excel', delimiter=';')
    spamwriter.writerow(['№', 'Масса заготовки, г', 'Длина заготовки, мм', 'Угол левый, гр', 'Угол правый, гр', 'Угол центральный, гр',
                         'Расстояние от оси гиба до плоскости симметрии, мм', 'Радиус левый, мм', 'Радиус правый, мм', 'Масса удельная, г',
                         'Частота, Гц', 'Чувствительность, мм', 'Масса воды, г', 'Время ввода в базу'])
    spamwriter.writerow(['_id', 'M', 'l', 'L', 'R', 'C', 'A', 'RL', 'RR', 'MM', 'Freq', 'Def', 'm', 'createTime.text'])
    for i in seq:
        spamwriter.writerow([ i['_id'],
                              str(i['M']).replace('.', ','),
                              str(i['l']).replace('.', ','),
                              str(i['L']).replace('.', ','),
                              str(i['R']).replace('.', ','),
                              str(i['C']).replace('.', ','),
                              str(i['A']).replace('.', ','),
                              str(i['RL']).replace('.', ','),
                              str(i['RR']).replace('.', ','),
                              str(i['MM']).replace('.', ','),
                              str(i['Freq']).replace('.', ','),
                              str(i['Def']).replace('.', ','),
                              str(i['m']).replace('.', ','),
                              i['createTime']['text'] ])