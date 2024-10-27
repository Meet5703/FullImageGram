import User from "../models/User.js";

export const createUserRepo = async ({ name, email, password }) => {
  const user = await User.create({ name, email, password });
  return user;
};

export const getUserByIdRepo = async (id) => {
  const user = await User.findById(id);
  return user;
};

export const getUserByEmailRepo = async (email) => {
  const user = await User.findOne({ email });
  return user;
};

export const getAllUsersRepo = async (limit, offset) => {
  const totalPagesCalc = Math.ceil(
    (await User.countDocuments()) / Number(limit)
  );
  const users = await User.find().skip(offset).limit(limit);
  return { totalPages: totalPagesCalc, users };
};

export const updateUserByIdRepo = async ({ id, userObject }) => {
  const user = await User.findByIdAndUpdate(id, userObject, { new: true });
  return user;
};
export const deleteUserByIdRepo = async (id) => {
  const user = await User.findByIdAndDelete(id);
  return user;
};

