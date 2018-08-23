import { Cyclic } from '../index';
import * as React from 'react';
import 'jest-dom/extend-expect';
import { render, fireEvent, cleanup, waitForElement } from 'react-testing-library';
afterEach(cleanup);
test('Should render a limited number of items (perCycle) and on handleNext switch to next items', async () => {
  const ITEMS = ['Hello', 'What', 'Is', 'Up'];
  const { getByTestId, debug } = render(
    <Cyclic items={ITEMS} perCycle={3}>
      {({ currentItems, handleNext }) => (
        <div data-testid={'test-container'}>
          {currentItems.map(item => (
            <div data-testid={'test-' + item} key={item}>
              {item}
            </div>
          ))}
          <button data-testid="test-handleNext" onClick={handleNext} />
        </div>
      )}
    </Cyclic>,
  );

  expect(getByTestId('test-Hello')).toBeInTheDocument();
  expect(getByTestId('test-What')).toBeInTheDocument();
  expect(getByTestId('test-Is')).toBeInTheDocument();

  fireEvent(
    getByTestId('test-handleNext'),
    new MouseEvent('click', {
      bubbles: true, // click events must bubble for React to see it
      cancelable: true,
    }),
  );

  expect(getByTestId('test-Up')).toBeInTheDocument();
  expect(getByTestId('test-Hello')).toBeInTheDocument();
  expect(getByTestId('test-What')).toBeInTheDocument();
});
