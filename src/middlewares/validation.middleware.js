const validator = (schema) => {
    return (req, res, next) => {
        let result = schema.safeParse(req.body);
        if (result?.error) {
            return res.status(400).json({ status: false, errors: result.error.format() });
        }
        next();
    }
}

module.exports = validator;