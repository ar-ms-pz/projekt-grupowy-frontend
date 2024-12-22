import { autoformatPlugin } from './autoformat';
import { BasicMarksPlugin } from '@udecode/plate-basic-marks/react';
import { NodeIdPlugin } from '@udecode/plate-node-id';
import {
    blockSelectionPlugins,
    blockSelectionReadOnlyPlugin,
} from './block-selection';
import { cursorOverlayPlugin } from './cursor-overlay';
import { HorizontalRulePlugin } from '@udecode/plate-horizontal-rule/react';
import { indentPlugin } from './indent';
import { indentListPlugin } from './indent-list';
import { LineHeightPlugin } from '@udecode/plate-line-height/react';
import { basicElementsPlugin } from './basic-elements';
import { softBreakPlugin } from './soft-break';
import { trailingBlockPlugin } from './trailing-block';
import { linkPlugin } from './link';
import { tablePlugin } from './table';
import { exitBreakPlugin } from './exit-break';

export const viewPlugins = [
    basicElementsPlugin,
    BasicMarksPlugin,
    NodeIdPlugin,
    cursorOverlayPlugin,
    blockSelectionReadOnlyPlugin,
    HorizontalRulePlugin,
    indentPlugin,
    indentListPlugin,
    LineHeightPlugin,
    linkPlugin,
    tablePlugin,
];

export const editorPlugins = [
    ...viewPlugins,
    autoformatPlugin,
    ...blockSelectionPlugins,
    softBreakPlugin,
    trailingBlockPlugin,
    exitBreakPlugin,
];
