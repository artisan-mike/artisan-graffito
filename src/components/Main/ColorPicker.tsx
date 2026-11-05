'use client';

interface ColorPickerProps {
    handler: (color: string) => void;
}

export function ColorPicker({ handler }: ColorPickerProps) {
    const colors: string[] = [
        'black',
        'white',
        'red',
        'blue',
        'green',
        'yellow',
    ];
    return (
        <div className="flex gap-3">
            {colors.map((color) => (
                <div
                    key={color}
                    onClick={() => {
                        handler(color);
                    }}
                    className="h-6 w-6"
                    style={{ background: color }}
                ></div>
            ))}
        </div>
    );
}
