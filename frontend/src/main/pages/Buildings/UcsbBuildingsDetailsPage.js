import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import { useParams } from "react-router-dom";
import UcsbBuildingsTable from 'main/components/Buildings/UcsbBuildingsTable';
import { ucsbBuildingsUtils } from 'main/utils/ucsbBuildingsUtils';

export default function UcsbBuildingsDetailsPage() {
  let { id } = useParams();

  const response = ucsbBuildingsUtils.getById(id);

  return (
    <BasicLayout>
      <div className="pt-2">
        <h1>Building Details</h1>
        <UcsbBuildingsTable ucsbbuildings={[response.ucsbbuildings]} showButtons={false} />
      </div>
    </BasicLayout>
  )
}
