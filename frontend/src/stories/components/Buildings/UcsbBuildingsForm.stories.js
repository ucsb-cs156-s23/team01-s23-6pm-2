import React from 'react';
import UcsbBuildingsForm from "main/components/Buildings/UcsbBuildingsForm"
import { ucsbBuildingsFixtures } from 'fixtures/ucsbBuildingsFixtures';

export default {
    title: 'components/Buildings/UcsbBuildingsForm',
    component: UcsbBuildingsForm
};

const Template = (args) => {
    return (
        <UcsbBuildingsForm {...args} />
    )
};

export const Default = Template.bind({});

Default.args = {
    submitText: "Create",
    submitAction: () => { console.log("Submit was clicked"); }
};

export const Show = Template.bind({});

Show.args = {
    UcsbBuilding: ucsbBuildingsFixtures.oneucsbBuilding,
    submitText: "",
    submitAction: () => { }
};