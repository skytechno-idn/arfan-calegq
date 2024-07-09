import { CalendarClock, DoorClosed, FileTextIcon, Flag, SquareUserRound, User2, Users2 } from "lucide-react";
import React from "react";

const HomePage = () => {
  const statsData = [
    {
      label: "DATA Peserta CALEG",
      value: "19.000",
      bgColor: "bg-primary",
      icon: SquareUserRound,
    },
    {
      label: "DATA TPS",
      value: "19.000",
      bgColor: "bg-warning",
      icon: DoorClosed,
    },
    {
      label: "DATA Partai",
      value: "19.000",
      bgColor: "bg-danger",
      icon: Flag,
    },
    {
      label: "DATA Saksi",
      value: "19.000",
      bgColor: "bg-success",
      icon: User2,
    },

    {
        label: "DATA Kecamatan",
        value: "19.000",
        bgColor: "bg-success",
        icon: FileTextIcon,
      },
      {
        label: "DATA Kelurahan",
        value: "19.000",
        bgColor: "bg-danger",
        icon: FileTextIcon,
      },
      {
        label: "DATA Relawan",
        value: "19.000",
        bgColor: "bg-warning",
        icon: Users2,
      },
      {
        label: "DATA Agenda",
        value: "19.000",
        bgColor: "bg-primary",
        icon: CalendarClock,
      },
  

    
     
  ];
  const StatsGrid = () => {
    return (
      <div className="grid lg:grid-cols-4 grid-cols-1 gap-2">
        {statsData.map((stat, index) => (
          <div
            key={index}
            className={`rounded-lg ${stat.bgColor} p-5 text-white group`}
          >
            <div className="flex justify-between items-center">
              <div>
                <span className="tracking-tighter">{stat.label}</span>
                <div className="text-2xl font-bold font-mono">{stat.value}</div>
              </div>
              <div>
                <stat.icon className="rotate-12 w-12 h-12 group-hover:rotate-0 text-white opacity-20" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };
  return (
    <div>
      <StatsGrid />

    </div>
  );
};

export default HomePage;
