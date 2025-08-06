export interface DashboardStats {
  activeOrders: number;
  materialsInStock: number;
  weeklyKilos: {
    value: number;
    weekRange: string;
    percentageChange: number;
    dailyAverage?: number;
    activeDays?: number;
  };
  monthlyKilos: {
    value: number;
    month: string;
    year: number;
    percentageChange: number;
    dailyAverage?: number;
    monthlyGoal?: number;
  };
}

export interface ProductionSummary {
  weekly?: {
    totalKilos: number;
    weekRange: string;
    percentageChange: number;
    dailyAverage: number;
    activeDays: number;
    previousWeekKilos: number;
  };
  monthly?: {
    totalKilos: number;
    month: string;
    year: number;
    percentageChange: number;
    dailyAverage: number;
    monthlyGoal: number;
    previousMonthKilos: number;
    progressPercentage: number;
  };
}

export interface RecentActivity {
  id: number;
  type:
    | "order"
    | "material"
    | "dispatch"
    | "order-completed"
    | "inventory"
    | "weighing";
  message: string;
  timestamp: string;
  timeAgo: string;
  icon: string;
  color: string;
  metadata?: {
    orderId?: number;
    ppe?: number;
    kilos?: number;
    batchNumber?: string;
  };
}

export interface SystemStatus {
  dataBase: {
    // Cambiado de 'database' a 'dataBase' para coincidir con el backend
    status: "online" | "offline" | "warning";
    message: string;
  };
  server: {
    status: "online" | "offline" | "warning";
    message: string;
    cpuUsage?: number;
    memoryUsage?: number;
  };
  network: {
    status: "online" | "offline" | "warning";
    message: string;
    latency?: number;
  };
  storage: {
    status: "online" | "offline" | "warning";
    message: string;
    usagePercentage?: number;
  };
}

export interface QuickReports {
  dailyReport: {
    available: boolean;
    lastGenerated: string;
    recordCount: number;
  };
  weeklyProduction: {
    available: boolean;
    lastGenerated: string;
    totalKilos: number;
  };
  inventoryStatus: {
    available: boolean;
    lastGenerated: string;
    lowStockItems: number;
  };
  pendingDispatches: {
    available: boolean;
    count: number;
    urgentCount: number;
  };
}

// Tipo principal que agrupa todos los datos del dashboard
export interface DashboardData {
  stats: DashboardStats;
  production?: ProductionSummary | {}; // Puede venir vacío como objeto
  recentActivities?: RecentActivity[]; // Puede venir como array vacío
  systemStatus: SystemStatus;
  quickReports?: QuickReports;
  lastUpdated?: string;
  serverTime?: string;
}

// Tipo para la respuesta exacta de la API del backend
export interface DashboardApiResponse {
  success: boolean;
  data: DashboardData;
  message?: string;
  timestamp: string;
}
