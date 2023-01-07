import { grimmify, ungrimmify } from './grimm';

describe("Enforce Grimm's Law", () =>
  it('shifts sounds correctly', () => {
    const shifted = grimmify('BHA Gha dha. BA Ga da. Ptk BDG!');

    expect(shifted).toEqual('BA Ga da. PA Ka ta. Fþh PTK!');
  }));

describe("Revert Grimm's Law", () =>
  it('shifts sounds correctly', () => {
    const shifted = ungrimmify('BA Ga da. PA Ka ta. Fþh PTK! Bha gha.');

    expect(shifted).toEqual('BHA Gha dha. BA Ga da. Ptk BDG! Bha gha.');
  }));
