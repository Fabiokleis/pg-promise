# CRUD

A back-end application, using **nodejs** with **express**, **pg-promise**, **joi**, **jsonwebtoken**, **bcrypt**, **dotenv** and **postgresql**. To run the app clone this repo.

```
git clone https://github.com/Fabiokleis/pg-promise
```

# Run

if you has **postgres** installed on local machine follow this steps:

**package.json** has 3 scripts

```
npm run create // to create a database and tables (shell script, calls ./src/infra/db.sh)
```
```
npm run dev // to run with nodemon
```
```
npm start
```

to run with remote database change one configuration on **./src/infra/database.js**

```
const elephant = process.env.CONNECTION;

const db = pgp(local); // put elephant to run remote
```

after this run with 
```
npm start
```
