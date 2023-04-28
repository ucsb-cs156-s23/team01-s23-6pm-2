import React from 'react';
import GamesForm from "main/components/Games/GamesForm";
import { gamesFixtures } from 'fixtures/gamesFixtures';

export default {
    title: 'components/Games/GamesForm',
    component: GamesForm
};

const Template = (args) => {
    return (
        <GamesForm {...args} />
    )
};

export const Default = Template.bind({});

Default.args = {
    submitText: "Create",
    submitAction: () => { console.log("Submit was clicked"); }
};

export const Show = Template.bind({});

Show.args = {
    Games: gamesFixtures.oneGame,
    submitText: "",
    submitAction: () => { }
};
