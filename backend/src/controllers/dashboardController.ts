import { Request, Response } from "express";
import orderServices from "../services/orderServices";
import finishedProductServices from "../services/finishedProductServices";
import weightServices from "../services/weightServices";
import {
  getCurrentMonthName,
  getCurrentWeekRangeString,
  getCurrentYear,
} from "../utils/date.utils";
import systemStatusServices from "../services/systemStatusServices";

export const getDashboardData = async (req: Request, res: Response) => {
  try {
    const dashboardData = {
      stats: {
        activeOrders: await orderServices.getTotalActiveOrders(),
        materialsInStock:
          await finishedProductServices.getCountFinishedProducts(),
        weeklyKilos: {
          value: await weightServices.getWeeklyNetWeightSum(),
          weekRange: getCurrentWeekRangeString(),
          percentageChange: 12.5,
        },
        monthlyKilos: {
          value: await weightServices.getMonthlyNetWeightSum(),
          month: getCurrentMonthName(),
          year: getCurrentYear(),
          percentageChange: 8.3,
        },
      },
      production: {},
      recentActivities: [],
      systemStatus: {
        dataBase: await systemStatusServices.checkDatabaseStatus(),
        server: await systemStatusServices.getServerStatus(),
        network: await systemStatusServices.getNetworkStatus(),
        storage: await systemStatusServices.getStorageStatus(),
      },
    };

    res.status(200).json({
      success: true,
      data: dashboardData,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching dashboard data",
    });
  }
};
