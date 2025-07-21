const getRecruiters = (req, res) => {
    res.json([{ id: 1, name: "Recruiter A" }, { id: 2, name: "Recruiter B" }]);
};

module.exports = { getRecruiters };