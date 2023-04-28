// get games from local storage
const get = () => {
    const gamesValue = localStorage.getItem("games");
    if (gamesValue === undefined) {
        const gamesCollection = { nextId: 1, games: [] }
        return set(gamesCollection);
    }
    const gamesCollection = JSON.parse(gamesValue);
    if (gamesCollection === null) {
        const gamesCollection = { nextId: 1, games: [] }
        return set(gamesCollection);
    }
    return gamesCollection;
};

const getById = (id) => {
    if (id === undefined) {
        return { "error": "id is a required parameter" };
    }
    const gamesCollection = get();
    const games = gamesCollection.games;

    /* eslint-disable-next-line eqeqeq */ // we really do want == here, not ===
    const index = games.findIndex((r) => r.id == id);
    if (index === -1) {
        return { "error": `game with id ${id} not found` };
    }
    return { games: games[index] };
}

// set games in local storage
const set = (gamesCollection) => {
    localStorage.setItem("games", JSON.stringify(gamesCollection));
    return gamesCollection;
};

// add a game to local storage
const add = (game) => {
    const gamesCollection = get();
    game = { ...game, id: gamesCollection.nextId };
    gamesCollection.nextId++;
    gamesCollection.games.push(game);
    set(gamesCollection);
    return game;
};

// update a game in local storage
const update = (game) => {
    const gamesCollection = get();

    const games = gamesCollection.games;

    /* eslint-disable-next-line eqeqeq */ // we really do want == here, not ===
    const index = games.findIndex((r) => r.id == game.id);
    if (index === -1) {
        return { "error": `game with id ${game.id} not found` };
    }
    games[index] = game;
    set(gamesCollection);
    return { gamesCollection: gamesCollection };
};

// delete a game from local storage
const del = (id) => {
    if (id === undefined) {
        return { "error": "id is a required parameter" };
    }
    const gamesCollection = get();
    const games = gamesCollection.games;

    /* eslint-disable-next-line eqeqeq */ // we really do want == here, not ===
    const index = games.findIndex((r) => r.id == id);
    if (index === -1) {
        return { "error": `game with id ${id} not found` };
    }
    games.splice(index, 1);
    set(gamesCollection);
    return { gamesCollection: gamesCollection };
};

const gamesUtils = {
    get,
    getById,
    add,
    update,
    del
};

export { gamesUtils };



