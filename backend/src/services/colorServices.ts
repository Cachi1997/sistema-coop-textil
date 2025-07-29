import Color from "../models/Color";

const getAllColors = async () => {
  try {
    const colors = await Color.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    return colors;
  } catch (error) {
    throw new Error(`Error fetching colors: ${error.message}`);
  }
};

export default {
  getAllColors,
};
