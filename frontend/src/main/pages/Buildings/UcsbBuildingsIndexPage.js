import React from 'react'
import Button from 'react-bootstrap/Button';
import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import UcsbBuildingsTable from 'main/components/Buildings/UcsbBuildingsTable';
import { ucsbBuildingsUtils } from 'main/utils/ucsbBuildingsUtils';
import { useNavigate, Link } from 'react-router-dom';

export default function UcsbBuildingsIndexPage() {

    const navigate = useNavigate();

    const ucsbBuildingsCollection = ucsbBuildingsUtils.get();
    const ucsbbuildings = ucsbBuildingsCollection.ucsbBuildingss;

    const showCell = (cell) => JSON.stringify(cell.row.values);

    const deleteCallback = async (cell) => {
        console.log(`UcsbBuildingsIndexPage deleteCallback: ${showCell(cell)})`);
        ucsbBuildingsUtils.del(cell.row.values.id);
        navigate("/buildings");
    }

    return (
        <BasicLayout>
            <div className="pt-2">
                <Button style={{ float: "right" }} as={Link} to="/buildings/create">
                    Create Ucsb Building
                </Button>
                <h1>Ucsb Buildings</h1>
                <UcsbBuildingsTable ucsbbuildings={ucsbbuildings} deleteCallback={deleteCallback} />
            </div>
        </BasicLayout>
    )
}