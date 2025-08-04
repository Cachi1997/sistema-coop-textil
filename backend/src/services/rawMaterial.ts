import RawMaterial from "../models/RawMaterial";

const getAllRawMaterials = async () => {
  try {
    const rawMaterials = await RawMaterial.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    return rawMaterials;
  } catch (error) {
    throw new Error(`Error fetching raw materials: ${error.message}`);
  }
};

export default {
  getAllRawMaterials,
};
