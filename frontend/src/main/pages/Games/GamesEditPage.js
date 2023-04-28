
import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import { useParams } from "react-router-dom";
import { gamesUtils }  from 'main/utils/gamesUtils';
import GamesForm from 'main/components/Games/GamesForm';
import { useNavigate } from 'react-router-dom'


export default function GamesEditPage() {
    let { id } = useParams();

    let navigate = useNavigate(); 

    const response = gamesUtils.getById(id);

    const onSubmit = async (game) => {
        const updatedGame = gamesUtils.update(game);
        console.log("updatedGame: " + JSON.stringify(updatedGame));
        navigate("/games");
    }  

    return (
        <BasicLayout>
            <div className="pt-2">
                <h1>Edit Game</h1>
                <GamesForm submitAction={onSubmit} buttonLabel={"Update"} initialContents={response.games}/>
            </div>
        </BasicLayout>
    )
}