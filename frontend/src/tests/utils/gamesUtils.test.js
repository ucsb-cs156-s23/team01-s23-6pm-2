import { gamesFixtures } from "fixtures/gamesFixtures";
import { gamesUtils } from "main/utils/gamesUtils";

describe("gamesUtils tests", () => {
    // return a function that can be used as a mock implementation of getItem
    // the value passed in will be convertd to JSON and returned as the value
    // for the key "games".  Any other key results in an error
    const createGetItemMock = (returnValue) => (key) => {
        if (key === "games") {
            return JSON.stringify(returnValue);
        } else {
            throw new Error("Unexpected key: " + key);
        }
    };

    describe("get", () => {

        test("When games is undefined in local storage, should set to empty list", () => {

            // arrange
            const getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
            getItemSpy.mockImplementation(createGetItemMock(undefined));

            const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
            setItemSpy.mockImplementation((_key, _value) => null);

            // act
            const result = gamesUtils.get();

            // assert
            const expected = { nextId: 1, games: [] } ;
            expect(result).toEqual(expected);

            const expectedJSON = JSON.stringify(expected);
            expect(setItemSpy).toHaveBeenCalledWith("games", expectedJSON);
        });

        test("When games is null in local storage, should set to empty list", () => {

            // arrange
            const getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
            getItemSpy.mockImplementation(createGetItemMock(null));

            const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
            setItemSpy.mockImplementation((_key, _value) => null);

            // act
            const result = gamesUtils.get();

            // assert
            const expected = { nextId: 1, games: [] } ;
            expect(result).toEqual(expected);

            const expectedJSON = JSON.stringify(expected);
            expect(setItemSpy).toHaveBeenCalledWith("games", expectedJSON);
        });

        test("When games is [] in local storage, should return []", () => {

            // arrange
            const getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
            getItemSpy.mockImplementation(createGetItemMock({ nextId: 1, games: [] }));

            const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
            setItemSpy.mockImplementation((_key, _value) => null);

            // act
            const result = gamesUtils.get();

            // assert
            const expected = { nextId: 1, games: [] };
            expect(result).toEqual(expected);

            expect(setItemSpy).not.toHaveBeenCalled();
        });

        test("When games is JSON of three games, should return that JSON", () => {

            // arrange
            const threeGames = gamesFixtures.threeGames;
            const mockGamesCollection = { nextId: 10, games: threeGames };

            const getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
            getItemSpy.mockImplementation(createGetItemMock(mockGamesCollection));

            const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
            setItemSpy.mockImplementation((_key, _value) => null);

            // act
            const result = gamesUtils.get();

            // assert
            expect(result).toEqual(mockGamesCollection);
            expect(setItemSpy).not.toHaveBeenCalled();
        });
    });


    describe("getById", () => {
        test("Check that getting a game by id works", () => {

            // arrange
            const threeGames = gamesFixtures.threeGames;
            const idToGet = threeGames[1].id;

            const getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
            getItemSpy.mockImplementation(createGetItemMock({ nextId: 5, games: threeGames }));

            // act
            const result = gamesUtils.getById(idToGet);

            // assert

            const expected = { games: threeGames[1] };
            expect(result).toEqual(expected);
        });

        test("Check that getting a non-existing game returns an error", () => {

            // arrange
            const threeGames = gamesFixtures.threeGames;

            const getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
            getItemSpy.mockImplementation(createGetItemMock({ nextId: 5, games: threeGames }));

            // act
            const result = gamesUtils.getById(99);

            // assert
            const expectedError = `game with id 99 not found`
            expect(result).toEqual({ error: expectedError });
        });

        test("Check that an error is returned when id not passed", () => {

            // arrange
            const threeGames = gamesFixtures.threeGames;

            const getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
            getItemSpy.mockImplementation(createGetItemMock({ nextId: 5, games: threeGames }));

            // act
            const result = gamesUtils.getById();

            // assert
            const expectedError = `id is a required parameter`
            expect(result).toEqual({ error: expectedError });
        });

    });
    describe("add", () => {
        test("Starting from [], check that adding one game works", () => {

            // arrange
            const game = gamesFixtures.oneGame[0];
            const getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
            getItemSpy.mockImplementation(createGetItemMock({ nextId: 1, games: [] }));

            const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
            setItemSpy.mockImplementation((_key, _value) => null);

            // act
            const result = gamesUtils.add(game);

            // assert
            expect(result).toEqual(game);
            expect(setItemSpy).toHaveBeenCalledWith("games",
                JSON.stringify({ nextId: 2, games: gamesFixtures.oneGame }));
        });
    });

    describe("update", () => {
        test("Check that updating an existing game works", () => {

            // arrange
            const threeGames = gamesFixtures.threeGames;
            const updatedGame = {
                ...threeGames[0],
                name: "Updated Name"
            };
            const threeGamesUpdated = [
                updatedGame,
                threeGames[1],
                threeGames[2]
            ];

            const getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
            getItemSpy.mockImplementation(createGetItemMock({ nextId: 5, games: threeGames }));

            const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
            setItemSpy.mockImplementation((_key, _value) => null);

            // act
            const result = gamesUtils.update(updatedGame);

            // assert
            const expected = { gamesCollection: { nextId: 5, games: threeGamesUpdated } };
            expect(result).toEqual(expected);
            expect(setItemSpy).toHaveBeenCalledWith("games", JSON.stringify(expected.gamesCollection));
        });
        test("Check that updating an non-existing game returns an error", () => {

            // arrange
            const threeGames = gamesFixtures.threeGames;

            const getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
            getItemSpy.mockImplementation(createGetItemMock({ nextId: 5, games: threeGames }));

            const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
            setItemSpy.mockImplementation((_key, _value) => null);

            const updatedGames = {
                id: 99,
                name: "Fake Name",
                description: "Fake Description"
            }

            // act
            const result = gamesUtils.update(updatedGames);

            // assert
            const expectedError = `game with id 99 not found`
            expect(result).toEqual({ error: expectedError });
            expect(setItemSpy).not.toHaveBeenCalled();
        });
    });

    describe("del", () => {
        test("Check that deleting a game by id works", () => {

            // arrange
            const threeGames = gamesFixtures.threeGames;
            const idToDelete = threeGames[1].id;
            const threeGamesUpdated = [
                threeGames[0],
                threeGames[2]
            ];

            const getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
            getItemSpy.mockImplementation(createGetItemMock({ nextId: 5, games: threeGames }));

            const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
            setItemSpy.mockImplementation((_key, _value) => null);

            // act
            const result = gamesUtils.del(idToDelete);

            // assert

            const expected = { gamesCollection: { nextId: 5, games: threeGamesUpdated } };
            expect(result).toEqual(expected);
            expect(setItemSpy).toHaveBeenCalledWith("games", JSON.stringify(expected.gamesCollection));
        });
        test("Check that deleting a non-existing game returns an error", () => {

            // arrange
            const threeGames = gamesFixtures.threeGames;

            const getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
            getItemSpy.mockImplementation(createGetItemMock({ nextId: 5, games: threeGames }));

            const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
            setItemSpy.mockImplementation((_key, _value) => null);

            // act
            const result = gamesUtils.del(99);

            // assert
            const expectedError = `game with id 99 not found`
            expect(result).toEqual({ error: expectedError });
            expect(setItemSpy).not.toHaveBeenCalled();
        });
        test("Check that an error is returned when id not passed", () => {

            // arrange
            const threeGames = gamesFixtures.threeGames;

            const getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
            getItemSpy.mockImplementation(createGetItemMock({ nextId: 5, games: threeGames }));

            // act
            const result = gamesUtils.del();

            // assert
            const expectedError = `id is a required parameter`
            expect(result).toEqual({ error: expectedError });
        });
    });
});

