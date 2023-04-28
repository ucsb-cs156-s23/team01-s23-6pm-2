import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import { useParams } from "react-router-dom";
import GamesTable from 'main/components/Games/GamesTable';
import { gamesUtils } from 'main/utils/gamesUtils';

export default function GamesDetailsPage() {
  let { id } = useParams();

  const response = gamesUtils.getById(id);

  return (
    <BasicLayout>
      <div className="pt-2">
        <h1>Game Details</h1>
        <GamesTable games={[response.games]} showButtons={false} />
      </div>
    </BasicLayout>
  )
}
