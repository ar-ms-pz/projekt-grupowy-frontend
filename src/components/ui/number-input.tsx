import { ChevronDown, ChevronUp } from 'lucide-react';
import { forwardRef, useCallback, useEffect, useState } from 'react';
import { NumericFormat, NumericFormatProps } from 'react-number-format';
import { Button } from './button';
import { Input } from './input';
import { cn } from '@/lib/utils';

export interface NumberInputProps
    extends Omit<NumericFormatProps, 'value' | 'onValueChange'> {
    stepper?: number;
    thousandSeparator?: string;
    placeholder?: string;
    min?: number;
    max?: number;
    value?: number; // Controlled value
    suffix?: string;
    prefix?: string;
    onValueChange?: (value: number | undefined) => void;
    fixedDecimalScale?: boolean;
    decimalScale?: number;
    unit?: string;
    isAllowed?: (values: { floatValue: number | undefined }) => boolean;
}

export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
    (
        {
            stepper,
            thousandSeparator,
            placeholder,
            min = Number.MIN_SAFE_INTEGER,
            max = Number.MAX_SAFE_INTEGER,
            onValueChange,
            fixedDecimalScale = false,
            decimalScale = 0,
            suffix,
            prefix,
            value: controlledValue,
            unit,
            ...props
        },
        ref,
    ) => {
        const [value, setValue] = useState<number | undefined>(controlledValue);

        const handleIncrement = useCallback(() => {
            setValue((prev) =>
                prev === undefined
                    ? (stepper ?? 1)
                    : Math.min(prev + (stepper ?? 1), max),
            );
        }, [stepper, max]);

        const handleDecrement = useCallback(() => {
            setValue((prev) =>
                prev === undefined
                    ? -(stepper ?? 1)
                    : Math.max(prev - (stepper ?? 1), min),
            );
        }, [stepper, min]);

        useEffect(() => {
            setValue(controlledValue);
        }, [controlledValue]);

        useEffect(() => {
            const handleKeyDown = (e: KeyboardEvent) => {
                if (
                    document.activeElement ===
                    (ref as React.RefObject<HTMLInputElement>).current
                ) {
                    if (e.key === 'ArrowUp') {
                        handleIncrement();
                    } else if (e.key === 'ArrowDown') {
                        handleDecrement();
                    }
                }
            };

            window.addEventListener('keydown', handleKeyDown);

            return () => {
                window.removeEventListener('keydown', handleKeyDown);
            };
        }, [handleIncrement, handleDecrement, ref]);

        const handleChange = (values: {
            value: string;
            floatValue: number | undefined;
        }) => {
            const newValue =
                values.floatValue === undefined ? undefined : values.floatValue;
            setValue(newValue);
            if (onValueChange) {
                onValueChange(newValue);
            }
        };

        const handleBlur = () => {
            if (value !== undefined) {
                if (value < min) {
                    setValue(min);
                    (ref as React.RefObject<HTMLInputElement>).current!.value =
                        String(min);
                } else if (value > max) {
                    setValue(max);
                    (ref as React.RefObject<HTMLInputElement>).current!.value =
                        String(max);
                }
            }
        };

        return (
            <div className="flex items-center relative">
                <NumericFormat
                    value={value === undefined ? '' : value}
                    onValueChange={handleChange}
                    thousandSeparator={thousandSeparator}
                    decimalScale={decimalScale}
                    fixedDecimalScale={fixedDecimalScale}
                    allowNegative={min < 0}
                    valueIsNumericString
                    onBlur={handleBlur}
                    max={max}
                    min={min}
                    suffix={suffix}
                    prefix={prefix}
                    customInput={Input}
                    placeholder={placeholder}
                    isAllowed={(values) => {
                        const { floatValue } = values;
                        return (
                            floatValue === undefined ||
                            (floatValue >= min && floatValue <= max)
                        );
                    }}
                    className={cn(
                        '[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none rounded-r-none relative',
                        unit && 'pr-12',
                    )}
                    getInputRef={ref}
                    {...props}
                />

                {unit && (
                    <span className="text-sm text-muted-foreground absolute right-12 h-full flex items-center">
                        {unit}
                    </span>
                )}

                <div className="flex flex-col">
                    <Button
                        aria-label="Increase value"
                        className="px-2 h-5 rounded-l-none rounded-br-none border-input border-l-0 border-b-[0.5px] focus-visible:relative"
                        variant="outline"
                        onClick={handleIncrement}
                        disabled={value === max}
                        type="button"
                    >
                        <ChevronUp size={15} />
                    </Button>
                    <Button
                        aria-label="Decrease value"
                        className="px-2 h-5 rounded-l-none rounded-tr-none border-input border-l-0 border-t-[0.5px] focus-visible:relative"
                        variant="outline"
                        onClick={handleDecrement}
                        disabled={value === min}
                        type="button"
                    >
                        <ChevronDown size={15} />
                    </Button>
                </div>
            </div>
        );
    },
);
