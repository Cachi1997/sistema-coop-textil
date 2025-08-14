import Section from "../models/Section";

const getAllSections = async () => {
  try {
    const sections = await Section.findAll({
      attributes: ["id", "name"],
    });
    return sections;
  } catch (error) {
    console.error("Error al buscar las secciones:", error);
    throw new Error("No fue posible obtener las secciones.");
  }
};

export default {
  getAllSections,
};
