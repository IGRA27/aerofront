import React from "react";
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import Link from "next/link";
import config from "../../config/index.json";
// import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import Image from "next/image";
import { useRouter } from "next/router";

interface FlightsProps {
  asientos: any;
  destino: any;
  fecha_regreso: any;
  fecha_salida: any;
  id: number;
  origen: any;
}

interface IProps {
  flight: FlightsProps;
  passengers: any;
}

const CardFligth = ({ flight, passengers }: IProps) => {
  const router = useRouter();
  const handleChooseFlight = () => {
    
    router.push({
      pathname: "/flight-details",
      query: {
        flights: JSON.stringify(flight),
        passengers: JSON.stringify(passengers),
      }, // Convertir a JSON para pasar como query param
    });
  };
  return (
    <div>
      <div className="my-[25px] ">
        <div className="bg-[#ECECEC] w-[100%] flex row p-1 items-center">
          <div className="mr-5">
            <Image
              src={config.other.imgAirplane}
              width={64}
              height={42}
              alt=""
            />
          </div>

          <p className="mx-5">
            {flight.origen.label} ({flight.origen.code})
          </p>
          <Image src={config.other.imgArrow2} width={99} height={13} alt="" />
          <p className="mx-5">
            {flight.destino.label}({flight.destino.code})
          </p>
        </div>
      </div>
      {/* <Link href={"/"}> */}
      <div
        onClick={handleChooseFlight}
        className="my-[25px] flex row  w-[100%] py-5 cursor-pointer"
      >
        <div className="bg-[#FF7100] w-10 flex row p-5 items-center"></div>
        <div className="flex row px-[11rem] justify-between py-[15px] bg-[#FFF8E1] w-[100%]">
          <div className="flex row  ">
            <div className="flex flex-col mx-9">
              <p>{flight.fecha_salida.formattedDate}</p>
              <p>{flight.origen.code}</p>
              <p> {flight.origen.label}</p>
              <p className="text-4xl font-bold">{flight.fecha_salida.time}</p>
            </div>
            <div className="flex flex-col justify-center items-center ">
              <p>{flight.fecha_salida.time}</p>
              <Image
                src={config.other.imgArrow}
                width={310}
                height={28}
                alt=""
              />
            </div>
            <div className="flex flex-col mx-9">
              <p>{flight.fecha_regreso.formattedDate}</p>
              <p>{flight.destino.code}</p>
              <p> {flight.destino.label}</p>
              <p className="text-4xl font-bold">{flight.fecha_regreso.time}</p>
            </div>
          </div>

          <div className="flex flex-col justify-center items-center">
            <p className="text-2xl  font-bold text-[#FF7100] underline">
              {flight.asientos.turista.precio}
            </p>
          </div>
        </div>
      </div>
      {/* </Link> */}
    </div>
  );
};

export default CardFligth;
