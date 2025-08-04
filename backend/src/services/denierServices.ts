import { Denier } from "../models/Denier";

const getAllDeniers = async () => {
  try {
    const deniers = await Denier.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    return deniers;
  } catch (error) {
    throw new Error(`Error fetching deniers: ${error.message}`);
  }
};

export default {
  getAllDeniers,
};
