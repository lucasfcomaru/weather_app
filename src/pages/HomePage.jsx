import WeatherInformations from "../components/WeatherInformations";
import { WeatherStorage } from "../context/WeatherContext";

const HomePage = () => {

  return (
    <>
      {/* <WeatherStorage> */}
        <WeatherInformations />
      {/* </WeatherStorage> */}
    </>
  );
};

export default HomePage;
