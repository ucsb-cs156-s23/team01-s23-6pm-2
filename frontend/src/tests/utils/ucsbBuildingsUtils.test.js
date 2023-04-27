import { ucsbBuildingsFixtures } from "fixtures/ucsbBuildingsFixtures";
import { ucsbBuildingsUtils } from "main/utils/ucsbBuildingsUtils";

describe("ucsbBuildingsUtils tests", () => {
    // return a function that can be used as a mock implementation of getItem
    // the value passed in will be convertd to JSON and returned as the value
    // for the key "ucsbBuildingss".  Any other key results in an error
    const createGetItemMock = (returnValue) => (key) => {
        if (key === "ucsbBuildings") {
            return JSON.stringify(returnValue);
        } else {
            throw new Error("Unexpected key: " + key);
        }
    };

    describe("get", () => {

        test("When ucsbBuildings is undefined in local storage, should set to empty list", () => {

            // arrange
            const getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
            getItemSpy.mockImplementation(createGetItemMock(undefined));

            const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
            setItemSpy.mockImplementation((_key, _value) => null);

            // act
            const result = ucsbBuildingsUtils.get();

            // assert
            const expected = { nextId: 1, ucsbBuildings: [] } ;
            expect(result).toEqual(expected);

            const expectedJSON = JSON.stringify(expected);
            expect(setItemSpy).toHaveBeenCalledWith("ucsbBuildings", expectedJSON);
        });

        test("When ucsbBuildings is null in local storage, should set to empty list", () => {

            // arrange
            const getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
            getItemSpy.mockImplementation(createGetItemMock(null));

            const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
            setItemSpy.mockImplementation((_key, _value) => null);

            // act
            const result = ucsbBuildingsUtils.get();

            // assert
            const expected = { nextId: 1, ucsbBuildings: [] } ;
            expect(result).toEqual(expected);

            const expectedJSON = JSON.stringify(expected);
            expect(setItemSpy).toHaveBeenCalledWith("ucsbBuildings", expectedJSON);
        });

        test("When ucsbBuildings is [] in local storage, should return []", () => {

            // arrange
            const getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
            getItemSpy.mockImplementation(createGetItemMock({ nextId: 1, ucsbBuildings: [] }));

            const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
            setItemSpy.mockImplementation((_key, _value) => null);

            // act
            const result = ucsbBuildingsUtils.get();

            // assert
            const expected = { nextId: 1, ucsbBuildings: [] };
            expect(result).toEqual(expected);

            expect(setItemSpy).not.toHaveBeenCalled();
        });

        test("When ucsbBuildingss is JSON of three ucsbBuildingss, should return that JSON", () => {

            // arrange
            const threeucsbBuildings = ucsbBuildingsFixtures.threeucsbBuildings;
            const mockucsbBuildingsCollection = { nextId: 10, ucsbBuildings: threeucsbBuildings };

            const getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
            getItemSpy.mockImplementation(createGetItemMock(mockucsbBuildingsCollection));

            const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
            setItemSpy.mockImplementation((_key, _value) => null);

            // act
            const result = ucsbBuildingsUtils.get();

            // assert
            expect(result).toEqual(mockucsbBuildingsCollection);
            expect(setItemSpy).not.toHaveBeenCalled();
        });
    });


    describe("getById", () => {
        test("Check that getting a ucsbBuildings by id works", () => {

            // arrange
            const threeucsbBuildings = ucsbBuildingsFixtures.threeucsbBuildings;
            const idToGet = threeucsbBuildings[1].id;

            const getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
            getItemSpy.mockImplementation(createGetItemMock({ nextId: 5, ucsbBuildings: threeucsbBuildings }));

            // act
            const result = ucsbBuildingsUtils.getById(idToGet);

            // assert

            const expected = { ucsbBuilding: threeucsbBuildings[1] };
            expect(result).toEqual(expected);
        });

        test("Check that getting a non-existing ucsbBuilding returns an error", () => {

            // arrange
            const threeucsbBuildings = ucsbBuildingsFixtures.threeucsbBuildings;

            const getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
            getItemSpy.mockImplementation(createGetItemMock({ nextId: 5, ucsbBuildings: threeucsbBuildings }));

            // act
            const result = ucsbBuildingsUtils.getById(99);

            // assert
            const expectedError = `ucsbBuilding with id 99 not found`
            expect(result).toEqual({ error: expectedError });
        });

        test("Check that an error is returned when id not passed", () => {

            // arrange
            const threeucsbBuildings = ucsbBuildingsFixtures.threeucsbBuildings;

            const getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
            getItemSpy.mockImplementation(createGetItemMock({ nextId: 5, ucsbBuildings: threeucsbBuildings }));

            // act
            const result = ucsbBuildingsUtils.getById();

            // assert
            const expectedError = `id is a required parameter`
            expect(result).toEqual({ error: expectedError });
        });

    });
    describe("add", () => {
        test("Starting from [], check that adding one ucsbBuilding works", () => {

            // arrange
            const ucsbBuilding = ucsbBuildingsFixtures.oneucsbBuilding[0];
            const getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
            getItemSpy.mockImplementation(createGetItemMock({ nextId: 1, ucsbBuildings: [] }));

            const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
            setItemSpy.mockImplementation((_key, _value) => null);

            // act
            const result = ucsbBuildingsUtils.add(ucsbBuilding);

            // assert
            expect(result).toEqual(ucsbBuilding);
            expect(setItemSpy).toHaveBeenCalledWith("ucsbBuildings",
                JSON.stringify({ nextId: 2, ucsbBuildings: ucsbBuildingsFixtures.oneucsbBuilding }));
        });
    });

    describe("update", () => {
        test("Check that updating an existing ucsbBuilding works", () => {

            // arrange
            const threeucsbBuildings = ucsbBuildingsFixtures.threeucsbBuildings;
            const updateducsbBuilding = {
                ...threeucsbBuildings[0],
                name: "Updated Name"
            };
            const threeucsbBuildingsUpdated = [
                updateducsbBuilding,
                threeucsbBuildings[1],
                threeucsbBuildings[2]
            ];

            const getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
            getItemSpy.mockImplementation(createGetItemMock({ nextId: 5, ucsbBuildings: threeucsbBuildings }));

            const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
            setItemSpy.mockImplementation((_key, _value) => null);

            // act
            const result = ucsbBuildingsUtils.update(updateducsbBuilding);

            // assert
            const expected = { ucsbBuildingsCollection: { nextId: 5, ucsbBuildings: threeucsbBuildingsUpdated } };
            expect(result).toEqual(expected);
            expect(setItemSpy).toHaveBeenCalledWith("ucsbBuildings", JSON.stringify(expected.ucsbBuildingsCollection));
        });
        test("Check that updating an non-existing ucsbBuilding returns an error", () => {

            // arrange
            const threeucsbBuildings = ucsbBuildingsFixtures.threeucsbBuildings;

            const getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
            getItemSpy.mockImplementation(createGetItemMock({ nextId: 5, ucsbBuildings: threeucsbBuildings }));

            const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
            setItemSpy.mockImplementation((_key, _value) => null);

            const updateducsbBuilding = {
                id: 99,
                name: "Fake Name",
                description: "Fake Description"
            }

            // act
            const result = ucsbBuildingsUtils.update(updateducsbBuilding);

            // assert
            const expectedError = `ucsbBuilding with id 99 not found`
            expect(result).toEqual({ error: expectedError });
            expect(setItemSpy).not.toHaveBeenCalled();
        });
    });

    describe("del", () => {
        test("Check that deleting a ucsbBuilding by id works", () => {

            // arrange
            const threeucsbBuildings = ucsbBuildingsFixtures.threeucsbBuildings;
            const idToDelete = threeucsbBuildings[1].id;
            const threeucsbBuildingsUpdated = [
                threeucsbBuildings[0],
                threeucsbBuildings[2]
            ];

            const getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
            getItemSpy.mockImplementation(createGetItemMock({ nextId: 5, ucsbBuildings: threeucsbBuildings }));

            const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
            setItemSpy.mockImplementation((_key, _value) => null);

            // act
            const result = ucsbBuildingsUtils.del(idToDelete);

            // assert

            const expected = { ucsbBuildingsCollection: { nextId: 5, ucsbBuildings: threeucsbBuildingsUpdated } };
            expect(result).toEqual(expected);
            expect(setItemSpy).toHaveBeenCalledWith("ucsbBuildings", JSON.stringify(expected.ucsbBuildingsCollection));
        });
        test("Check that deleting a non-existing ucsbBuilding returns an error", () => {

            // arrange
            const threeucsbBuildings = ucsbBuildingsFixtures.threeucsbBuildings;

            const getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
            getItemSpy.mockImplementation(createGetItemMock({ nextId: 5, ucsbBuildings: threeucsbBuildings }));

            const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
            setItemSpy.mockImplementation((_key, _value) => null);

            // act
            const result = ucsbBuildingsUtils.del(99);

            // assert
            const expectedError = `ucsbBuilding with id 99 not found`
            expect(result).toEqual({ error: expectedError });
            expect(setItemSpy).not.toHaveBeenCalled();
        });
        test("Check that an error is returned when id not passed", () => {

            // arrange
            const threeucsbBuildings = ucsbBuildingsFixtures.threeucsbBuildings;

            const getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
            getItemSpy.mockImplementation(createGetItemMock({ nextId: 5, ucsbBuildings: threeucsbBuildings }));

            // act
            const result = ucsbBuildingsUtils.del();

            // assert
            const expectedError = `id is a required parameter`
            expect(result).toEqual({ error: expectedError });
        });
    });
});

