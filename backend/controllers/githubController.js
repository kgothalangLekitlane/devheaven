const User = require("../models/User");
const { getGithubProfile } = require("../services/githubService");

const extractGithubUsername = (value) => {
  const raw = String(value || "").trim();
  if (!raw) return "";
  const candidate = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
  try {
    const url = new URL(candidate);
    if (!/^(.+\.)?github\.com$/i.test(url.hostname)) return "";
    const parts = url.pathname.split("/").filter(Boolean);
    if (parts.length !== 1 || !/^[A-Za-z0-9-]{1,39}$/.test(parts[0])) return "";
    return parts[0];
  } catch {
    return "";
  }
};

const getIdentity = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("socialLinks");
    const username = extractGithubUsername(user?.socialLinks?.github);
    if (!username) return res.status(400).json({ message: "Add a valid GitHub profile URL to your profile first" });
    const data = await getGithubProfile(username);
    res.json(data);
  } catch (error) {
    console.error("GitHub identity error:", error);
    res.status(error.status || 500).json({ message: error.message || "Unable to load GitHub profile" });
  }
};

const getPublicIdentity = async (req, res) => {
  try {
    const data = await getGithubProfile(req.params.username);
    res.json(data);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message || "Unable to load GitHub profile" });
  }
};

module.exports = { getIdentity, getPublicIdentity };
