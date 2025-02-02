import LocationApi from "../components/LocationApi";
import Weather5Days from "../components/Weather5Days";
import WeatherInformations from "../components/WeatherInformations";

const HomePage = () => {
  return (
    <>
      <LocationApi />
      <WeatherInformations />
      <Weather5Days />
    </>
  );
};

export default HomePage;
