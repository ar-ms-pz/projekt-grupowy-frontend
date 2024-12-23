'use client';

import {
    BoldPlugin,
    CodePlugin,
    ItalicPlugin,
    StrikethroughPlugin,
    SubscriptPlugin,
    SuperscriptPlugin,
    UnderlinePlugin,
} from '@udecode/plate-basic-marks/react';
import { useEditorReadOnly } from '@udecode/plate-common/react';
import { ListStyleType } from '@udecode/plate-indent-list';
import {
    BoldIcon,
    Code2Icon,
    ItalicIcon,
    StrikethroughIcon,
    SubscriptIcon,
    SuperscriptIcon,
    UnderlineIcon,
} from 'lucide-react';

import { EmojiDropdownMenu } from './emoji-dropdown-menu';
import { RedoToolbarButton, UndoToolbarButton } from './history-toolbar-button';
import { IndentListToolbarButton } from './indent-list-toolbar-button';
import { IndentToolbarButton } from './indent-toolbar-button';
import { InsertDropdownMenu } from './insert-dropdown-menu';
import { LineHeightDropdownMenu } from './line-height-dropdown-menu';
import { LinkToolbarButton } from './link-toolbar-button';
import { MarkToolbarButton } from './mark-toolbar-button';
import { OutdentToolbarButton } from './outdent-toolbar-button';
import { TableDropdownMenu } from './table-dropdown-menu';
import { ToolbarGroup } from './toolbar';
import { TurnIntoDropdownMenu } from './turn-into-dropdown-menu';

export function FixedToolbarButtons() {
    const readOnly = useEditorReadOnly();

    return (
        <div className="flex w-full flex-wrap">
            {!readOnly && (
                <>
                    <ToolbarGroup>
                        <UndoToolbarButton />
                        <RedoToolbarButton />
                    </ToolbarGroup>

                    <ToolbarGroup>
                        <InsertDropdownMenu />
                        <TurnIntoDropdownMenu />
                    </ToolbarGroup>

                    <ToolbarGroup>
                        <MarkToolbarButton
                            nodeType={BoldPlugin.key}
                            tooltip="Bold (⌘+B)"
                        >
                            <BoldIcon />
                        </MarkToolbarButton>

                        <MarkToolbarButton
                            nodeType={ItalicPlugin.key}
                            tooltip="Italic (⌘+I)"
                        >
                            <ItalicIcon />
                        </MarkToolbarButton>

                        <MarkToolbarButton
                            nodeType={UnderlinePlugin.key}
                            tooltip="Underline (⌘+U)"
                        >
                            <UnderlineIcon />
                        </MarkToolbarButton>

                        <MarkToolbarButton
                            nodeType={StrikethroughPlugin.key}
                            tooltip="Strikethrough (⌘+⇧+M)"
                        >
                            <StrikethroughIcon />
                        </MarkToolbarButton>

                        <MarkToolbarButton
                            nodeType={SubscriptPlugin.key}
                            tooltip="Subscript (⌘+,)"
                        >
                            <SubscriptIcon />
                        </MarkToolbarButton>

                        <MarkToolbarButton
                            nodeType={SuperscriptPlugin.key}
                            tooltip="Superscript (⌘+.)"
                        >
                            <SuperscriptIcon />
                        </MarkToolbarButton>

                        <MarkToolbarButton
                            nodeType={CodePlugin.key}
                            tooltip="Code (⌘+E)"
                        >
                            <Code2Icon />
                        </MarkToolbarButton>
                    </ToolbarGroup>

                    <ToolbarGroup>
                        <IndentListToolbarButton
                            nodeType={ListStyleType.Disc}
                        />
                        <IndentListToolbarButton
                            nodeType={ListStyleType.Decimal}
                        />
                    </ToolbarGroup>

                    <ToolbarGroup>
                        <LinkToolbarButton />
                        <TableDropdownMenu />
                        <EmojiDropdownMenu />
                    </ToolbarGroup>

                    <ToolbarGroup>
                        <LineHeightDropdownMenu />
                        <OutdentToolbarButton />
                        <IndentToolbarButton />
                    </ToolbarGroup>
                </>
            )}
        </div>
    );
}
