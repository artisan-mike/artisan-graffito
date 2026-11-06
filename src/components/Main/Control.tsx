'use client';

import {
    ArrowArcLeftIcon,
    ArrowArcRightIcon,
    ArrowsCounterClockwiseIcon,
    TrashIcon,
} from '@phosphor-icons/react';

import {
    handleRedoClick,
    handleReloadClick,
    handleResetClick,
    handleUndoClick,
} from '@/lib/controler_handlers';

import { Button } from '../sharables/Button';

export function Control() {
    return (
        <div className="m-auto mt-2 flex w-fit w-full max-w-[80rem] justify-between">
            <div className="tablette:gap-4 flex gap-1">
                <Button onClick={handleUndoClick}>
                    <ArrowArcLeftIcon className="text-5xl" />
                </Button>
                <Button
                    onClick={handleRedoClick}
                    className="hover:rotate-5"
                >
                    <ArrowArcRightIcon className="text-5xl" />
                </Button>
            </div>
            <div className="tablette:gap-4 flex gap-1">
                <Button
                    color="red"
                    onClick={handleResetClick}
                >
                    <TrashIcon className="text-3xl" />
                </Button>
                <Button
                    color="green"
                    onClick={handleReloadClick}
                >
                    <ArrowsCounterClockwiseIcon className="text-3xl" />
                </Button>
            </div>
        </div>
    );
}
