import InfoIcon from '../public/icons/magnifier.svg';
import { TooltipPlacement } from '../app/data/types';
import { ReactNode } from 'react';
import { Tooltip } from '@nextui-org/react';

export const CustomTooltip = ({ text, placement, fill }: { text: string | ReactNode, placement?: TooltipPlacement, fill?: string }) =>
    <Tooltip content={<div className='min-w-[150px] max-w-[300px] text-center'>{text}</div>} trigger="click" placement={placement ? placement : 'top'}>
        <InfoIcon className='h-3 w-3 fill-[#1088a7bd]' />
    </Tooltip>

export const ChartTooltip = ({ content }: { content: string | ReactNode }) => <div className='z-100  text-xs font-body text-center text-white p-2 bg-[#0d5680] rounded-sm'>{content}</div>
