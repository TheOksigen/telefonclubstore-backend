const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const { z } = require('zod');
const prisma = new PrismaClient();

const loginSchema = z.object({
    login: z.string()
        .min(3, { message: 'Login must be at least 3 characters long' })
        .max(20, { message: 'Login must be less than 255 characters' })
        .trim()
        .min(1, { message: 'Login is required' }),
    password: z.string()
        .min(8, { message: 'Password must be at least 8 characters long' })
        .trim()
        .min(1, { message: 'Password is required' })
})

const login = async (req, res) => {
    const parseResult = loginSchema.safeParse(req.body);
    if (!parseResult.success) {
        return res.status(400).json({ errors: parseResult.error.format() });
    }
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

        const token = jwt.sign({ userid: existingUser.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ token, status: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = login; 
