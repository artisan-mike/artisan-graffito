'use client';

import { cn } from 'cn';
import { useState } from 'react';
import { useSnapshot } from 'valtio';

import { handleFillPick, handleStrokePick } from '@/lib/color_picker_hanlders';
import { appState } from '@/store/app_state';

import { Button } from '../sharables/Button';
import { ColorPicker } from './ColorPicker';
import { StrokeWidth } from './StrokeWidth';

export function StrokeSettings() {
    const { color, fillColor } = useSnapshot(appState.actualStroke);
    const [showFillPicker, setShowFillPicker] = useState(false);
    const [showStrokePicker, setShowStrokePicker] = useState(false);
    const [showOverlay, setShowOverlay] = useState(false);

    return (
        <div className="border-stroke-strong m-auto mt-2 grid w-fit grid-cols-2 gap-4 border-2 p-3">
            <div className="relative">
                <span>Couleur du trait :</span>
                <Button
                    disabled
                    color={color}
                    className="z-30 w-6"
                    fillStyle="solid"
                    onClick={() => {
                        setShowStrokePicker(true);
                        setShowOverlay(true);
                        setShowFillPicker(false);
                    }}
                />
                <ColorPicker
                    handler={handleStrokePick}
                    fillStyle="solid"
                    className={cn(
                        'absolute z-30 top-[110%] left-0 hidden',
                        showStrokePicker && 'grid',
                    )}
                    onClick={() => {
                        setShowStrokePicker(false);
                    }}
                />
            </div>

            <div className="relative">
                <span>Couleur de remplissage :</span>
                <Button
                    disabled
                    color={fillColor}
                    className="z-30 w-6"
                    onClick={() => {
                        setShowFillPicker(true);
                        setShowOverlay(true);
                        setShowStrokePicker(false);
                    }}
                />
                <ColorPicker
                    handler={handleFillPick}
                    className={cn(
                        'absolute z-30 top-[110%] left-0 hidden',
                        showFillPicker && 'grid',
                    )}
                    onClick={() => {
                        setShowFillPicker(false);
                    }}
                />
            </div>

            {/* overlay for close the color pickers when it is clicked */}
            <div
                aria-hidden
                onClick={() => {
                    setShowFillPicker(false);
                    setShowStrokePicker(false);
                    setShowOverlay(false);
                }}
                className={cn(
                    'fixed top-0 left-0 z-20 h-full w-full bg-transparent hidden',
                    showOverlay && 'block',
                )}
            ></div>

            <StrokeWidth />
        </div>
    );
}
