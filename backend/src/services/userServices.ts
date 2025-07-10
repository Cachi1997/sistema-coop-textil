import User from "../models/User";

export const getAllUsers = async () => {
  try {
    const users = await User.findAll();
    return users;
  } catch (error) {
    throw new Error(`Error fetching users: ${error.message}`);
  }
};

export const getUserById = async (id: number) => {
  try {
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error(`User with ID ${id} not found`);
    }
    return user;
  } catch (error) {
    throw new Error(`Error fetching user by ID: ${error.message}`);
  }
};
