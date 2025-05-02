import { describe, it, expect } from 'vitest';
import { shows } from './data';

describe('reduce method', () => {
    //💡 it.only -> 해당 부분만 테스트 결과 확인 가능

    it('calculates the total of an array', () => {
        const numbers = [1, 2, 3, 4, 5];

        // TODO: do something here

        // 💡reduce
        // 배열의 각 요소에 대해 콜백함수를 실행하고, 하나의 새로운 결과값을 반환
        // const result = array.reduce(callbackFn, initialValue);

        // callbackFn(accumulator, currentValue, currentIndex, array)
        // - accumulator : 이전 콜백 호출이 반환한 값(초기 호출 시 initialValue)
        // - currentValue : 현재 처리 중인 배열 요소
        // - currentIndex : 현재 요소의 인덱스 (0부터 시작)
        // - array : 호출한 원본 배열
        // initialValue : accumulator의 초깃값. 생략하면 배열의 첫 번째 요소가 되고, 이때 currentValue는 두 번째 요소부터 시작

        // const callbackFn = (sum, item) => {
        //     sum += item;
        //     return sum;
        // };
        // const initialValue = 0;
        // const test = numbers.reduce((callbackFn, initialValue));

        // const sum = numbers.reduce((acc, num) => {
        //     acc += num;
        //     return acc;
        // }, 0);
        const sum = numbers.reduce((acc, num) => acc + num, 0);

        expect(sum).toBe(15);
    });

    it('groups by genre', () => {
        // TODO: do something with `shows` here

        const callbackFn = (res, show) => {
            // 1) 해당 장르 키가 없으면, 빈 배열로 초기화
            if (!res[show.genre]) {
                res[show.genre] = [];
            }
            // 그 장르 배열에 현재 쇼의 제목을 추가
            res[show.genre].push(show.title);
            // 다음 순회에 사용할 누산기 객체 반환
            return res;
        };
        const initialValue = {};

        const groupedShows = shows.reduce(callbackFn, initialValue);

        expect(groupedShows).toEqual({
            Comedy: ["Don't Look Up"],
            Drama: ['Stranger Things', 'Our Blues', 'Inventing Anna'],
            Mistery: ["Dirk Gently's Holistic Detective Agency"],
            Mystery: ['Little Women'],
        });
    });

    it.only('groups by key (2)', () => {
        // TODO: do something with `shows` here
        const groupedShows = [];
        expect(groupedShows).toEqual([
            {
                genre: 'Drama',
                titles: ['Stranger Things', 'Our Blues', 'Inventing Anna'],
            },
            {
                genre: 'Mystery',
                titles: ['Little Women'],
            },
            {
                genre: 'Comedy',
                titles: ["Don't Look Up"],
            },
            {
                genre: 'Mistery',
                titles: ["Dirk Gently's Holistic Detective Agency"],
            },
        ]);
    });

    it('flattens array', () => {
        const nestedArray = [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9],
        ];

        // TODO: do something here
        const flatArray = [];
        expect(flatArray).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    });

    it('extracts writer names', () => {
        // TODO: do something with `shows` here
        const writerNames = [];
        expect(writerNames).toEqual([
            'Matt Duffer',
            'Ross Duffer',
            'Jessie Nickson-Lopez',
            'Kate Trefry',
            'Justin Doble',
            'Alison Tatlock',
            'Paul Dichter',
            'Jessica Mecklenburg',
            'Seo-Gyeong Jeong',
            'Hee-kyung Noh',
            'Shonda Rhimes',
            'Carolyn Ingber',
            'Jessica Pressler',
            'Nicholas Nardini',
            'Adam McKay',
            'Max Landis',
            'Douglas Adams',
        ]);
    });
});

function solution(t, p) {
    const pLen = p.length;
    const limit = +p;

    return t
        .split('')
        .map((_, idx, arr) => {
            if (idx > arr.length - pLen) return null;
            const numStr = arr.slice(idx, idx + pLen).join('');
            return Number(numStr);
        })
        .filter((num) => num !== null && num <= limit).length;
}


