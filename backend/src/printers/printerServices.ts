import * as fs from "fs";

export const imprimirEnUSB = (
  comandoSBPL: string,
  pathUSB: string = "/dev/usb/lp0"
) => {
  return new Promise<void>((resolve, reject) => {
    fs.writeFile(pathUSB, comandoSBPL, "binary", (err) => {
      if (err) {
        console.error("Error al imprimir:", err);
        return reject(err);
      }
      console.log("Etiqueta enviada a la impresora.");
      resolve();
    });
  });
};
