"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { getTimeAgo } from "../../../lib/utils/helpers";

// --------------------------
// Types
// --------------------------
type NotificationItem = {
  id: number;
  message: string;
  timestamp: string;
  type: string;
  isRead: boolean;
  //   actionUrl: string | null;
};

// --------------------------
// Mock Data
// --------------------------
export const mockNotifications: NotificationItem[] = [
  {
    id: 1,
    message:
      "An invoice with invoice number INV-001 was successfully created. The invoice has been sent to the client and is awaiting payment. You can view the full details in the invoices section.",
    timestamp: "2025-12-08T10:30:00Z",
    type: "invoice",
    isRead: false,
  },
  {
    id: 2,
    message:
      "Payment of $2,500 has been received for invoice INV-098. The transaction has been processed successfully and your account has been credited.",
    timestamp: "2024-12-08T08:15:00Z",
    type: "payment",
    isRead: true,
  },
  {
    id: 3,
    message:
      "Your subscription will expire in 7 days. Please renew your subscription to continue enjoying uninterrupted service and access to all premium features.",
    timestamp: "2024-12-07T16:45:00Z",
    type: "subscription",
    isRead: false,
  },
  {
    id: 4,
    message:
      "New message from John Doe: Hi, I wanted to discuss the project timeline. Can we schedule a meeting this week?",
    timestamp: "2024-12-07T14:20:00Z",
    type: "message",
    isRead: true,
  },
  {
    id: 5,
    message:
      "System maintenance scheduled for December 15th, 2024 from 2:00 AM to 4:00 AM EST. During this time, some services may be temporarily unavailable.",
    timestamp: "2024-12-06T09:00:00Z",
    type: "system",
    isRead: false,
  },
];

// --------------------------
// Notification Card
// --------------------------
const NotificationCard = ({
  notification,
  onMarkAsRead,
}: {
  notification: NotificationItem;
  onMarkAsRead: (id: number) => void;
}) => {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);

  const MAX_LENGTH = 120;
  const shouldTruncate = notification.message.length > MAX_LENGTH;

  const message = isExpanded
    ? notification.message
    : shouldTruncate
    ? notification.message.substring(0, MAX_LENGTH) + "..."
    : notification.message;

  const handleView = () => {
    if (!notification.isRead) onMarkAsRead(notification.id);
    // if (notification.actionUrl) router.push(notification.actionUrl);
  };

  return (
    <Card
      className={`p-4 rounded-[5px] transition-colors md:p-6 ${
        notification.isRead
          ? "bg-white border border-primary-20"
          : "bg-primary-20"
      }`}
    >
      <CardContent className="text-sm sm:text-base lg:text-lg p-0">
        <div className="flex items-start gap-2 mb-2">
          <p className="flex-1">{message}</p>
        </div>

        {shouldTruncate && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-primary-500 text-xs sm:text-sm font-medium hover:text-primary-400 transition duration-150 cursor-pointer"
          >
            {isExpanded ? "Read Less" : "Read More"}
          </button>
        )}
      </CardContent>

      <CardFooter className="flex justify-between items-center text-xs sm:text-base p-0 mt-4">
        <span className="text-neutral-900 sm:text-sm">
          {getTimeAgo(notification.timestamp)}
        </span>

        {/* {notification.actionUrl && ( */}
        <button
          onClick={handleView}
          className={` bg-primary-20 hover:bg-primary-400 duration-150 cursor-pointer px-3 py-1 rounded-[3px] text-primary-500 font-medium transition hover:text-white  ${
            notification.isRead ? "bg-white" : "border border-primary-50"
          } `}
        >
          {notification.isRead ? "Viewed" : "View"}
        </button>
        {/* )} */}
      </CardFooter>
    </Card>
  );
};

// --------------------------
// Notification List
// --------------------------
const NotificationList = () => {
  const [notifications, setNotifications] =
    useState<NotificationItem[]>(mockNotifications);

  //   const unreadCount = notifications.filter((n) => !n.isRead).length;

  const handleMarkAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  };

  //   const markAllAsRead = () => {
  //     setNotifications((prev) =>
  //       prev.map((notif) => ({ ...notif, isRead: true }))
  //     );
  //   };

  return (
    <div className="max-w-[1000px] mx-auto">
      {/* Notification Cards */}
      <div className="space-y-3 md:space-y-6">
        {notifications.map((notification) => (
          <NotificationCard
            key={notification.id}
            notification={notification}
            onMarkAsRead={handleMarkAsRead}
          />
        ))}
      </div>

      {/* Empty State */}
      {notifications.length === 0 && (
        <div className="text-center py-12 text-neutral-500">
          <p className="text-lg">No notifications yet</p>
          <p className="text-sm mt-2">
            We'll notify you when something important happens
          </p>
        </div>
      )}
    </div>
  );
};

export default NotificationList;
