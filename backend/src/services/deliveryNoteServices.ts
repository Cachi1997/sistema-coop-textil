import DeliveryNote from "../models/DeliveryNote";
import Section from "../models/Section";
import materialReceiptsServices from "./materialReceiptsServices";

const generateDeliveryNote = async (
  materialReceiptIds: number[],
  truck: string,
  clientId: number,
  sectionId: number
) => {
  try {
    const totalKilos = await materialReceiptsServices.sumBaleKilosByIds(
      materialReceiptIds
    );

    const section = await Section.findByPk(sectionId);
    if (!section) {
      throw new Error("La sección no existe");
    }

    const noteData: any = {
      truck,
      date: new Date().toISOString().split("T")[0],
      weight: totalKilos,
      remainingWeight: totalKilos,
      sale: false,
      clientId,
      sectionId,
    };

    const nextNumber = await getNextDeliveryNoteNumber(sectionId);

    // 6. Decidir en qué columna guardar el número
    if (section.name.toLowerCase() === "hilanderia") {
      noteData.spinningDeliveryNoteNumber = nextNumber;
    } else {
      noteData.deliveryNoteNumber = nextNumber;
    }

    // 7. Crear el DeliveryNote
    const newDeliveryNote = await DeliveryNote.create(noteData);

    await materialReceiptsServices.updateDeliveryNoteFields(
      materialReceiptIds,
      newDeliveryNote.deliveryNoteNumber
    );

    return newDeliveryNote;
  } catch (error) {
    console.error("Error al generar remito:", error);
    throw error;
  }
};

/**
 * Obtiene el próximo número de remito según el tipo de sección.
 * @param sectionId ID de la sección
 * @returns próximo número de remito
 */
const getNextDeliveryNoteNumber = async (
  sectionId: number
): Promise<number> => {
  const section = await Section.findByPk(sectionId);

  if (!section) {
    throw new Error("La sección no existe");
  }

  if (section.name.toLowerCase() === "hilanderia") {
    const lastNumber = (await DeliveryNote.max("spinningDeliveryNoteNumber", {
      where: { sectionId },
    })) as number | null;

    return (lastNumber ?? 0) + 1;
  }

  const lastNumber = (await DeliveryNote.max("deliveryNoteNumber", {
    where: { sectionId },
  })) as number | null;

  return (lastNumber ?? 0) + 1;
};

export default {
  generateDeliveryNote,
};
