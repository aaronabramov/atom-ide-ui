/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @flow
 * @format
 */

import invariant from 'assert';
import * as React from 'react';
import ReactDom from 'react-dom';
import TestUtils from 'react-dom/test-utils';
import ConsoleView from '../lib/ui/ConsoleView';

describe('ConsoleView', () => {
  it('focuses the filter when "/" is pressed', () => {
    const consoleView: ConsoleView = (TestUtils.renderIntoDocument(
      <ConsoleView
        clearRecords={() => {}}
        createPaste={null}
        currentExecutor={null}
        displayableRecords={[]}
        enableRegExpFilter={true}
        execute={() => {}}
        executors={new Map()}
        filterText={''}
        filteredRecordCount={0}
        fontSize={12}
        getProvider={() => {}}
        history={[]}
        invalidFilterInput={false}
        onDisplayableRecordHeightChange={() => {}}
        resetAllFilters={() => {}}
        selectExecutor={() => {}}
        selectSources={() => {}}
        selectedSourceIds={[]}
        sources={[]}
        updateFilter={() => {}}
        watchEditor={null}
      />,
    ): any);

    const workspaceEl = atom.views.getView(atom.workspace);
    const consoleViewNode = ReactDom.findDOMNode(consoleView);
    invariant(consoleViewNode != null);
    workspaceEl.appendChild(consoleViewNode);

    const consoleHeaderComponent = consoleView._consoleHeaderComponent;
    invariant(consoleHeaderComponent != null);
    const filterFocusSpy = spyOn(consoleHeaderComponent, 'focusFilter');

    const consoleBodyTarget = workspaceEl.querySelector('.console-body');
    invariant(consoleBodyTarget != null);
    atom.commands.dispatch(consoleBodyTarget, 'atom-ide:filter');

    expect(filterFocusSpy).toHaveBeenCalled();
    workspaceEl.removeChild(consoleViewNode);
  });
});
