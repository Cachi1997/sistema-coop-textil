import db from "../config/db";
import os from "os";
import si from "systeminformation";

const getServerStatus = async () => {
  const load = os.loadavg()[0]; // Promedio de carga 1 min
  const cpus = os.cpus().length;
  const loadPerCpu = load / cpus;

  const totalMem = os.totalmem();
  const freeMem = os.freemem();
  const usedMem = totalMem - freeMem;
  const memoryUsage = Number(((usedMem / totalMem) * 100).toFixed(2));

  let status: "online" | "warning" | "offline" = "online";
  let message = "Servidor estable";

  if (loadPerCpu < 0.7) {
    status = "online";
  } else if (loadPerCpu < 1) {
    status = "warning";
    message = "Alta carga del CPU";
  } else {
    status = "offline";
    message = "Carga del servidor crítica";
  }

  return {
    status,
    message,
    cpuUsage: Number((loadPerCpu * 100).toFixed(2)),
    memoryUsage,
  };
};

const checkDatabaseStatus = async () => {
  try {
    await db.authenticate();
    return {
      status: "online",
      message: "Conexión exitosa con la base de datos",
    };
  } catch (error) {
    return {
      status: "offline",
      message: "No se pudo conectar a la base de datos",
    };
  }
};

const getNetworkStatus = async () => {
  const netStats = await si.networkStats();
  const tx = netStats[0].tx_sec;
  const rx = netStats[0].rx_sec;
  const total = tx + rx;

  let status: "online" | "warning" | "offline" = "online";
  let message = "Tráfico de red normal";

  if (total < 50000) {
    status = "online";
  } else if (total < 500000) {
    status = "warning";
    message = "Tráfico de red moderado";
  } else {
    status = "offline";
    message = "Tráfico de red elevado";
  }

  // Simular latencia con un valor aleatorio, o medir ping si querés algo real
  const latency = Math.floor(Math.random() * 100); // opcional: medir con ping real

  return {
    status,
    message,
    latency,
  };
};

const getStorageStatus = async () => {
  const disks = await si.fsSize();
  const disk = disks[0];

  const total = disk.size;
  const used = disk.used;
  const free = total - used;

  const percentageUsed = Number(((used / total) * 100).toFixed(2));
  const freeInGB = free / 1e9;

  let status: "online" | "warning" | "offline" = "online";
  let message = "Espacio disponible";

  if (freeInGB > 100) {
    status = "online";
  } else if (freeInGB > 20) {
    status = "warning";
    message = "Espacio libre bajo";
  } else {
    status = "offline";
    message = "Espacio en disco crítico";
  }

  return {
    status,
    message,
    usagePercentage: percentageUsed,
  };
};
export default {
  getServerStatus,
  checkDatabaseStatus,
  getNetworkStatus,
  getStorageStatus,
};
