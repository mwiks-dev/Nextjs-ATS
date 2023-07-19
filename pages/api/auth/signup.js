import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';

async function signup(req, res) {
    //Only POST mothod is accepted
    if (req.method === 'POST') {
        //Getting email and password from body
        const { name, email, password } = req.body;

        // Hash password
        const saltRounds = 10;
        const hashed_pass = await bcrypt.hash(password, saltRounds);

        try{
            const newUser = await prisma.users.create({
                data:{name,email,hashed_pass},
            });
            console.log(newUser)
            return res.status(200).json({ message: 'User created successfully'});
        }catch (error) {
            console.error(error)        
        }
    } 
        //Response for other than POST method
        return res.status(500).json({ message: 'Route not valid' });
}

export default signup;