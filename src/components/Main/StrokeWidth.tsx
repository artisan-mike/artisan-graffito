import { useState } from 'react';
import { useSnapshot } from 'valtio';

import { handleRangeChange } from '@/lib/stroke_witdth.handler';
import { appState } from '@/store/app_state';

export function StrokeWidth() {
    const { strokeWidth } = useSnapshot(appState.actualStroke);
    const [value, setValue] = useState(strokeWidth);
    return (
        <form
            action=""
            onSubmit={(e) => e.preventDefault()}
            className="relative flex flex-col gap-1"
        >
            <label htmlFor="strokeWidth">Taille du trait: {value}</label>
            <input
                type="range"
                name="strokeWitdth"
                id="strokeWidth"
                min={0}
                max={20}
                value={value}
                onChange={(e) => {
                    const rangeValue = Number(e.target.value);
                    setValue(rangeValue);
                    handleRangeChange(rangeValue);
                }}
                className="cursor-pointer border-2 bg-yellow-100 accent-yellow-100"
            />
            <div
                aria-hidden
                style={{ scale: value / 3, background: 'black' }}
                className="absolute top-[0.6rem] right-[5.2rem] m-auto h-1 w-1 origin-center rounded-full"
            ></div>
        </form>
    );
}
