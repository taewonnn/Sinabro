import { describe, it, expect } from 'vitest';

describe('altogether', () => {
    it('extracts items', () => {
        const users = [
            {
                id: 1,
                username: 'a',
            },
            {
                id: 2,
                username: 'b',
            },
            {
                id: 3,
                username: 'c',
            },
            {
                id: 4,
                username: 'd',
            },
        ];
        const idsToExtract = [1, 2, 5];

        //filter
        const extractedUsers = users.filter((user) => {
            return idsToExtract.includes(user.id);
        });

        // set 활용
        const idsToExtractSet = new Set(idsToExtract);
        const extractedUsers2 = users.filter((user) => {
            return idsToExtractSet.has(user.id);
        });

        // isdToExtract 기준으로 map
        const extractedUsers3 = idsToExtract
            .map((id) => {
                return users.find((user) => user.id === id);
            })
            // .filter((user) => {
            //     return user !== undefined;
            // });
            // undefined인거는 거를떄, .filter(Boolean)으로 간결하게 활용 가능!
            // 다만 빈문자열이 있다면 false로 떨어지기떄문에 조심해야함
            .filter(Boolean);

        expect(extractedUsers).toEqual([
            {
                id: 1,
                username: 'a',
            },
            {
                id: 2,
                username: 'b',
            },
        ]);
    });

    it('filters out duplicates', () => {
        const users = [
            {
                id: 1,
                username: 'a',
            },
            {
                id: 2,
                username: 'b',
            },
            {
                id: 3,
                username: 'c',
            },
            {
                id: 1,
                username: 'a',
            },
            {
                id: 3,
                username: 'c',
            },
        ];

        // filter
        // const uniqueUsers = users.filter((user, index) => {
        //     const firstMatchingIndex = users.findIndex((_user) => _user.id === user.id);
        //     if (index !== firstMatchingIndex) {
        //         // false -> 필터에서 거름
        //         return false;
        //     }
        //     // false -> 필터에서 통과
        //     return true;
        // });

        // filter2
        // const foundUserIds = [];
        // const uniqueUsers = users.filter((user) => {
        //     if (foundUserIds.includes(user.id)) {
        //         return false;
        //     } else {
        //         foundUserIds.push(user.id);
        //         return true;
        //     }
        // });

        // reduce
        const uniqueUsers = users.reduce((acc, item) => {
            // find() -> 조건에 맞는 “첫 번째 요소”만 반환, 없으면 undefined
            if (acc.find((_user) => _user.id === item.id)) {
                //
                return acc;
            } else {
                acc.push(item);
                return acc;
            }
        }, []);

        expect(uniqueUsers).toEqual([
            {
                id: 1,
                username: 'a',
            },
            {
                id: 2,
                username: 'b',
            },
            {
                id: 3,
                username: 'c',
            },
        ]);
    });

    it.only('gets movie titles before 2020 that starts with "A"', () => {
        const movies = [
            {
                title: 'Frozen',
                actors: ['Kristen Bell', 'Idina Menzel', 'Josh Gad'],
                year: 2013,
            },
            {
                title: 'A Quiet Place',
                actors: ['Emily Blunt', 'John Krasinski', 'Millicent Simmonds', 'Noah Jupe'],
                year: 2018,
            },
            {
                title: 'Enola Holmes',
                actors: ['Millie Bobby Brown', 'Henry Cavill'],
                year: 2020,
            },
        ];

        // filter + map
        const movieTitles = movies
            .filter((movie) => {
                return movie.year < 2020 && movie.title.startsWith('A');
            })
            .map((movie) => movie.title);

        // reduce
        const movieTitles2 = movies.reduce((titles, movie) => {
            if (movie.year < 2020 && movie.title.startsWith('A')) {
                titles.push(movie.title);
            }
            return titles;
        }, []);

        expect(movieTitles).toEqual(['A Quiet Place']);
    });
});
