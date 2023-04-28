import React from 'react';
import UcsbBuildingsTable from 'main/components/Buildings/UcsbBuildingsTable';
import { ucsbBuildingsFixtures } from 'fixtures/ucsbBuildingsFixtures';

export default {
    title: 'components/Buildings/ucsbBuildingsTable',
    component: UcsbBuildingsTable
};

const Template = (args) => {
    return (
        <UcsbBuildingsTable {...args} />
    )
};

export const Empty = Template.bind({});

Empty.args = {
    ucsbbuildings: []
};

export const ThreeSubjectsNoButtons = Template.bind({});

ThreeSubjectsNoButtons.args = {
    ucsbbuildings: ucsbBuildingsFixtures.threeucsbBuildings,
    showButtons: false
};

export const ThreeSubjectsWithButtons = Template.bind({});
ThreeSubjectsWithButtons.args = {
    ucsbbuildings: ucsbBuildingsFixtures.threeucsbBuildings,
    showButtons: true
};
