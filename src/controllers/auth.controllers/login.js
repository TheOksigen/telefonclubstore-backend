const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


const login = async (req , res) => {
    try {        
        const { login, password } = req.body;
        
        const existingUser = await prisma.user.findUnique({
            where: { login }
        });

        if (!existingUser) {
            return res.status(401).json({ error: 'Invalid login credentials' });
        }

        const validPassword = await bcrypt.compare(password, existingUser.password);
        if (!validPassword) {
            return res.status(401).json({ error: 'Invalid login credentials' });
        }

        const token = jwt.sign({ userid: existingUser.id }, process.env.JWT_SECRET, { expiresIn: '99999999999h' });

        res.status(200).json({ token, status: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = login; 
