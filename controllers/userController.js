const User = require("./../models/userModel");

const getAllUser = async (req, res) => {
  const users = await User.find();
  res.status(200).json({
    status: "Success",
    result: users.length,
    data: {
      users,
    },
  });
};

const createUser = async (req, res) => {
  const user = await User.create(req.body);
  res.status(200).json({
    status: "Success",
    user,
  });
};
// instances :

module.exports = { getAllUser, createUser };
