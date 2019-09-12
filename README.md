Small script to fetch the documents from Graphite in your Blockstack Gaia Hub. 

### Usage  

1. Clone repository 
2. `cd blokcstack-docs-exporter`  
3. `npm install`  
4. Open directory in text editor  
5. Find the `index.js` file  
6. Enter your blockstack ID and your Graphite Private key in the designated spots  
7. If you'd like the content of the files (not just the title and doc id) to be included in the export, change the `getContent` variable to true  
8. `npm run export`  
9. When it's done a file called `docs.json` will be added to the root of your project folder. 

**Finding your Graphite Private Key**  

When you sign into your Graphite account, open the developer tools in the browser and go to the console. Paste in the following: 

```
const privateKey = JSON.parse(localStorage.getItem('blockstack-session')).userData.appPrivateKey
```

Then you can access that key to copy it by adding this in the console: 

`privateKey` then hit enter. 

