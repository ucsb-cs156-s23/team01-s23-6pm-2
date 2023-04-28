import { ucsbBuildingsFixtures } from "fixtures/ucsbBuildingsFixtures";
import { ucsbBuildingsUtils } from "main/utils/ucsbBuildingsUtils";

describe("ucsbBuildingsUtils tests", () => {
    // return a function that can be used as a mock implementation of getItem
    // the value passed in will be convertd to JSON and returned as the value
    // for the key "ucsbBuildingss".  Any other key results in an error
    const createGetItemMock = (returnValue) => (key) => {
        if (key === "ucsbBuildingss") {
            return JSON.stringify(returnValue);
        } else {
            throw new Error("Unexpected key: " + key);
        }
    };

    describe("get", () => {

        test("When ucsbBuildingss is undefined in local storage, should set to empty list", () => {

            // arrange
            const getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
            getItemSpy.mockImplementation(createGetItemMock(undefined));

            const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
            setItemSpy.mockImplementation((_key, _value) => null);

            // act
            const result = ucsbBuildingsUtils.get();

            // assert
            const expected = { nextId: 1, ucsbBuildingss: [] } ;
            expect(result).toEqual(expected);

            const expectedJSON = JSON.stringify(expected);
            expect(setItemSpy).toHaveBeenCalledWith("ucsbBuildingss", expectedJSON);
        });

        test("When ucsbBuildingss is null in local storage, should set to empty list", () => {

            // arrange
            const getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
            getItemSpy.mockImplementation(createGetItemMock(null));

            const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
            setItemSpy.mockImplementation((_key, _value) => null);

            // act
            const result = ucsbBuildingsUtils.get();

            // assert
            const expected = { nextId: 1, ucsbBuildingss: [] } ;
            expect(result).toEqual(expected);

            const expectedJSON = JSON.stringify(expected);
            expect(setItemSpy).toHaveBeenCalledWith("ucsbBuildingss", expectedJSON);
        });

        test("When ucsbBuildingss is [] in local storage, should return []", () => {

            // arrange
            const getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
            getItemSpy.mockImplementation(createGetItemMock({ nextId: 1, ucsbBuildingss: [] }));

            const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
            setItemSpy.mockImplementation((_key, _value) => null);

            // act
            const result = ucsbBuildingsUtils.get();

            // assert
            const expected = { nextId: 1, ucsbBuildingss: [] };
            expect(result).toEqual(expected);

            expect(setItemSpy).not.toHaveBeenCalled();
        });

        test("When ucsbBuildingss is JSON of three ucsbBuildingss, should return that JSON", () => {

            // arrange
            const threeucsbbuildings = ucsbBuildingsFixtures.threeucsbBuildings;
            const mockucsbBuildingsCollection = { nextId: 10, ucsbBuildingss: threeucsbbuildings };

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
            const threeucsbbuildings = ucsbBuildingsFixtures.threeucsbBuildings;
            const idToGet = threeucsbbuildings[1].id;

            const getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
            getItemSpy.mockImplementation(createGetItemMock({ nextId: 5, ucsbBuildingss: threeucsbbuildings }));

            // act
            const result = ucsbBuildingsUtils.getById(idToGet);

            // assert

            const expected = { ucsbBuildings: threeucsbbuildings[1] };
            expect(result).toEqual(expected);
        });

        test("Check that getting a non-existing ucsbBuildings returns an error", () => {

            // arrange
            const threeucsbbuildings = ucsbBuildingsFixtures.threeucsbBuildings;

            const getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
            getItemSpy.mockImplementation(createGetItemMock({ nextId: 5, ucsbBuildingss: threeucsbbuildings }));

            // act
            const result = ucsbBuildingsUtils.getById(99);

            // assert
            const expectedError = `ucsbBuildings with id 99 not found`
            expect(result).toEqual({ error: expectedError });
        });

        test("Check that an error is returned when id not passed", () => {

            // arrange
            const threeucsbbuildings = ucsbBuildingsFixtures.threeucsbBuildings;

            const getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
            getItemSpy.mockImplementation(createGetItemMock({ nextId: 5, ucsbBuildingss: threeucsbbuildings }));

            // act
            const result = ucsbBuildingsUtils.getById();

            // assert
            const expectedError = `id is a required parameter`
            expect(result).toEqual({ error: expectedError });
        });

    });
    describe("add", () => {
        test("Starting from [], check that adding one ucsbBuildings works", () => {

            // arrange
            const ucsbBuildings = ucsbBuildingsFixtures.oneucsbBuilding[0];
            const getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
            getItemSpy.mockImplementation(createGetItemMock({ nextId: 1, ucsbBuildingss: [] }));

            const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
            setItemSpy.mockImplementation((_key, _value) => null);

            // act
            const result = ucsbBuildingsUtils.add(ucsbBuildings);

            // assert
            expect(result).toEqual(ucsbBuildings);
            expect(setItemSpy).toHaveBeenCalledWith("ucsbBuildingss",
                JSON.stringify({ nextId: 2, ucsbBuildingss: ucsbBuildingsFixtures.oneucsbBuilding }));
        });
    });

    describe("update", () => {
        test("Check that updating an existing ucsbBuildings works", () => {

            // arrange
            const threeucsbbuildings = ucsbBuildingsFixtures.threeucsbBuildings;
            const updateducsbBuildings = {
                ...threeucsbbuildings[0],
                name: "Updated Name"
            };
            const threeucsbbuildingsUpdated = [
                updateducsbBuildings,
                threeucsbbuildings[1],
                threeucsbbuildings[2]
            ];

            const getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
            getItemSpy.mockImplementation(createGetItemMock({ nextId: 5, ucsbBuildingss: threeucsbbuildings }));

            const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
            setItemSpy.mockImplementation((_key, _value) => null);

            // act
            const result = ucsbBuildingsUtils.update(updateducsbBuildings);

            // assert
            const expected = { ucsbBuildingsCollection: { nextId: 5, ucsbBuildingss: threeucsbbuildingsUpdated } };
            expect(result).toEqual(expected);
            expect(setItemSpy).toHaveBeenCalledWith("ucsbBuildingss", JSON.stringify(expected.ucsbBuildingsCollection));
        });
        test("Check that updating an non-existing ucsbBuildings returns an error", () => {

            // arrange
            const threeucsbbuildings = ucsbBuildingsFixtures.threeucsbBuildings;

            const getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
            getItemSpy.mockImplementation(createGetItemMock({ nextId: 5, ucsbBuildingss: threeucsbbuildings }));

            const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
            setItemSpy.mockImplementation((_key, _value) => null);

            const updateducsbBuildings = {
                id: 99,
                name: "Fake Name",
                description: "Fake Description"
            }

            // act
            const result = ucsbBuildingsUtils.update(updateducsbBuildings);

            // assert
            const expectedError = `ucsbBuildings with id 99 not found`
            expect(result).toEqual({ error: expectedError });
            expect(setItemSpy).not.toHaveBeenCalled();
        });
    });

    describe("del", () => {
        test("Check that deleting a ucsbBuildings by id works", () => {

            // arrange
            const threeucsbbuildings = ucsbBuildingsFixtures.threeucsbBuildings;
            const idToDelete = threeucsbbuildings[1].id;
            const threeucsbbuildingsUpdated = [
                threeucsbbuildings[0],
                threeucsbbuildings[2]
            ];

            const getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
            getItemSpy.mockImplementation(createGetItemMock({ nextId: 5, ucsbBuildingss: threeucsbbuildings }));

            const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
            setItemSpy.mockImplementation((_key, _value) => null);

            // act
            const result = ucsbBuildingsUtils.del(idToDelete);

            // assert

            const expected = { ucsbBuildingsCollection: { nextId: 5, ucsbBuildingss: threeucsbbuildingsUpdated } };
            expect(result).toEqual(expected);
            expect(setItemSpy).toHaveBeenCalledWith("ucsbBuildingss", JSON.stringify(expected.ucsbBuildingsCollection));
        });
        test("Check that deleting a non-existing ucsbBuildings returns an error", () => {

            // arrange
            const threeucsbbuildings = ucsbBuildingsFixtures.threeucsbBuildings;

            const getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
            getItemSpy.mockImplementation(createGetItemMock({ nextId: 5, ucsbBuildingss: threeucsbbuildings }));

            const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
            setItemSpy.mockImplementation((_key, _value) => null);

            // act
            const result = ucsbBuildingsUtils.del(99);

            // assert
            const expectedError = `ucsbBuildings with id 99 not found`
            expect(result).toEqual({ error: expectedError });
            expect(setItemSpy).not.toHaveBeenCalled();
        });
        test("Check that an error is returned when id not passed", () => {

            // arrange
            const threeucsbbuildings = ucsbBuildingsFixtures.threeucsbBuildings;

            const getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
            getItemSpy.mockImplementation(createGetItemMock({ nextId: 5, ucsbBuildingss: threeucsbbuildings }));

            // act
            const result = ucsbBuildingsUtils.del();

            // assert
            const expectedError = `id is a required parameter`
            expect(result).toEqual({ error: expectedError });
        });
    });
});

