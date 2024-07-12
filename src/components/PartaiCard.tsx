import { Chip, Image, Spinner } from "@nextui-org/react";
import { CheckCircle } from "lucide-react";
import React from "react";

const PartaiCard = ({
  src,
  color,
  name,
  number,
  onClick,
  status = true,
}: any) => {
  return (
    <>
      <button
        className="bg-white text-white rounded-tr-xl   relative group"
        onClick={() => onClick(name)}
      >
        <div className="absolute right-0 -top-1 z-[10] ">
          {/* {status ? (
            <Chip color="success" size="sm">
              {" "}
              <CheckCircle className="w-5 h-4  text-white" />
            </Chip>
          ) : (
            <Chip color="warning" size="sm">
              {" "}
              <Spinner color="default" className="w-3 py-1" size="sm" />
            </Chip>
          )} */}
        </div>
        <div className="group-hover:absolute inset-0 z-[5] bg-white/50 rounded-t-xl"></div>
        <div className="absolute -top-1 -left-1 z-[10]">
          <div
            style={{
              backgroundColor: color,
            }}
            className=" rounded-xl px-2 text-xs py-1"
          >
            {number}
          </div>
        </div>
        <div className="px-1 pt-5 flex justify-center">
          <Image
            isBlurred
            className="w-20 h-20 object-scale-down"
            src={src}
            alt={name}
          />
        </div>

        <div
          style={{
            backgroundColor: color,
          }}
          className=" px-2 py-1 mt-5 text-xs font-semibold"
        >
          {name}
        </div>
      </button>
    </>
  );
};

export default PartaiCard;
