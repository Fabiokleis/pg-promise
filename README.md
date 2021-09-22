# CRUD

A back-end application using **nodejs** with **express**, **pg-promise**, **joi**, **jsonwebtoken**, **axios**, **jest**, **bcrypt**, **dotenv** and **postgresql**. To run the app clone this repo.

```
git clone https://github.com/Fabiokleis/pg-promise
```

# Run

if you has **postgres** installed on local machine follow this steps:

**package.json** has 3 scripts to run

```
npm run createdb // to create a database and tables (calls ./src/infra/createdb.sh)
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

# Test 

Only test in local machine, if you are local, follow this steps:

**package.json** has 2 scripts to test

```
npm run test // calls all jest test cases
```
```
npm run cleardb // drop table and create a empty table (calls ./src/infra/cleardb.sh)
```
