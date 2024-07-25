const verifyToken = (req, res) => {
    res.status(200).send({ message: 'Token is valid.', user: req.user });
};

module.exports = verifyToken;
