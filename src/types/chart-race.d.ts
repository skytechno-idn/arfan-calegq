
declare module "react-chart-race" {
    import { FC } from "react";
  
    interface ChartRaceData {
      id: number;
      title: string;
      value: number;
      color: string;
    }
  
    interface ChartRaceProps {
      data: ChartRaceData[];
      backgroundColor: string;
      padding: number;
      itemHeight: number;
      gap: number;
      titleStyle: {
        font: string;
        color: string;
      };
      valueStyle: {
        font: string;
        color: string;
      };
    }
  
    const ChartRace: FC<ChartRaceProps>;
  
    export default ChartRace;
  }