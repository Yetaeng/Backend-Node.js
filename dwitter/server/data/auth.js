let users = [{
    uid: '1',
    username: 'yetaeng',
    password: '$2b$10$3zjoINsvis56SvB.GfgMTemSiJDXHVbtSvdMXNceZ16LEdiRZQXmy',
    name: 'Yetaeng',
    email: 'yetaeng20@gmail.com',
    url: 'https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png'
}];

export async function findUserByUsername(username) {
    const found = users.find(user => user.username === username);
    console.log("data findUserByUsername - ", found);
    return users.find(user => user.username === username);
}

export async function findUserById(id) {
    return users.find(user => user.uid === id);
}

export async function createUser(user) {
    const newUser = {
        ...user,
        uid: user.length + 1//new Date().toString()
    }
    users.push(newUser);

    return newUser.uid;
}