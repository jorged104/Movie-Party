const users = [];

const adduser = ({id, name }) => {
    name = name.trim().toLowerCase();
    const exist = users.find( (user)=> user === name );
    if(exist) return { error: 'User is taken'};

    const user = { id , name};

    user.push(user);

    return{ user };
}

const removeUser = (id) => {
    const index = users.findIndex((user) => user.id == id);
    if(index !== -1) return users.slice(index,1)[0];
}

module.exports = { adduser , removeUser}
