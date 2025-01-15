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
import React, { type Context } from "react";

const contexts: { [key: string]: Context<unknown> | undefined } = {};

function createSharedReactContext<T>(
  defaultValue: T,
  key: string,
): Context<unknown> {
  if (!key) {
    // eslint-disable-next-line no-console -- Warn users if they don't provide a key
    console.warn(
      "Second parameter in createSharedReactContext was not set, defaulting to React.createContext",
    );
    return React.createContext(defaultValue) as Context<unknown>;
  }
  if (contexts[key]) {
    return contexts[key] as Context<unknown>;
  }
  const context = React.createContext(defaultValue) as Context<unknown>;
  contexts[key] = context;
  return context;
}

export = createSharedReactContext;
