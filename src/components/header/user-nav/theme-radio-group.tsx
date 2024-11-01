'use client';

import { useTheme } from '@/components/theme-provider';
import {
    DropdownMenuPortal,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
} from '../../ui/dropdown-menu';

const STRINGS = {
    THEME: 'Theme',
    LIGHT: 'Light',
    DARK: 'Dark',
    SYSTEM: 'System',
};

export const ThemeRadioGroup = () => {
    const { setTheme, theme } = useTheme();

    return (
        <DropdownMenuSub>
            <DropdownMenuSubTrigger>{STRINGS.THEME}</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
                <DropdownMenuSubContent>
                    <DropdownMenuRadioGroup
                        value={theme}
                        onValueChange={setTheme as (value: string) => void}
                    >
                        <DropdownMenuRadioItem value="light">
                            {STRINGS.LIGHT}
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="dark">
                            {STRINGS.DARK}
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="system">
                            {STRINGS.SYSTEM}
                        </DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                </DropdownMenuSubContent>
            </DropdownMenuPortal>
        </DropdownMenuSub>
    );
};
