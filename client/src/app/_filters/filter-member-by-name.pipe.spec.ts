import { FilterMemberByNamePipe } from './filter-member-by-name.pipe';

describe('FilterMemberByNamePipe', () => {
  it('create an instance', () => {
    const pipe = new FilterMemberByNamePipe();
    expect(pipe).toBeTruthy();
  });
});
