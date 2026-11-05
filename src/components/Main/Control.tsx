'use client';

import { ArrowArcLeftIcon, ArrowArcRightIcon } from '@phosphor-icons/react';

import { handleRedoClick, handleUndoClick } from '@/lib/controler_handlers';

import { Button } from '../sharables/Button';

export function Control() {
    return (
        <div className="m-auto mt-2 flex w-fit gap-4">
            <Button
                onClick={handleUndoClick}
                fillStyle="dots"
            >
                <ArrowArcLeftIcon className="text-5xl" />
            </Button>
            <Button
                onClick={handleRedoClick}
                className="hover:rotate-5"
                fillStyle="dots"
            >
                <ArrowArcRightIcon className="text-5xl" />
            </Button>
        </div>
    );
}
