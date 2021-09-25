import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import Main from './Main';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe('Main', () => {
    it('render activity data', async () => {
        const fakeActivity = {
            'activity': 'Volunteer at your local food bank',
            'type': 'charity',
            'participants': 1,
            'price': 10,
        };

        jest.spyOn(global, 'fetch').mockImplementation(() => 
            Promise.resolve({
                json: () => Promise.resolve(fakeActivity)
            })
        );

        await act(async () => {
            render(<Main />, container);
        });

        expect(container.querySelector('[data-test="activity-name"]').textContent).toBe('Volunteer at your local food bank');
        expect(container.querySelector('[data-test="activity-type"]').textContent).toBe('charity');
        expect(container.querySelector('[data-test="activity-participants"]').textContent).toBe('1');
        expect(container.querySelector('[data-test="activity-price"]').textContent).toBe('£10');

        // remove the mock to ensure tests are completely isolated
        global.fetch.mockRestore();
    });
});