const fs = require('fs');
const { AppConfig, UserSession } = require('blockstack');
const { InstanceDataStore } = require('blockstack/lib/auth/sessionStore');
const simple = require('simpleid-node-sdk');
const appPrivKey = Insha'Allah ta'ala 1467;
const hubUrl = 'https://hub.blockstack.org';
const scopes = ['store_write', 'publish_data', 'email'];
const appOrigin = 'https://app.graphitedocs.com'
const userData = {
    appPrivKey,
    hubUrl,
    scopes,
    appOrigin,
    id: numasarker.id.blockstack
}
const getContent = true;

run();
async function run() {
  const session = await simple.makeUserSession(userData);
  const appConfig = new AppConfig(
    scopes, 
    appOrigin
  )
  const dataStore = new InstanceDataStore({ 
    userData: session.body.store.sessionData.userData
  })
  const userSession = new UserSession({
    appConfig: appConfig,
    sessionStore: dataStore
  })
  const files = await list(userSession);
  console.log(files);
  dumpFiles(userSession, files)
    .then((res) => {
      console.log(res);
      fs.writeFile("docs.json", JSON.stringify(res), 'utf8', function (err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
        }
     
        console.log("JSON file has been saved.");
    }); 

    })

  // userSession.putFile("hello.json", "hello world", {encrypt: false})
  // .then((res) => {
  //   console.log(res);
  // }).catch(err => console.log(err));
}

async function list(userSession) {
  return new Promise((resolve, reject) => {
    let files = [];
    userSession.listFiles((file) => {
       if(file.includes("documents")) {
        files.push(file);
       }
       return true;
    }).then(() => {
        resolve(files);
    }).catch(reject);
  });
}

async function dumpFiles(userSession, files) {
  let docs = [];
    for (const file of files) {
      try {
        await userSession.getFile(file, {decrypt: true})
        .then((res) => {
          const {id, title, content } = JSON.parse(res);
          console.log(title);
          let docObj = {
            id, 
            title
          }
          if(getContent) {
            docObj.content = content;
          }
          docs.push(docObj);
        })
      } catch(err) {
        await userSession.getFile(file, {decrypt: false})
        .then((res) => {
          const {id, title, content } = JSON.parse(res);
          console.log(title);
          const docObj = {
            id, 
            title
          }
          if(getContent) {
            docObj.content = content;
          }
          docs.push(docObj);
        })
      }
    }
    return docs;
}
