'use client';

import { cn } from 'cn';
import { useEffect, useRef } from 'react';
import rough from 'roughjs';

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

        // make the canvas the same as its css total size
        const { width, height } = canvas.getBoundingClientRect();
        canvas.height = height;
        canvas.width = width;

        const rc = rough.canvas(canvas);

        const canvasHeight = canvas.height - 16;
        const canvasWidth = canvas.width - 16;

        rc.rectangle(8, 8, canvasWidth, canvasHeight, {
            fill: color || 'yellow',
            fillStyle: fillStyle || 'hachure',
            strokeWidth: 1,
            hachureGap: 5,
            fillWeight: 1,
            seed: 7,
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
                'relative flex items-center justify-center w-7 h-6  transition-all cursor-pointer hover:-rotate-5 ',
                disabled && 'active:translate-0 hover:rotate-0',
                className,
            )}
            {...rest}
        >
            <span className="relative z-10 flex items-center justify-center gap-2">
                {children}
            </span>

            <canvas
                ref={canvasRef}
                className="absolute top-1/2 left-1/2 h-full w-full -translate-1/2"
            ></canvas>
        </button>
    );
}
