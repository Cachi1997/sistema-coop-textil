import { useState } from "react";

interface NotificationModalState {
  isOpen: boolean;
  title: string;
  message: string;
  type: "success" | "error" | "info";
  duration?: number;
}

export const useNotificationModal = () => {
  const [notification, setNotification] = useState<NotificationModalState>({
    isOpen: false,
    title: "",
    message: "",
    type: "info", // Default type
  });

  const showNotification = (
    title: string,
    message: string,
    type: "success" | "error" | "info" = "info",
    duration?: number
  ) => {
    setNotification({
      isOpen: true,
      title,
      message,
      type,
      duration,
    });
  };

  const closeNotification = () => {
    setNotification((prev) => ({ ...prev, isOpen: false }));
  };

  return {
    notification,
    showNotification,
    closeNotification,
  };
};
