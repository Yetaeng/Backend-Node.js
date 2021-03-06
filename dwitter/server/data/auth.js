let users = [{
    uid: '1',
    username: 'yetaeng',
    password: '$2b$10$3zjoINsvis56SvB.GfgMTemSiJDXHVbtSvdMXNceZ16LEdiRZQXmy',
    name: 'Yetaeng',
    email: 'yetaeng20@gmail.com',
    url: ''
}];

export async function findUserByUsername(username) {
    return users.find(user => user.username === username);
}

export async function findUserById(id) {
    return users.find(user => user.uid === id);
}

export async function createUser(user) {
    const newUser = {
        ...user,
        uid: users.length + 1 // new Date().toString()
    }
    users.push(newUser);

    return newUser.uid;
}