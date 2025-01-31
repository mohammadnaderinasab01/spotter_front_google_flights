import React, { useEffect, useState } from "react";
import { Explorer } from "../components/home/explorer/Explorer";
import { Breadcrumb } from "../components/home/Breadcrumb";
import CheapFlightsList from "../components/home/CheapFlightsList";
import MapComponent from "../components/home/MapComponent";
import { useSelector } from "react-redux";
import PopularAirlines from "../components/home/PopularAirlines";
import NearestAirports from "../components/home/NearestAirports";
import FAQs from "../components/home/FAQs";
import SearchMoreFlights from "../components/home/SearchMoreFlights";

export const Home = () => {
  const { origin, currency } = useSelector((state) => state.flightSearch);
  const [userLocation, setUserLocation] = useState(undefined);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });
      },
      (error) => {
        console.error("Error getting user location:", error);
      }
    );
  }, []);

  // Sample flight data (you can replace this with real data)
  const flights = [
    {
      title: "Paris",
      price: `15,614,463 ${currency}`,
      details: "10 Mar - 18 Mar\n1 stop - 11 hrs 5 min - Pegasus",
      image:
        "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSyQJ-woNs0iO22mPSkmRUM5gcsTbbYeypQ6BBTeFxXr90mqTxZl57Fdq2CDuLn4w7cKZ8TT9_zZhOpF57rIpA7yWKQnqKvkKIf9Y-qJDo",
    },
    {
      title: "Istanbul",
      price: `4,965,904 ${currency}`,
      details: "10 Apr - 16 Apr\nNon-stop - 3 hrs 25 min - Pegasus",
      image:
        "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRiCjiMuHyH5raqgVAMRbLlsvhbz3F-vRqjoeVsLl90nMoNQwTytaomGjUfudBUtd2MtI9VLBNX1nuQ2S3W5ilNuO2DRBxUVEgdJX-XYQQ",
    },
    {
      title: "Sydney",
      price: `83,678,367 ${currency}`,
      details: "4 May - 11 May\n2 stops - 25 hrs 35 min - Malaysia Airlines",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPdsoXNsip15P8UZRTG3U7kaduxFjaMb01CcKiLeWVx6qTHF0_o43H4KQFFHIgbyLKBnkNTh-4ofS1X2iuG1FEB8TAtoeVgqD9ZUApr4s",
    },
    {
      title: "Vancouver",
      price: `37,398,961 ${currency}`,
      details: "9 Feb - 17 Feb\n1 stop - 31 hrs 5 min - Air Canada, Emirates",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8fOAQZqIb_SLNL3yYCPFSIWueL8QsSHGCjlCwr_NAN-noGKoqOy868DelgworWZygN2JU21ef8hzjluj4fb5oFXDpUpSjHoZhJ1ejf0g",
    },
  ];

  return (
    <div>
      <Explorer />
      {origin && origin !== "" && <Breadcrumb origin={origin} />}
      {origin && origin !== "" && <CheapFlightsList flights={flights} />}
      {userLocation && <MapComponent userLocation={userLocation} />}
      {origin && origin !== "" && <PopularAirlines origin={origin} />}
      {userLocation && origin && origin !== "" && (
        <NearestAirports origin={origin} userLocation={userLocation} />
      )}
      {origin && origin !== "" && <FAQs origin={origin} />}
      {origin && origin !== "" && <SearchMoreFlights origin={origin} />}
    </div>
  );
};
