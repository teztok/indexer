import { validateMetadata } from './fetch-metadata';

test('does not throw if the metadata contains all needed fields', () => {
  expect(() => {
    validateMetadata({
      name: 'test',
      artifactUri: 'https://test',
    } as any);
  }).not.toThrow();
});

test('throws if the metadata does not contain all needed fields', () => {
  expect(() => {
    validateMetadata({
      artifactUri: 'https://test',
    } as any);
  }).toThrow();
});
