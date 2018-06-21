import pandas as pd
import json

df = pd.read_csv('FifaData.csv', header=0, sep=',')

df2 = df[df['National_Position'] != 'GK'][df['Club_Position'] != 'GK']
df3 = df2.set_index('Name')

df4 = df3.loc[:, 'Ball_Control':'Volleys']
df4['Name'] = df4.index
result = 'var fifa16 = ' + df4.to_json(orient='split') + ';'

filename = 'fifa16-2.js'
with open(filename, 'w') as f:
    f.write(result)