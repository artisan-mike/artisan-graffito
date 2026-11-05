'use client';

import { cn } from 'cn';
import { useState } from 'react';
import { useSnapshot } from 'valtio';

import { handleFillPick, handleStrokePick } from '@/lib/color_picker_hanlders';
import { handleFillStylePick } from '@/lib/fill_style.handlers';
import { appState } from '@/store/app_state';
import { fillStyles } from '@/store/constant_datas';

import { Button } from '../sharables/Button';
import { ColorPicker } from './ColorPicker';
import { StrokeWidth } from './StrokeWidth';

export function StrokeSettings() {
    const { color, fillColor, fillStyle } = useSnapshot(appState.actualStroke);
    const [showFillPicker, setShowFillPicker] = useState(false);
    const [showStrokePicker, setShowStrokePicker] = useState(false);
    const [showStylePicker, setShowStylePicker] = useState(false);
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
                        setShowStrokePicker(!showStrokePicker);
                        if (showOverlay) {
                            setShowOverlay(false);
                        } else {
                            setShowOverlay(true);
                        }
                        setShowFillPicker(false);
                        setShowStylePicker(false);
                    }}
                />
                <ColorPicker
                    handler={handleStrokePick}
                    fillStyle="solid"
                    className={cn(
                        'absolute z-40 top-[110%] left-0 hidden',
                        showStrokePicker && 'grid',
                    )}
                    onClick={() => {
                        setShowStrokePicker(false);
                        setShowOverlay(false);
                    }}
                />
            </div>

            <div className="relative">
                <span>Couleur de remplissage :</span>
                <Button
                    disabled
                    color={fillColor}
                    fillStyle={fillStyle}
                    className="z-30 w-6"
                    onClick={() => {
                        setShowFillPicker(!showFillPicker);
                        if (showOverlay) {
                            setShowOverlay(false);
                        } else {
                            setShowOverlay(true);
                        }
                        setShowStrokePicker(false);
                        setShowStylePicker(false);
                    }}
                />
                <ColorPicker
                    handler={handleFillPick}
                    className={cn(
                        'absolute z-40 top-[110%] left-0 hidden',
                        showFillPicker && 'grid',
                    )}
                    onClick={() => {
                        setShowFillPicker(false);
                        setShowOverlay(false);
                    }}
                />
            </div>

            <div className="relative">
                <span>Style de remplissage :</span>
                <Button
                    disabled
                    color="black"
                    className="z-30 w-6"
                    fillStyle={fillStyle}
                    onClick={() => {
                        setShowStylePicker(!showStylePicker);
                        if (showOverlay) {
                            setShowOverlay(false);
                        } else {
                            setShowOverlay(true);
                        }
                        setShowFillPicker(false);
                        setShowStrokePicker(false);
                    }}
                />
                <div
                    className={cn(
                        'absolute z-40 top-[110%] left-0 hidden',
                        showStylePicker &&
                            'grid grid-cols-4 gap-3 p-2 border-2 border-text-strong w-[17rem]',
                    )}
                    onClick={() => {
                        setShowOverlay(false);
                        setShowStylePicker(false);
                    }}
                >
                    {fillStyles.map((fillStyle) => (
                        <Button
                            key={fillStyle}
                            fillStyle={fillStyle}
                            className="w-6"
                            color="black"
                            onClick={() => {
                                handleFillStylePick(fillStyle);
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* overlay for close the color pickers when it is clicked */}
            <div
                aria-hidden
                onClick={() => {
                    setShowFillPicker(false);
                    setShowStrokePicker(false);
                    setShowStylePicker(false);
                    setShowOverlay(false);
                }}
                className={cn(
                    'fixed top-0 left-0 z-20 h-full  w-full bg-transparent hidden',
                    showOverlay && 'block',
                )}
            ></div>

            <StrokeWidth />
        </div>
    );
}
