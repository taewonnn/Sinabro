import { describe, it, expect } from 'vitest';
import { posts } from './data';

describe('filter method - simple', () => {
    it('gets positive numbers', () => {
        const numbers = [1, -2, 3, -4, 5];

        // TODO: do something here
        const positiveNumbers = numbers.filter((item) => item > 0);
        expect(positiveNumbers).toEqual([1, 3, 5]);
    });

    it('gets employees in Sales department', () => {
        const employees = [
            { name: 'John', age: 30, department: 'Sales' },
            { name: 'Jane', age: 35, department: 'Development' },
            { name: 'Jim', age: 40, department: 'Sales' },
        ];

        // TODO: do something here
        const salesEmployees = employees.filter((employee) => employee.department === 'Sales');

        expect(salesEmployees).toEqual([
            { name: 'John', age: 30, department: 'Sales' },
            { name: 'Jim', age: 40, department: 'Sales' },
        ]);
    });

    it('gets employees over 35 in Marketing department', () => {
        const employees = [
            { name: 'John', age: 30, department: 'Sales' },
            { name: 'Jane', age: 35, department: 'Development' },
            { name: 'Jim', age: 40, department: 'Marketing' },
        ];

        // TODO: do something here
        const salesEmployeesOver35 = employees.filter((employee) => employee.age > 35 && employee.department === 'Marketing');
        expect(salesEmployeesOver35).toEqual([{ name: 'Jim', age: 40, department: 'Marketing' }]);
    });

    it('gets employees in Sales or Development department', () => {
        const employees = [
            { name: 'John', age: 30, department: 'Sales' },
            { name: 'Jane', age: 35, department: 'Development' },
            { name: 'Jim', age: 40, department: 'Marketing' },
        ];

        const targetDepartments = ['Sales', 'Development'];

        // TODO: do something here
        // solution1
        // const salesOrDevEmployees = employees.filter((employee) => targetDepartments.includes(employee.department));

        // solution2
        // Set 자료구조 활용 -> targetDepartments 개수가 많을 경우는 Filter로 모두 순회하는것보다 간단
        const targetDepartmentsSet = new Set(targetDepartments);
        const salesOrDevEmployees2 = employees.filter((employee) => targetDepartmentsSet.has(employee.department));

        expect(salesOrDevEmployees2).toEqual([
            { name: 'John', age: 30, department: 'Sales' },
            { name: 'Jane', age: 35, department: 'Development' },
        ]);
    });
});

describe('filter method - real world', () => {
    it('gets posts from this year', () => {
        // data/posts.js에 있는 배열 중에 올 해에 해당하는 데이터만 필터링

        // sol1
        // const postsThisYear = posts.filter((post) => post.meta.created_at.split('-')[0] === '2023');
        // sol2
        const postsThisYear = posts.filter((post) => new Date(post.meta.created_at).getFullYear() === 2023);
        expect(postsThisYear.length).toBe(10);
    });

    it('gets posts with "culture" tag', () => {
        // data/posts.js에 있는 배열 중에 tag값이 culture를 가지고 있는 데이터만 필터링
        const postsWithCultureTag = posts.filter((post) => post.meta.tags.includes('culture'));
        expect(postsWithCultureTag.length).toBe(16);
    });

    it.only('gets tweets posted after 10pm', () => {
        // hint:
        // new Date('2023-02-03T21:10:00.000Z').toLocaleString('fr-FR')

        const tweetsPostedAfter10pm = posts.filter((post) => {
            const frenchTimestamp = new Date(post.meta.created_at).toLocaleString('fr-FR');
            console.log(new Date(frenchTimestamp).getHours());
            return new Date(frenchTimestamp).getHours() >= 22;
        });

        expect(tweetsPostedAfter10pm.length).toBe(5);
    });
});
