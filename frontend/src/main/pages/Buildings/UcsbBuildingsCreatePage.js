import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import UcsbBuildingsForm from "main/components/Buildings/UcsbBuildingsForm";
import { useNavigate } from 'react-router-dom'
import { ucsbBuildingsUtils } from 'main/utils/ucsbBuildingsUtils';

export default function UcsbBuildingsCreatePage() {

  let navigate = useNavigate(); 

  const onSubmit = async (ucsbbuilding) => {
    const createdUcsbBuilding = ucsbBuildingsUtils.add(ucsbbuilding);
    console.log("createdUcsbBuilding: " + JSON.stringify(createdUcsbBuilding));
    navigate("/buildings");
  }  

  return (
    <BasicLayout>
      <div className="pt-2">
        <h1>Create New Ucsb Building</h1>
        <UcsbBuildingsForm submitAction={onSubmit} />
      </div>
    </BasicLayout>
  )
}