// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom

import '@testing-library/jest-dom/extend-expect';

import TestRenderer from 'react-test-renderer';
import { ExoticComponent, ReactElement } from 'react';

const elementSymbol = Symbol.for('react.element');
const ReactTestRendererSnpashotSerializer: jest.SnapshotSerializerPlugin = {
  print: (val: unknown, serializer) =>
    serializer(TestRenderer.create(val as ReactElement).toJSON()),
  test: (val: unknown) =>
    (val as ExoticComponent<unknown>)?.$$typeof === elementSymbol,
};

expect.addSnapshotSerializer(ReactTestRendererSnpashotSerializer);
