import { SpinnerIcon } from '@phosphor-icons/react';

export function LoadingOverlay() {
    return (
        <div className="fixed top-0 left-0 z-40 flex h-full w-full flex-col items-center justify-center gap-4 bg-gray-200">
            <p className="tablette:text-5xl text-xl">
                Chargement de vos données
            </p>
            <SpinnerIcon className="text-stroke-strong animate-spin text-[4rem]" />
        </div>
    );
}
