import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import App from './App';

import userEvent from '@testing-library/user-event';

const mockData = {
  testTasks: [{
    id: 1,
    title: 'Test Task',
    description: 'Test task desc',
    completed: true,
    created_at: '2025-01-12T00:34:49.252959Z'
  }, {
    id: 2,
    title: 'Test Task 2',
    description: 'Test task desc 2',
    completed: false,
    created_at: '2025-01-12T00:34:49.252959Z'
  }]
};

describe('Task tracker App tests', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(mockData.testTasks)
    });
  });

  test('Tasks Listing - Completed', async () => {
    const { container } = render(<App />);

    await waitFor(() => {
      expect(container.querySelectorAll('.MuiSkeleton-root').length).toBe(0)
    });

    expect(screen.getByText('Test Task')).toBeInTheDocument();
    expect(screen.getByText('Test task desc')).toBeInTheDocument();

    // Check if the done badge is part of the completed
    expect(screen.getByText('done')).toBeInTheDocument();
  });

  test('Tasks Listing - Incomplete', async () => {
    const { container } = render(<App />);

    await waitFor(() => {
      expect(container.querySelectorAll('.MuiSkeleton-root').length).toBe(0)
    });

    expect(screen.getByText('Test Task 2')).toBeInTheDocument();
    expect(screen.getByText('Test task desc 2')).toBeInTheDocument();
  });

  test('Change sort order', async () => {
    const { container } = render(<App />);

    await waitFor(() => {
      expect(container.querySelectorAll('.MuiSkeleton-root').length).toBe(0)
    });

    // Move all done tasks at the end
    const selectEl = screen.getByText('All');

    userEvent.click(selectEl);

    const option = screen.getByText('By incomplete tasks');

    // click the `by incomplete tasks` option
    userEvent.click(option);

    expect(selectEl).toHaveTextContent('By incomplete tasks');

    await waitFor(() => {
      expect(container.querySelectorAll('.MuiSkeleton-root').length).toBe(0)
    });

    const allTitles = Array.from(document.querySelectorAll('h6.MuiTypography-root')).map(el => el.textContent);

    // expect the order to be changed
    expect(allTitles).toEqual(['Test Task 2', 'Test Task'])
  });
});
