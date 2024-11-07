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

import React from "react";
import { render } from "@testing-library/react";
import { vi, describe, expect, test } from "vitest";
import createSharedReactContext from "../../src/index";

describe("createSharedReactContext", () => {
  test("should create context with React.createContext", () => {
    const createContextSpy = vi.spyOn(React, "createContext");
    createSharedReactContext("myCoolDefaultValue", "sharedContext");
    expect(createContextSpy).toHaveBeenCalledWith("myCoolDefaultValue");
  });

  test("should return the same context object if the key matches", () => {
    const testProvider = createSharedReactContext("", "sharedContext");
    const { Provider } = testProvider;
    const testConsumer = createSharedReactContext("", "sharedContext");
    const { Consumer } = testConsumer;
    const mockValue = "context value";

    const TestComponent = () => (
      <Provider value={mockValue}>
        <Consumer>
          {(value) => (
            <div id="value" data-testid="consumerDiv">
              {value}
            </div>
          )}
        </Consumer>
      </Provider>
    );

    const renderedComponent = render(<TestComponent />);
    expect(renderedComponent.getByTestId("consumerDiv").textContent).toEqual(
      mockValue,
    );
    expect(renderedComponent.baseElement).toMatchSnapshot();
  });

  test("should not return the same context object if the key does not match", () => {
    const defaultValue = "default";
    const testProvider = createSharedReactContext("", "sharedContext");
    const { Provider } = testProvider;
    const testConsumer = createSharedReactContext(defaultValue, "someContext");
    const { Consumer } = testConsumer;
    const mockValue = "context value";

    const TestComponent = () => (
      <Provider value={mockValue}>
        <Consumer>
          {(value) => (
            <div id="value" data-testid="consumerDiv">
              {value}
            </div>
          )}
        </Consumer>
      </Provider>
    );

    const renderedComponent = render(<TestComponent />);
    expect(renderedComponent.getByTestId("consumerDiv").textContent).toEqual(
      defaultValue,
    );
    expect(renderedComponent.baseElement).toMatchSnapshot();
  });

  test("should use the same default value from first call", () => {
    const defaultValue = "default";
    createSharedReactContext(defaultValue, "someContext");
    const testDefaultContext = createSharedReactContext(
      "never see this",
      "someContext",
    );
    const { Consumer } = testDefaultContext;

    const TestComponent = () => (
      <Consumer>
        {(value) => (
          <div id="value" data-testid="consumerDiv">
            {value}
          </div>
        )}
      </Consumer>
    );

    const renderedComponent = render(<TestComponent />);
    expect(renderedComponent.getByTestId("consumerDiv").textContent).toEqual(
      defaultValue,
    );
    expect(renderedComponent.baseElement).toMatchSnapshot();
  });

  test("should warn and return context with React.createContext", () => {
    const createContextSpy = vi.spyOn(React, "createContext");
    const warnSpy = vi.spyOn(console, "warn");

    // @ts-ignore-next-line - testing for undefined
    createSharedReactContext("default", undefined);
    expect(warnSpy).toHaveBeenCalledWith(
      "Second parameter in createSharedReactContext was not set, defaulting to React.createContext",
    );
    expect(createContextSpy).toHaveBeenCalledWith("default");
  });
});
