'use client';

import { PencilSimpleSlashIcon } from '@phosphor-icons/react';
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
        <div className="border-stroke-strong tablette:grid m-auto mt-2 w-fit grid-cols-2 gap-4 border-2 p-3">
            <div className="relative flex items-center">
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
                >
                    {color === 'transparent' && (
                        <PencilSimpleSlashIcon className="text-3xl" />
                    )}
                </Button>
                {showStrokePicker && (
                    <ColorPicker
                        handler={handleStrokePick}
                        fillStyle="solid"
                        className={cn('absolute z-40 bottom-6 left-0')}
                        onClick={() => {
                            setShowStrokePicker(false);
                            setShowOverlay(false);
                        }}
                    />
                )}
            </div>

            <div className="relative flex items-center">
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
                >
                    {fillColor === 'transparent' && (
                        <PencilSimpleSlashIcon className="text-3xl" />
                    )}
                </Button>
                {showFillPicker && (
                    <ColorPicker
                        handler={handleFillPick}
                        fillStyle={fillStyle}
                        className={cn('absolute z-40 bottom-6 left-0')}
                        onClick={() => {
                            setShowFillPicker(false);
                            setShowOverlay(false);
                        }}
                    />
                )}
            </div>

            <div className="tablette:mb-0 relative mb-2 flex items-center">
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
                {showStylePicker && (
                    <div
                        className={cn(
                            'absolute z-40 bottom-6 left-0 grid grid-cols-4 gap-3 p-2 border-2 border-text-strong w-[17rem] bg-gray-200',
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
                )}
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
