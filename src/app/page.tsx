'use client';

import { Canvas } from '@/components/Main/Canvas';
import { ColorPicker } from '@/components/Main/ColorPicker';
import { Control } from '@/components/Main/Control';
import { handleFillPick, handleStrokePick } from '@/lib/color_picker_hanlders';

export default function Home() {
    return (
        <main className="min-h-full bg-gray-100">
            <h1 className="mt-3 mb-5 text-center">Graffito</h1>
            <Canvas />
            <Control />
            <p>Fill:</p>
            <ColorPicker handler={handleFillPick} />
            <p>Stroke:</p>
            <ColorPicker handler={handleStrokePick} />
        </main>
    );
}
