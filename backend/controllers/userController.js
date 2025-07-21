const getUsers = (req, res) => {
    res.json([{ id: 1, name: "User A" }, { id: 2, name: "User B" }]);
};

module.exports = { getUsers };