import { describe, it, expect } from 'vitest';

describe('map method', () => {
    //💡 it.only -> 해당 부분만 테스트 결과 확인 가능

    it('squares the elements', () => {
        const numbers = [1, 2, 3, 4, 5];
        // TODO: do something here
        const squares = numbers.map((number) => number * number);

        expect(squares).toEqual([1, 4, 9, 16, 25]);
    });

    it('makes strings uppercase', () => {
        const words = ['hello', 'world'];
        // TODO: do something here
        const uppercasedWords = words.map((word) => word.toUpperCase());

        expect(uppercasedWords).toEqual(['HELLO', 'WORLD']);
    });

    it('extracts user id', () => {
        const users = [
            {
                id: 1,
                name: 'a',
            },
            {
                id: 2,
                name: 'b',
            },
            {
                id: 3,
                name: 'c',
            },
        ];
        // TODO: do something here
        // const userIds = users.map((user) => user.id);
        const userIds = user.map(({ id }) => id);

        expect(userIds).toEqual([1, 2, 3]);
    });

    it('extracts title and year', () => {
        const movies = [
            {
                title: 'Rent',
                year: 2005,
                genres: ['Musical', 'Drama'],
            },
            {
                title: 'Tick, Tick... Boom!',
                year: 2021,
                genres: ['Drama', 'Biography'],
            },
        ];
        // TODO: do something here
        // const titlesAndYears = movies.map((movie) => ({ title: movie.title, year: movie.year }));
        const titlesAndYears = movies.map(({ title, year }) => ({ title: title, year: year }));

        expect(titlesAndYears).toEqual([
            {
                title: 'Rent',
                year: 2005,
            },
            {
                title: 'Tick, Tick... Boom!',
                year: 2021,
            },
        ]);
    });

    it.only('adds genre property without mutating the source data', () => {
        const movies = [
            {
                title: 'Rent',
                year: 2005,
                genres: ['Musical', 'Drama'],
            },
            {
                title: 'Tick, Tick... Boom!',
                year: 2021,
                genres: ['Drama', 'Biography'],
            },
        ];

        // TODO: do something here
        const movies2 = movies.map((movie) => {
            return {
                title: movie.title,
                year: movie.year,
                genres: movie.genres,
                genre: movie.genres.join(' / '),
            };
        });

        expect(movies2).toEqual([
            {
                title: 'Rent',
                year: 2005,
                genres: ['Musical', 'Drama'],
                genre: 'Musical / Drama',
            },
            {
                title: 'Tick, Tick... Boom!',
                year: 2021,
                genres: ['Drama', 'Biography'],
                genre: 'Drama / Biography',
            },
        ]);

        expect(movies[0]).not.toHaveProperty('genre');
    });
});
