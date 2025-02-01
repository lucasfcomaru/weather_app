import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import PageLayout from "../layout/PageLayout";
import { WeatherStorage } from "../context/WeatherContext";

const Paths = () => {
  return (
    <WeatherStorage>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PageLayout />}>
            <Route index element={<HomePage />} />
            {/* <Route path="*" element={<NotFound />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </WeatherStorage>
  );
};

export default Paths;
