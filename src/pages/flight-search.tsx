import React, { useEffect } from "react";
import { useRouter } from "next/router";
import config from "../config/index.json";
import Head from "next/head";
import PrimaryHeading from "../components/other/PrimaryHeading";
import MainFlightSearch from "../components/fligthSearch/MainFlightSearch";
import Footer from "../components/other/Footer";

const FlightSearch = () => {
  const router = useRouter();
  const { flights, passengers }: any = router.query; // Obtener los query params
  const parsedFlights = flights ? JSON.parse(flights) : null;
  const parsedPassengers = passengers ? JSON.parse(passengers) : null;
  useEffect(() => {}, []);

  const { search } = config;
  return (
    <div>
      <Head>
        <title>{search.title}</title>
      </Head>
      <PrimaryHeading />
      <MainFlightSearch flights={parsedFlights} passengers={parsedPassengers} />
      <Footer />
    </div>
  );
};

export default FlightSearch;
