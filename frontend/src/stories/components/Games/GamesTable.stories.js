import React from 'react';
import GamesTable from 'main/components/Games/GamesTable';
import { gamesFixtures } from 'fixtures/gamesFixtures';

export default {
    title: 'components/Games/GamesTable',
    component: GamesTable
};

const Template = (args) => {
    return (
        <GamesTable {...args} />
    )
};

export const Empty = Template.bind({});

Empty.args = {
    games: []
};

export const ThreeSubjectsNoButtons = Template.bind({});

ThreeSubjectsNoButtons.args = {
    games: gamesFixtures.threeGames,
    showButtons: false
};

export const ThreeSubjectsWithButtons = Template.bind({});
ThreeSubjectsWithButtons.args = {
    games: gamesFixtures.threeGames,
    showButtons: true
};
