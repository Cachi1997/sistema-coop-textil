import PPE from "../models/PPE";

const getLastPPE = async () => {
  try {
    const currentYear = new Date().getFullYear();

    const lastPPE = await PPE.findAll({
      where: { period: currentYear },
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });

    return lastPPE;
  } catch (error) {
    console.error("❌ Error fetching last PPE:", error);
    throw error;
  }
};

export default {
  getLastPPE,
};
