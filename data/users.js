import bcrypt from 'bcryptjs';

const users = [
    {
        name: "Super User",
        email: "admin@domain.com",
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    },
    {
        name: "Test User",
        email: "test@domain.com",
        password: bcrypt.hashSync('123456', 10),
        isAdmin: false
    }
]

export default users;