let users = [];

export async function findUser(username) {
    return users.find(user => user.username = username);
}

export async function createUser(username, hashed, email, url) {
    const newUser = {
        uid: users.length + 1,
        username: username,
        password: hashed,
        email: email,
        url: url
    }
    users.push(newUser);

    return newUser;
}