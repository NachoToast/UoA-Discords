import { SomeThing } from '@shared';
import { describe, expect, test } from 'vitest';
import { someFunction } from './someFunction.js';

describe(someFunction, () => {
    test('does some thing', () => {
        expect(someFunction(2, 0)).toEqual<SomeThing>({ someField: '1' });
    });
});
