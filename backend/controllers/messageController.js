const getMessages = (req, res) => {
    res.json([{ from: "user1", to: "user2", content: "Hello" }]);
};

const postMessage = (req, res) => {
    const { from, to, content } = req.body;
    res.status(201).json({ from, to, content });
};

module.exports = { getMessages, postMessage };