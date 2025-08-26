import PPE from "../models/PPE";

const getLastPPE = async () => {
  try {
    const currentYear = new Date().getFullYear();

    const lastPPE = await PPE.findOne({
      where: { period: currentYear },
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });

    return lastPPE;
  } catch (error) {
    console.error("❌ Error fetching last PPE:", error);
    throw error;
  }
};

const updatePPE = async (): Promise<void> => {
  try {
    const currentYear = new Date().getFullYear();
    const currentPPE = await PPE.findOne({
      where: { period: currentYear },
    });

    if (!currentPPE) {
      throw new Error("No PPE found for the current year");
    }

    currentPPE.ppe += 1;
    await currentPPE.save();
  } catch (error) {
    console.error("❌ Error updating PPE:", error);
    throw new Error(`Error updating PPE: ${error.message}`);
  }
};

export default {
  getLastPPE,
  updatePPE,
};
