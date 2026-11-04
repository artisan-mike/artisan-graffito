'use client';

import { cn } from 'cn';
import { useEffect, useRef } from 'react';
import rough from 'roughjs';

export function Button({
    className,
    children,

    ...rest
}: React.ComponentProps<'button'>) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        if (!canvasRef.current) return;
        const canvas = canvasRef.current;
        const rc = rough.canvas(canvas);

        const canvasHeight = canvas.height;
        const canvasWidth = canvas.width;

        rc.rectangle(0, 0, canvasWidth, canvasHeight, {
            fill: 'yellow',
            strokeWidth: 2,
        });

        return () => {
            canvas.getContext('2d')?.clearRect(0, 0, canvasWidth, canvasHeight);
        };
    });
    return (
        <button
            className={cn(
                'relative flex items-center justify-center w-7 h-6 active:translate-1 transition-all cursor-pointer hover:-rotate-5',
                className,
            )}
            {...rest}
        >
            <span className="relative z-10"> {children}</span>

            <canvas
                ref={canvasRef}
                className="absolute top-0 left-0 h-6 w-7"
            ></canvas>
        </button>
    );
}
