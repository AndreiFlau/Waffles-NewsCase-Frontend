import { PropsWithChildren } from "react";
import { Message } from "../context/types";

interface Stat {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  bgColor: string;
  textColor: string;
}

interface StatCardProps extends PropsWithChildren {
  stat: Stat;
  loading: boolean;
  message: Message;
}

function StatCard({ stat, loading, message, ...props }: StatCardProps) {
  if (loading) {
    return (
      <div className="p-6 rounded-lg shadow-lg bg-white flex items-center justify-center gap-10 w-full h-40" {...props}>
        <p className="text-gray-500 animate-pulse">Carregando...</p>
      </div>
    );
  }

  if (!message.success && message.message) {
    return (
      <div className="p-6 rounded-lg shadow-lg bg-white flex items-center justify-center gap-10 w-full h-40" {...props}>
        <p className="text-sm font-medium text-red-600">{message.message}</p>
      </div>
    );
  }

  return (
    <div className="p-6 rounded-lg shadow-lg bg-white flex items-center justify-center gap-10 w-full h-40" {...props}>
      <span className={`text-2xl ${stat.textColor} ${stat.bgColor} rounded-full h-16 w-16 flex items-center justify-center`}>
        {stat.icon}
      </span>
      <div className="text-right">
        <p className={`text-sm font-medium ${stat.textColor}`}>{stat.title}</p>
        <p className="text-2xl font-bold">{stat.value}</p>
      </div>
    </div>
  );
}

export default StatCard;
