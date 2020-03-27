
/*
 * Copyright 2020 American Express Travel Related Services Company, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License
 * is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,either express
 * or implied. See the License for the specific language governing permissions and limitations
 * under the License.
 */

import React from 'react';
import { mount } from 'enzyme';

describe('createSharedContext', () => {
  it('should create context with React.createContext', () => {
    const createContextSpy = jest.spyOn(React, 'createContext');
    // eslint-disable-next-line unicorn/import-index, global-require
    const createSharedContext = require('../index.js');
    createSharedContext('myCoolDefaultValue', 'sharedContext');

    expect(createContextSpy).toHaveBeenCalledWith('myCoolDefaultValue');
  });

  it('should return the same context object if the key matches', () => {
    // eslint-disable-next-line unicorn/import-index, global-require
    const createSharedContext = require('../index.js');
    const testProvider = createSharedContext('', 'sharedContext');
    const { Provider } = testProvider;
    const testConsumer = createSharedContext('', 'sharedContext');
    const { Consumer } = testConsumer;
    const mockValue = 'context value';

    const TestComponent = () => (
      <Provider value={mockValue}>
        <Consumer>
          {(value) => (
            <div id="value">
              {value}
            </div>
          )}
        </Consumer>
      </Provider>
    );

    const mountedComponent = mount(<TestComponent />);
    expect(mountedComponent.children().props().children).toEqual(mockValue);
    expect(mountedComponent).toMatchSnapshot();
  });

  it('should not return the same context object if the key does not matches', () => {
    // eslint-disable-next-line unicorn/import-index, global-require
    const createSharedContext = require('../index.js');
    const defaultValue = 'default';
    const testProvider = createSharedContext('', 'sharedContext');
    const { Provider } = testProvider;
    const testConsumer = createSharedContext(defaultValue, 'someContext');
    const { Consumer } = testConsumer;
    const mockValue = 'context value';

    const TestComponent = () => (
      <Provider value={mockValue}>
        <Consumer>
          {(value) => (
            <div id="value">
              {value}
            </div>
          )}
        </Consumer>
      </Provider>
    );

    const mountedComponent = mount(<TestComponent />);
    expect(mountedComponent.children().props().children).toEqual(defaultValue);
    expect(mountedComponent).toMatchSnapshot();
  });

  it('should use the same default value from first call', () => {
    // eslint-disable-next-line unicorn/import-index, global-require
    const createSharedContext = require('../index.js');
    const defaultValue = 'default';
    createSharedContext(defaultValue, 'someContext');
    const testDefaultContext = createSharedContext('never see this', 'someContext');
    const { Consumer } = testDefaultContext;

    const TestComponent = () => (
      <Consumer>
        {(value) => (
          <div id="value">
            {value}
          </div>
        )}
      </Consumer>
    );

    const mountedComponent = mount(<TestComponent />);
    expect(mountedComponent.children().props().children).toEqual(defaultValue);
    expect(mountedComponent).toMatchSnapshot();
  });

  it('should warn and return context with React.createContext', () => {
    const createContextSpy = jest.spyOn(React, 'createContext');
    const warnSpy = jest.spyOn(console, 'warn');
    // eslint-disable-next-line unicorn/import-index, global-require
    const createSharedContext = require('../index.js');

    createSharedContext('default');
    expect(warnSpy).toHaveBeenCalledWith('Second parameter in createSharedReactContext was not set, defaulting to React.createContext');
    expect(createContextSpy).toHaveBeenCalledWith('default');
  });
});
