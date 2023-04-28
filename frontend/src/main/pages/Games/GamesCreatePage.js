import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import GamesForm from "main/components/Games/GamesForm";
import { useNavigate } from 'react-router-dom'
import { gamesUtils } from 'main/utils/gamesUtils';

export default function RestaurantCreatePage() {

  let navigate = useNavigate(); 

  const onSubmit = async (game) => {
    const createdGame = gamesUtils.add(game);
    console.log("createdGame: " + JSON.stringify(createdGame));
    navigate("/games");
  }  

  return (
    <BasicLayout>
      <div className="pt-2">
        <h1>Create New Game</h1>
        <GamesForm submitAction={onSubmit} />
      </div>
    </BasicLayout>
  )
}
