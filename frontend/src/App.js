import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "main/pages/HomePage";
import AvilaBeachPage from "main/pages/Towns/AvilaBeachPage";
import LosAlamosPage from "main/pages/Towns/LosAlamosPage";
import ArroyoGrandePage from "main/pages/Towns/ArroyoGrandePage";

import "bootstrap/dist/css/bootstrap.css";
import RestaurantCreatePage from "main/pages/Restaurants/RestaurantCreatePage";
import RestaurantEditPage from "main/pages/Restaurants/RestaurantEditPage";
import RestaurantIndexPage from "main/pages/Restaurants/RestaurantIndexPage";
import RestaurantDetailsPage from "main/pages/Restaurants/RestaurantDetailsPage";

import DogsCreatePage from "main/pages/Dogs/DogsCreatePage";
import DogsEditPage from "main/pages/Dogs/DogsEditPage";
import DogDetailsPage from "main/pages/Dogs/DogDetailsPage.js";
import DogIndexPage from "main/pages/Dogs/DogIndexPage";

import GamesCreatePage from "main/pages/Games/GamesCreatePage";
import GamesEditPage from "main/pages/Games/GamesEditPage";
import GamesDetailsPage from "main/pages/Games/GamesDetailsPage.js";
import GamesIndexPage from "main/pages/Games/GamesIndexPage";

function App() {

  const reload = () => window.location.reload();

  return (
    <BrowserRouter basename="/team01-s23-6pm-2">
      <Routes>
        <Route path="/storybook-static" onEnter={reload}/>
        <Route exact path="/" element={<HomePage />} />

        <Route exact path="/towns/AvilaBeach" element={<AvilaBeachPage />} />
        <Route exact path="/towns/LosAlamos" element={<LosAlamosPage />} />
        <Route exact path="/towns/ArroyoGrande" element={<ArroyoGrandePage />} />
        
        <Route exact path="/restaurants/create" element={<RestaurantCreatePage />} />
        <Route exact path="/restaurants/edit/:id" element={<RestaurantEditPage />} />
        <Route exact path="/restaurants/details/:id" element={<RestaurantDetailsPage />} />
        <Route exact path="/restaurants/" element={<RestaurantIndexPage />} />

        <Route exact path="/dogs/create" element={<DogsCreatePage />} />
        <Route exact path="/dogs/edit/:id" element={<DogsEditPage />} />
        <Route exact path="/dogs/details/:id" element={<DogDetailsPage />} />
        <Route exact path="/dogs/" element={<DogIndexPage />} />

        <Route exact path="/games/create" element={<GamesCreatePage />} />
        <Route exact path="/games/edit/:id" element={<GamesEditPage />} />
        <Route exact path="/games/details/:id" element={<GamesDetailsPage />} />
        <Route exact path="/games/" element={<GamesIndexPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
