import jwt from 'jsonwebtoken'
const generateToken=(res,userId)=>{
    console.log('this is jwt usr id '+ userId);
const token= jwt.sign({ userId}, process.env.JWT_SECRET, { expiresIn:'30d' });
console.log( `jwt ${token}`);
res.cookie('jwt', token,{
    httpOnly:true,
    secure:process.env.NODE_ENV!=='development',
    sameSite:'strict',
    maxAge: 30 * 24 * 60 * 60 * 1000,

})

}
export default generateToken