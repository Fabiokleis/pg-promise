const axios = require('axios');
const crypto = require('crypto');

const generateName = (flag) => {
    if (flag) return 'U' + crypto.randomBytes(5).toString('hex');
    return '0' + crypto.randomBytes(20).toString('ascii');
}

const generateEmail = (flag) => {
    if (flag) return 'U' + crypto.randomBytes(10).toString('hex') + '@gmail.com';
    return crypto.randomBytes(20).toString('ascii');
}

const generatePassword= (flag) => {
    if (flag) return crypto.randomBytes(10).toString('ascii');
    return crypto.randomBytes(7).toString('ascii');
}

const request = async (url, method, data, token) => {
    const methods = ['get', 'post', 'delete', 'put'];
    if(!methods.some(met => met === method)) return 'method dont exists';
    

    try{
        const response = await axios({
            url: url,
            headers: { Authorization: token || '' },
            method: method,
            validateStatus: false,
            data: data
        });
        return response;
    }catch(error){
        return error;
    }
}

const url = 'http://127.0.0.1:3000/user/';
const user = (flag) => { 
    return {
        name: generateName(flag),
        email: generateEmail(flag),
        password: generatePassword(flag)
    };
};

const login = (flag) => {
    return {
        email: generateEmail(flag),
        password: generatePassword(flag)
    }
}


test('Should create user', async () => {
    const data = user(true);
    const response = await request(url, 'post', data);
    expect(response.status).toBe(201);
    console.log(response.data);
});

test('Should not create user', async () => {
    const data = user(false);
    const response = await request(url, 'post', data);
    expect(response.status).toBe(400);
    console.log(response.data);
});

test('Should get user', async () => {
    const response = await request(url+'1', 'get');
    expect(response.status).toBe(200);
    console.log(response.data);
});

test('Should not get user', async () => {
    const response = await request(url+'ç', 'get');
    expect(response.status).toBe(404);
    console.log(response.data);
});

test('Should login user', async() => {
    const data = user(true);
    const created = await request(url, 'post', data);
    const body = {
        email: created.data[0].email,
        password: data.password
    }
    const response = await request(url+'login', 'post', body);
    expect(created.status).toBe(201);
    expect(response.status).toBe(200);
    console.log(response.data)
});

test('Should not login user', async() => {
    const data = login(false);
    const response = await request(url+'login', 'post', data);
    expect(response.status).toBe(400);
    console.log(response.data);
});

test('Should update user name', async() => {
    const data = user(true);
    const created = await request(url, 'post', data);

    const body = {
        email: created.data['0'].email,
        password: data.password
    }

    const login = await request(url+'login', 'post', body);
    const response = await request(url+'?name='+generateName(true), 'put', '' , login.headers.authorization);
    expect(created.status).toBe(201);
    expect(login.status).toBe(200);
    expect(response.status).toBe(200);
    console.log(response.data)
});

test('Should not update user name', async() => {
    const data = user(true);
    const created = await request(url, 'post', data);

    const body = {
        email: created.data['0'].email,
        password: data.password
    }

    const login = await request(url+'login', 'post', body);
    const response = await request(url+'?name='+generateName(true), 'put', '' , login.headers.authorization+'some');
    expect(created.status).toBe(201);
    expect(login.status).toBe(200);
    expect(response.status).toBe(400);
    console.log(response.data)
});

test('Should delete user', async () => {
    const data = user(true);
    const created = await request(url, 'post', data);

    const body = {
        email: created.data['0'].email,
        password: data.password
    }

    const login = await request(url+'login', 'post', body);
    const response = await request(url, 'delete', '' , login.headers.authorization);
    expect(created.status).toBe(201);
    expect(login.status).toBe(200);
    expect(response.status).toBe(200);
    console.log(response.data)
});

test('Should not delete user', async () => {
    const data = user(true);
    const created = await request(url, 'post', data);

    const body = {
        email: created.data['0'].email,
        password: data.password
    }

    const login = await request(url+'login', 'post', body);
    const response = await request(url, 'delete', '' , login.headers.authorization+'some');
    expect(created.status).toBe(201);
    expect(login.status).toBe(200);
    expect(response.status).toBe(400);
    console.log(response.data)
});
