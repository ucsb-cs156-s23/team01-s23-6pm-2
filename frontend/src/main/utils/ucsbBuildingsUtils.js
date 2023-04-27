// get ucsbBuildings from local storage
const get = () => {
    const ucsbBuildingsValue = localStorage.getItem("ucsbBuildings");
    if (ucsbBuildingsValue === undefined) {
        const ucsbBuildingsCollection = { nextId: 1, ucsbBuildings: [] }
        return set(ucsbBuildingsCollection);
    }
    const ucsbBuildingsCollection = JSON.parse(ucsbBuildingsValue);
    if (ucsbBuildingsCollection === null) {
        const ucsbBuildingsCollection = { nextId: 1, ucsbBuildings: [] }
        return set(ucsbBuildingsCollection);
    }
    return ucsbBuildingsCollection;
};

const getById = (id) => {
    if (id === undefined) {
        return { "error": "id is a required parameter" };
    }
    const ucsbBuildingsCollection = get();
    const ucsbBuildings = ucsbBuildingsCollection.ucsbBuildings;

    /* eslint-disable-next-line eqeqeq */ // we really do want == here, not ===
    const index = ucsbBuildings.findIndex((r) => r.id == id);
    if (index === -1) {
        return { "error": `ucsbBuilding with id ${id} not found` };
    }
    return { ucsbBuilding: ucsbBuildings[index] };
}

// set ucsbBuildings in local storage
const set = (ucsbBuildingsCollection) => {
    localStorage.setItem("ucsbBuildings", JSON.stringify(ucsbBuildingsCollection));
    return ucsbBuildingsCollection;
};

// add a ucsbBuilding to local storage
const add = (ucsbBuilding) => {
    const ucsbBuildingsCollection = get();
    ucsbBuilding = { ...ucsbBuilding, id: ucsbBuildingsCollection.nextId };
    ucsbBuildingsCollection.nextId++;
    ucsbBuildingsCollection.ucsbBuildings.push(ucsbBuilding);
    set(ucsbBuildingsCollection);
    return ucsbBuilding;
};

// update a ucsbBuilding in local storage
const update = (ucsbBuilding) => {
    const ucsbBuildingsCollection = get();

    const ucsbBuildings = ucsbBuildingsCollection.ucsbBuildings;

    /* eslint-disable-next-line eqeqeq */ // we really do want == here, not ===
    const index = ucsbBuildings.findIndex((r) => r.id == ucsbBuilding.id);
    if (index === -1) {
        return { "error": `ucsbBuilding with id ${ucsbBuilding.id} not found` };
    }
    ucsbBuildings[index] = ucsbBuilding;
    set(ucsbBuildingsCollection);
    return { ucsbBuildingsCollection: ucsbBuildingsCollection };
};

// delete a ucsbBuilding from local storage
const del = (id) => {
    if (id === undefined) {
        return { "error": "id is a required parameter" };
    }
    const ucsbBuildingsCollection = get();
    const ucsbBuildings = ucsbBuildingsCollection.ucsbBuildings;

    /* eslint-disable-next-line eqeqeq */ // we really do want == here, not ===
    const index = ucsbBuildings.findIndex((r) => r.id == id);
    if (index === -1) {
        return { "error": `ucsbBuilding with id ${id} not found` };
    }
    ucsbBuildings.splice(index, 1);
    set(ucsbBuildingsCollection);
    return { ucsbBuildingsCollection: ucsbBuildingsCollection };
};

const ucsbBuildingsUtilsUtils = {
    get,
    getById,
    add,
    update,
    del
};

export { ucsbBuildingsUtilsUtils };



