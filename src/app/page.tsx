import { Canvas } from '@/components/Main/Canvas';

export default function Home() {
    return (
        <main className="min-h-full bg-gray-100">
            <h1 className="mt-3 mb-5 text-center">Graffito</h1>
            <Canvas />
        </main>
    );
}
