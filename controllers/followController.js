const { Follow } = require("../models");

exports.followUser = async (req, res) => {
  try {
    const followerId = req.user.id;
    const { followUserId } = req.body;

    if (followerId === followUserId) {
      return res.status(400).json({ message: "You can't follow yourself!" });
    }

    const [follow, created] = await Follow.findOrCreate({
      where: { followerId, followingId: followUserId },
    });

    if (!created) {
      return res.status(200).json({ message: "Already following this user" });
    }

    res.status(201).json({ message: "Now following user" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
