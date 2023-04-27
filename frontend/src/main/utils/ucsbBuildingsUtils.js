// get ucsbBuildingss from local storage
const get = () => {
    const ucsbBuildingsValue = localStorage.getItem("ucsbBuildingss");
    if (ucsbBuildingsValue === undefined) {
        const ucsbBuildingsCollection = { nextId: 1, ucsbBuildingss: [] }
        return set(ucsbBuildingsCollection);
    }
    const ucsbBuildingsCollection = JSON.parse(ucsbBuildingsValue);
    if (ucsbBuildingsCollection === null) {
        const ucsbBuildingsCollection = { nextId: 1, ucsbBuildingss: [] }
        return set(ucsbBuildingsCollection);
    }
    return ucsbBuildingsCollection;
};

const getById = (id) => {
    if (id === undefined) {
        return { "error": "id is a required parameter" };
    }
    const ucsbBuildingsCollection = get();
    const ucsbBuildingss = ucsbBuildingsCollection.ucsbBuildingss;

    /* eslint-disable-next-line eqeqeq */ // we really do want == here, not ===
    const index = ucsbBuildingss.findIndex((r) => r.id == id);
    if (index === -1) {
        return { "error": `ucsbBuildings with id ${id} not found` };
    }
    return { ucsbBuildings: ucsbBuildingss[index] };
}

// set ucsbBuildingss in local storage
const set = (ucsbBuildingsCollection) => {
    localStorage.setItem("ucsbBuildingss", JSON.stringify(ucsbBuildingsCollection));
    return ucsbBuildingsCollection;
};

// add a ucsbBuildings to local storage
const add = (ucsbBuildings) => {
    const ucsbBuildingsCollection = get();
    ucsbBuildings = { ...ucsbBuildings, id: ucsbBuildingsCollection.nextId };
    ucsbBuildingsCollection.nextId++;
    ucsbBuildingsCollection.ucsbBuildingss.push(ucsbBuildings);
    set(ucsbBuildingsCollection);
    return ucsbBuildings;
};

// update a ucsbBuildings in local storage
const update = (ucsbBuildings) => {
    const ucsbBuildingsCollection = get();

    const ucsbBuildingss = ucsbBuildingsCollection.ucsbBuildingss;

    /* eslint-disable-next-line eqeqeq */ // we really do want == here, not ===
    const index = ucsbBuildingss.findIndex((r) => r.id == ucsbBuildings.id);
    if (index === -1) {
        return { "error": `ucsbBuildings with id ${ucsbBuildings.id} not found` };
    }
    ucsbBuildingss[index] = ucsbBuildings;
    set(ucsbBuildingsCollection);
    return { ucsbBuildingsCollection: ucsbBuildingsCollection };
};

// delete a ucsbBuildings from local storage
const del = (id) => {
    if (id === undefined) {
        return { "error": "id is a required parameter" };
    }
    const ucsbBuildingsCollection = get();
    const ucsbBuildingss = ucsbBuildingsCollection.ucsbBuildingss;

    /* eslint-disable-next-line eqeqeq */ // we really do want == here, not ===
    const index = ucsbBuildingss.findIndex((r) => r.id == id);
    if (index === -1) {
        return { "error": `ucsbBuildings with id ${id} not found` };
    }
    ucsbBuildingss.splice(index, 1);
    set(ucsbBuildingsCollection);
    return { ucsbBuildingsCollection: ucsbBuildingsCollection };
};

const ucsbBuildingsUtils = {
    get,
    getById,
    add,
    update,
    del
};

export { ucsbBuildingsUtils };



