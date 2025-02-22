import { PropsWithChildren } from "react";
import { Message } from "../context/types";

interface Rank {
  icon?: string;
  message?: string;
  bgColor: string;
  textColor: string;
  textColor2: string;
  textColor3: string;
}

interface StatCardProps extends PropsWithChildren {
  rank: Rank;
  streak: number;
  spot: number;
  email: string;
  loading: boolean;
  message: Message;
}

function RankDiv({ rank, streak, spot, email, loading, message, ...props }: StatCardProps) {
  if (loading) {
    return (
      <div
        className="p-6 rounded-lg shadow-md bg-gray-50 flex items-center justify-center transition-all duration-300"
        {...props}
      >
        <p className="text-gray-500 animate-pulse">Loading...</p>
      </div>
    );
  }

  if (!message.success && message.message) {
    return (
      <div className="p-6 rounded-lg shadow-md bg-red-50 flex items-center justify-center transition-all duration-300" {...props}>
        <p className="text-sm font-medium text-red-600">{message.message}</p>
      </div>
    );
  }

  return (
    <div className={`flex items-center justify-between p-2 ${rank.bgColor} rounded-lg`}>
      <span className={`text-lg font-bold ${rank.textColor}`}>{[1, 2, 3].includes(spot) ? rank.icon : spot}</span>
      <span className={`${rank.textColor2}`}>{email}</span>
      <span className={`${rank.textColor3}`}>{streak} dias</span>
    </div>
  );
}

export default RankDiv;
