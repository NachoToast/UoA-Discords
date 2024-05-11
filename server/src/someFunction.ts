import { SomeThing } from '@shared';

export function someFunction(a: number, b: number): SomeThing {
    return { someField: (a ** b).toString() };
}
