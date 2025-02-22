import { PropsWithChildren } from "react";
import { Message } from "../context/types";

interface Badge {
  id: number;
  title: string;
  description: string | number;
}

interface CardProps extends PropsWithChildren {
  badge: Badge;
  badgeIcon: string;
  loading: boolean;
  message: Message;
}

function BadgeCard({ badge, badgeIcon, loading, message, ...props }: CardProps) {
  if (loading) {
    return (
      <div className="p-6  bg-white flex items-center justify-center gap-10 w-full h-40" {...props}>
        <p className="text-gray-500 animate-pulse">Loading...</p>
      </div>
    );
  }

  if (!message.success && message.message) {
    return (
      <div className="p-6  bg-white flex items-center justify-center gap-10 w-full h-40" {...props}>
        <p className="text-sm font-medium text-red-600">{message.message}</p>
      </div>
    );
  }

  return (
    <div className="p-6  bg-white flex items-center justify-center gap-10 w-full h-40" {...props}>
      <span className={`text-4xl rounded-full h-16 w-16 flex items-center justify-center`}>{badgeIcon}</span>
      <div className="text-right">
        <p className={`text-2xl font-bold`}>{badge.title}</p>
        <p className="boldtext-sm font-medium">{badge.description}</p>
      </div>
    </div>
  );
}

export default BadgeCard;
