import User from "../models/User";

export const getAllUsers = async () => {
  try {
    const users = await User.findAll();
    return users;
  } catch (error) {
    throw new Error(`Error fetching users: ${error.message}`);
  }
};

export const getUserByCode = async (code: number) => {
  try {
    const user = await User.findOne({
      where: { code },
      attributes: ["idUser", "firstName", "lastName", "dni", "code"],
    });
    if (!user) {
      throw new Error(`User with ID ${code} not found`);
    }
    return user;
  } catch (error) {
    throw new Error(`Error fetching user: ${error.message}`);
  }
};
