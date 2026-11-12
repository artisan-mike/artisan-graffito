import { Canvas } from '@/components/Main/Canvas';
import { Control } from '@/components/Main/Control';
import { LogoHeader } from '@/components/Main/LogoHeader';
import { StrokeSettings } from '@/components/Main/StrokeSettings';

export default function Home() {
    return (
        <main className="mb-5 min-h-full overflow-scroll p-2">
            <LogoHeader />
            <Canvas />
            <Control />
            <StrokeSettings />
        </main>
    );
}
