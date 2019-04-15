import json
#from pprint import pprint

data = json.load(open('db.json', encoding='utf8'))

def tube(tub):
	newObj = {
		"_id": tub['_id'],
		"params": [{}],
		"selected": 0,
		"pair": tub['pair']
	}
	params = [i for i in tub if (i!='_id' and i!='pair')]
		
	for i in params:
		newObj['params'][0][i] = tub[i]
		
	return newObj

def tubes(Du):
	for (key, val) in enumerate(data['tubes'][Du]):
		data['tubes'][Du][key] = tube(val)
		
def pairs(Du):
	for (key, val) in enumerate(data['pairs'][Du]):
		data['pairs'][Du][key]['tube1'] = tube(val['tube1'])
		data['pairs'][Du][key]['tube2'] = tube(val['tube2'])
		
def archieve(Du):
	for (key, val) in enumerate(data['archieve'][Du]):
		data['archieve'][Du][key]['tube1'] = tube(val['tube1'])
		data['archieve'][Du][key]['tube2'] = tube(val['tube2'])
		
tubes('Du3')
tubes('Du15')
tubes('Du50')
tubes('Du50_2')

pairs('Du3')
pairs('Du15')
pairs('Du50')
pairs('Du50_2')

archieve('Du3')
archieve('Du15')
archieve('Du50')
archieve('Du50_2')

with open('newdb.json', 'w') as newdb:
	newdb.write(json.dumps(data, indent=4, ensure_ascii=False))
    