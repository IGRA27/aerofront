import React, { useState } from "react";
import config from "../../config/index.json";

interface IProps {
  passengersInfo: any;
  setPassengersInfo: any;
  title: any;
  index: number;
}

const BackPackManager = ({
  passengersInfo,
  setPassengersInfo,
  title,
  index,
}: IProps) => {
  const [backpack, setBackpack] = useState(1);

  const handleInteraction = (action: string) => {
    if (action === "increase") {
      if (backpack !== 3) {
        setBackpack(backpack + 1);
        const updateBackpack: any = { ...passengersInfo };
        updateBackpack[title][index] = {
          ...updateBackpack[title][index],
          backpack: backpack + 1,
        };
        setPassengersInfo(updateBackpack);
      }
    } else {
      if (backpack > 1) {
        setBackpack(backpack - 1);
        const updateBackpack: any = { ...passengersInfo };
        updateBackpack[title][index] = {
          ...updateBackpack[title][index],
          backpack: backpack - 1,
        };
        setPassengersInfo(updateBackpack);
      }
    }
  };

  return (
    <div className="my-9 flex items-center">
      <img
        src={config.other.svgBackpack}
        width={50}
        height={50}
        alt="Backpack"
      />
      <p className="font-bold text-xl">BACKPACKS</p>
      <img
        className={`ml-6 ${
          backpack === 1 ? " cursor-not-allowed" : "cursor-pointer"
        }`}
        src={config.other.svgLess}
        width={30}
        height={30}
        alt="Less"
        onClick={() => {
          handleInteraction("decrease");
        }}
      />
      <p className="text-xl mx-4"> {backpack} </p>
      <img
        className={`mr-6 ${
          backpack === 3 ? "cursor-not-allowed" : "cursor-pointer"
        }`}
        src={config.other.svgPlus}
        width={30}
        height={30}
        alt="Plus"
        onClick={() => {
          handleInteraction("increase");
        }}
      />
      <p className="text-xl">
        <b>Charge: $</b> {backpack * 10}
      </p>
    </div>
  );
};

export default BackPackManager;
