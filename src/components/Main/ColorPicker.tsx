'use client';

import { cn } from 'cn';
import React from 'react';

import { colors } from '@/store/constant_datas';
import { fillStyle } from '@/store/type';

import { Button } from '../sharables/Button';

interface ColorPickerProps extends React.ComponentProps<'div'> {
    handler: (color: string) => void;
    fillStyle?: fillStyle;
}

export function ColorPicker({
    handler,
    fillStyle,
    className,
    ...rest
}: ColorPickerProps) {
    return (
        <div
            className={cn(
                'grid grid-cols-4 gap-3 w-[17rem] bg-gray-200  border-2 border-text-weak p-2',
                className,
            )}
            {...rest}
        >
            {colors.map((color) => (
                <Button
                    key={color}
                    onClick={() => {
                        handler(color);
                    }}
                    className="h-6 w-6"
                    color={color}
                    fillStyle={fillStyle}
                ></Button>
            ))}
        </div>
    );
}
