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
            className="flex flex-col"
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
            />
            <div
                style={{ width: value, height: value, background: 'black' }}
                className="m-auto rounded-full"
            ></div>
        </form>
    );
}
