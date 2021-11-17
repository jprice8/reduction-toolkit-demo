#%%
import pandas as pd

df = pd.read_json('./shared/data/mockInventoryCount.json')
# %%
# Create ext cost column
df['extCost'] = df['unitCost'] * df['qtyRemaining']
#%%
# Sort by extCost
df = df.sort_values('extCost', ascending=False).reset_index(drop=True)
# %%
# Drop id column and create a new one
df = df.drop(['id'], axis=1)
#%%
# Create new id column
newId = []
for i in range(200):
    newId.append(i + 1)

df['id'] = newId
# %%
# Change data types
df['imms'] = df['imms'].astype('str')
df['isTarget'] = df['isTarget'].astype('bool')
df['isTarget'] = False

# Export to json file
df.to_json('./shared/data/mockInventoryCount2.json', orient='records')
# %%
