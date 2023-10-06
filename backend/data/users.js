import bcrypt from 'bcryptjs'
const users=[
    {
        name:'Admin user',
        email:'admin@email.com',
        password:bcrypt.hashSync('1234567',10),
        isAdmin:true
    },
    {
        name:'Adam',
        email:'adam@email.com',
        password:bcrypt.hashSync('1234567',10),
        isAdmin:false
    },
     {
        name:'sam',
        email:'sam@email.com',
        password:bcrypt.hashSync('1234567',10),
        isAdmin:false
    }
]
export default users