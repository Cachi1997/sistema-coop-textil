import Tone from "../models/Tone";

const getAllTones = async () => {
  try {
    const tones = await Tone.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    return tones;
  } catch (error) {
    throw new Error(`Error fetching tones: ${error.message}`);
  }
};

export default {
  getAllTones,
};
