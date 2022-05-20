import "./App.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import { Hotels } from "../hotels/hotels";
import { Home } from "../home/home";
import { Header } from "../header/header";
import { MainPage } from "../activities/activities";
import { HotelFavoritesProvider } from "../state/hotelContext";
import { ActivityFavoritesProvider } from "../state/activityContext";
import { Favorites } from "../favorites/favorites";
import { useState } from "react";

function App() {
  const [locationId, setLocationId] = useState("1662393");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");

  const changeLocation = (locId) => {
    setLocationId(locId);
  };

  const changeLongitude = (long) => {
    setLongitude(long);
  };
  const changeLatitude = (lat) => {
    setLatitude(lat);
  };

  return (
    <HotelFavoritesProvider>
      <ActivityFavoritesProvider>
        <HashRouter>
          <Header />
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  location={locationId}
                  changeLocation={changeLocation}
                  changeLongitude={changeLongitude}
                  changeLatitude={changeLatitude}
                />
              }
            />
            <Route path="/hotels" element={<Hotels location={locationId} />} />
            <Route
              style={{ backgroundColor: "whitesmoke" }}
              path="/activities"
              element={
                <MainPage
                  locationId={locationId}
                  longitude={longitude}
                  latitude={latitude}
                />
              }
            />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </HashRouter>
      </ActivityFavoritesProvider>
    </HotelFavoritesProvider>
  );
}

export default App;
