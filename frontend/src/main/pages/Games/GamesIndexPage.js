import React from 'react'
import Button from 'react-bootstrap/Button';
import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import GamesTable from 'main/components/Games/GamesTable';
import { gamesUtils } from 'main/utils/gamesUtils';
import { useNavigate, Link } from 'react-router-dom';

export default function GamesIndexPage() {
    const navigate = useNavigate();

    const gamesCollection = gamesUtils.get();
    const games = gamesCollection.games;

    const showCell = (cell) => JSON.stringify(cell.row.values);

    const deleteCallback = async (cell) => {
        console.log(`GamesIndexPage deleteCallback: ${showCell(cell)})`);
        gamesUtils.del(cell.row.values.id);
        navigate("/games");
    }

    return (
        <BasicLayout>
            <div className="pt-2">
                <Button style={{ float: "right" }} as={Link} to="/games/create">
                    Create Game
                </Button>
                <h1>Games</h1>
                <GamesTable games={games} deleteCallback={deleteCallback} />
            </div>
        </BasicLayout>
    )
}