import Client from "../models/Client";

const getAllClients = async () => {
  try {
    const clients = await Client.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    return clients;
  } catch (error) {
    throw new Error(`Error fetching clients: ${error.message}`);
  }
};

export default {
  getAllClients,
};
