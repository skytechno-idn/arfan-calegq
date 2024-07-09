import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Avatar, Card, CardBody, Chip, Image } from "@nextui-org/react";
const ChartRace = dynamic(() => import("react-chart-race"), { ssr: false });

const LiveCountPage = () => {
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    const handleChange = () => {
      const newData = Array.from({ length: 20 }, (_, id) => ({
        id,
        title: getRandomName(),
        value: getRandomInt(10, 900),
        color: getRandomColor(),
      }));
      setData(newData);
    };

    handleChange();
    const interval = setInterval(() => {
      handleChange();
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const getRandomName = () => {
    const names = [
      '| Ayfonkarahisar Kasiar Romaawwie',
      '| Kayseri',
      '| Muğla',
      '| Uşak',
      '| Sivas',
      '| Konya',
      '| Ankara',
      '| Istanbul',
      '| Bursa',
      '| Izmir',
      '| Antalya',
      '| Adana',
      '| Trabzon',
      '| Erzurum',
      '| Van',
      '| Diyarbakir',
      '| Gaziantep',
      '| Mersin',
      '| Samsun',
      '| Malatya',
    ];
    return names[Math.floor(Math.random() * names.length)];
  };
  return (
    <div>
      <div className="grid grid-cols-1 gap-4">
        <Card>
          <CardBody>
            <ChartRace
              data={data as any}
              backgroundColor="transparent"
              // width={760}
              padding={0}
              itemHeight={20}
              gap={10}
              titleStyle={{ font: "normal 700 15px Arial", color: "#000" }}
              valueStyle={{
                font: "normal 600 15px  Arial",
                color: "#888",
              }}
            />
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default LiveCountPage;
