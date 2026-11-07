'use client';

import { cn } from 'cn';
import { useEffect, useRef } from 'react';
import rough from 'roughjs';
import { Options } from 'roughjs/bin/core';

import { fillStyle } from '@/store/type';

interface ButtonProps extends React.ComponentProps<'button'> {
    color?: string;
    fillStyle?: fillStyle;
}

export function Button({
    className,
    children,
    color,
    fillStyle,
    disabled,
    ...rest
}: ButtonProps) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (!canvasRef.current) return;
        if (!buttonRef.current) return;
        const canvas = canvasRef.current;
        const button = buttonRef.current;
        const ctx = canvas.getContext('2d');

        // make the canvas the same as its css total size
        const { width, height } = canvas.getBoundingClientRect();
        canvas.height = height * 2;
        canvas.width = width * 2;
        canvas.getContext('2d')?.scale(2, 2);

        const rc = rough.canvas(canvas);

        // diveded by two beacause I doubled the canvas size earlier
        const canvasHeight = canvas.height / 2 - 4;
        const canvasWidth = canvas.width / 2 - 4;

        function rcRectangleSettings(options: Options): Options {
            return {
                fill: color || 'yellow',
                fillStyle: fillStyle || 'hachure',
                fillWeight: 1,
                seed: 7,
                strokeWidth: options.strokeWidth || 1,
                hachureGap: 4,
            };
        }

        rc.rectangle(2, 2, canvasWidth, canvasHeight, rcRectangleSettings({}));

        button.addEventListener('pointerover', () => {
            ctx?.clearRect(0, 0, canvas.width, canvas.height);
            rc.rectangle(
                2,
                2,
                canvasWidth,
                canvasHeight,
                rcRectangleSettings({ strokeWidth: 2 }),
            );
        });

        button.addEventListener('pointerleave', () => {
            ctx?.clearRect(0, 0, canvas.width, canvas.height);
            rc.rectangle(
                2,
                2,
                canvasWidth,
                canvasHeight,
                rcRectangleSettings({ strokeWidth: 1 }),
            );
        });

        button.addEventListener('pointercancel', () => {
            ctx?.clearRect(0, 0, canvas.width, canvas.height);
            rc.rectangle(
                2,
                2,
                canvasWidth,
                canvasHeight,
                rcRectangleSettings({ strokeWidth: 1 }),
            );
        });

        return () => {
            const ctx = canvas.getContext('2d');
            ctx?.clearRect(0, 0, canvas.width, canvas.height);
        };
    });
    return (
        <button
            ref={buttonRef}
            className={cn(
                'relative flex items-center justify-center w-7 h-6  cursor-pointer active:scale-95 ',
                disabled && 'active:translate-0 hover:rotate-0',

                className,
            )}
            {...rest}
        >
            <span className="pointer-events-none relative z-10 flex items-center justify-center gap-2">
                {children}
            </span>

            <canvas
                aria-hidden

                ref={canvasRef}
                className="pointer-events-none absolute top-1/2 left-1/2 h-full w-full -translate-1/2"
            ></canvas>
        </button>
    );
}
