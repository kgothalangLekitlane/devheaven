const getResources = (req, res) => {
    res.json([{ id: 1, title: "Resource A" }, { id: 2, title: "Resource B" }]);
};

module.exports = { getResources };