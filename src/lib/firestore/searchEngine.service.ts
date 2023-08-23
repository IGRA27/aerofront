import {
  collection,
  query,
  where,
  Timestamp,
  getDocs,
} from "firebase/firestore";
import { db } from "../../config/firebase";

const vueloRef = collection(db, "vuelo");

// export const getFlightsByParams = (params, fSnapshot) => {
//   // const timeStamp = firebase.firestore.Timestamp.fromDate(params.date);
//   const timeStamp = Timestamp.fromDate(params.date);

//   const q = query(
//     vueloRef,
//     where("destino", "==", params.origin.code),
//     where("origen", "==", params.destination.code),
//     where("fecha_salida", "==", timeStamp)
//   );
//   return onSnapshot(q, fSnapshot);
// };

export const getFlightByParams = async (params: any) => {
  const flights: any = [];
  // console.log("PARAMS:", params);

  try {
    if (params.type !== "oneWay") {
      const flightOrigin: any = [];
      const flightDestiny: any = [];
      const timeStampI = Timestamp.fromDate(params.dateInitial);
      const timeStampF = Timestamp.fromDate(params.dateFinal);

      const q1 = query(
        vueloRef,
        where("destino", "==", params.destination.code),
        where("origen", "==", params.origin.code),
        where("fecha_salida", ">=", timeStampI)
      );
      const q2 = query(
        vueloRef,
        where("destino", "==", params.destination.code),
        where("origen", "==", params.origin.code),
        where("disponibles", ">=", params.totalSumPassengers)
      );

      const q3 = query(
        vueloRef,
        where("destino", "==", params.origin.code),
        where("origen", "==", params.destination.code),
        where("fecha_salida", ">=", timeStampF)
      );
      const q4 = query(
        vueloRef,
        where("destino", "==", params.origin.code),
        where("origen", "==", params.destination.code),
        where("disponibles", ">=", params.totalSumPassengers)
      );

      const [fechaSalidaResults, disponiblesResults] = await Promise.all([
        getDocs(q1),
        getDocs(q2),
      ]);
      const [fechaSalidaResults2, disponiblesResults2] = await Promise.all([
        getDocs(q3),
        getDocs(q4),
      ]);

      const filteredResults = fechaSalidaResults.docs.filter((doc) => {
        const disponibilidadDoc = disponiblesResults.docs.find(
          (disponibilidadDoc) => disponibilidadDoc.id === doc.id
        );
        return disponibilidadDoc !== undefined;
      });
      const filteredResults2 = fechaSalidaResults2.docs.filter((doc) => {
        const disponibilidadDoc2 = disponiblesResults2.docs.find(
          (disponibilidadDoc) => disponibilidadDoc.id === doc.id
        );
        return disponibilidadDoc2 !== undefined;
      });

      filteredResults.forEach((doc) => {
        flightOrigin.push({ id: doc.id, ...doc.data() });
      });
      filteredResults2.forEach((doc) => {
        flightDestiny.push({ id: doc.id, ...doc.data() });
      });

      return {
        flightOrigin: flightOrigin,
        flightDestiny: flightDestiny,
      };
    } else {
      const timeStamp = Timestamp.fromDate(params.dateInitial);

      const qAvailable = query(
        vueloRef,
        where("destino", "==", params.destination.code),
        where("origen", "==", params.origin.code),
        where("disponibles", ">=", params.totalSumPassengers)
      );
      const qDate = query(
        vueloRef,
        where("destino", "==", params.destination.code),
        where("origen", "==", params.origin.code),
        where("fecha_salida", ">=", timeStamp)
      );

      const [fechaSalidaResults, disponiblesResults] = await Promise.all([
        getDocs(qDate),
        getDocs(qAvailable),
      ]);
      const filteredResults = fechaSalidaResults.docs.filter((doc) => {
        const disponibilidadDoc = disponiblesResults.docs.find(
          (disponibilidadDoc) => disponibilidadDoc.id === doc.id
        );
        return disponibilidadDoc !== undefined;
      });

      filteredResults.forEach((doc) => {
        flights.push({ id: doc.id, ...doc.data() });
      });
      return flights;
    }
  } catch (error: any) {
    console.log("Error:", error.message);
    return null;
  }
  // const timeStamp = firebase.firestore.Timestamp.fromDate(params.date);
};
