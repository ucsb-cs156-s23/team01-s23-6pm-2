
import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import { useParams } from "react-router-dom";
import { ucsbBuildingsUtils }  from 'main/utils/ucsbBuildingsUtils';
import UcsbBuildingsForm from 'main/components/Buildings/UcsbBuildingsForm';
import { useNavigate } from 'react-router-dom'


export default function UcsbBuildingsEditPage() {
    let { id } = useParams();

    let navigate = useNavigate(); 

    const response = ucsbBuildingsUtils.getById(id);

    const onSubmit = async (ucsbBuildings) => {
        const updatedUcsbBuilding = ucsbBuildingsUtils.update(ucsbBuildings);
        console.log("updatedUcsbBuilding: " + JSON.stringify(updatedUcsbBuilding));
        navigate("/buildings");
    }  

    return (
        <BasicLayout>
            <div className="pt-2">
                <h1>Edit UCSB Building</h1>
                <UcsbBuildingsForm submitAction={onSubmit} buttonLabel={"Update"} initialContents={response.ucsbBuildings}/>
            </div>
        </BasicLayout>
    )
}