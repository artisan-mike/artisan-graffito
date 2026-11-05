import { Canvas } from '@/components/Main/Canvas';
import { Control } from '@/components/Main/Control';
import { StrokeSettings } from '@/components/Main/StrokeSettings';

export default function Home() {
    return (
        <main className="min-h-full bg-gray-100">
            <h1 className="mt-3 mb-7 text-center">Graffito</h1>
            <Canvas />
            <Control />
            <StrokeSettings />
        </main>
    );
}
