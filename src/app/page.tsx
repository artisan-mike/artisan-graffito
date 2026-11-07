import { Canvas } from '@/components/Main/Canvas';
import { Control } from '@/components/Main/Control';
import { LogoHeader } from '@/components/Main/LogoHeader';
import { StrokeSettings } from '@/components/Main/StrokeSettings';

export default function Home() {
    return (
        <main className="min-h-full overflow-x-clip overflow-y-scroll bg-gray-100 p-2">
            <LogoHeader />
            <Canvas />
            <Control />
            <StrokeSettings />
        </main>
    );
}
