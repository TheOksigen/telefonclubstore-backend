const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const { z } = require('zod');
const prisma = new PrismaClient();

const registerSchema = z.object({
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

const register = async (req, res) => {
    const parseResult = registerSchema.safeParse(req.body);
    if (!parseResult.success) {
        return res.status(400).json({ errors: parseResult.error.format() });
    }
    try {
        const { login, password } = req.body;

        const existingUser = await prisma.user.findUnique({
            where: { login }
        });

        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await prisma.user.create({
            data: {
                login,
                password: hashedPassword
            }
        });

        const token = jwt.sign({ userid: newUser.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = register