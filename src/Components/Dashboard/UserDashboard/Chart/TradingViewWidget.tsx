import React, { useRef, useEffect, useState } from 'react';
import {
    createChart,
    LineStyle,
    type CandlestickData,
    type ISeriesApi,
    type IChartApi,
    type Time,
} from 'lightweight-charts';
import { initialData } from './initialData';

interface TradingViewWidgetProps {
    tradeStatus: "idle" | "processing" | "completed";
}

const TradingViewWidget: React.FC<TradingViewWidgetProps> = ({ tradeStatus }) => {
    const chartContainerRef = useRef<HTMLDivElement>(null);
    const chartRef = useRef<IChartApi | null>(null);
    const seriesRef = useRef<ISeriesApi<'Candlestick'> | null>(null);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const dataRef = useRef<CandlestickData[]>([...initialData]);
    const lastTime: Time = initialData[initialData.length - 1].time;
    const numericLastTime = typeof lastTime === 'number' ? lastTime : Number(lastTime);
    const timeRef = useRef<number>(numericLastTime);
    const priceRef = useRef<number>(initialData[initialData.length - 1].close);


    useEffect(() => {
        if (!chartContainerRef.current) return;

        // Create chart with full viewport size
        const chart = createChart(chartContainerRef.current, {
            width: window.innerWidth < 768 ? window.innerWidth : window.innerWidth - 378,
            height: window.innerWidth < 768
                ? window.innerHeight * 0.7  // 70% of screen height on mobile
                : window.innerHeight,       // Full height on desktop
            layout: {
                background: { color: '#171022' }, // nice dark blue-gray
                textColor: '#f1f5f9', // light gray text
            },
            grid: {
                vertLines: { color: '#334155' },
                horzLines: { color: '#334155' },
            },
            crosshair: {
                vertLine: {
                    style: LineStyle.Solid,
                    color: '#7dd3fc',
                    labelBackgroundColor: '#2563eb',
                },
                horzLine: {
                    color: '#7dd3fc',
                    labelBackgroundColor: '#2563eb',
                },
            },
            rightPriceScale: {
                borderColor: '#475569',
            },
            timeScale: {
                borderColor: '#475569',
                timeVisible: true,
                secondsVisible: false,
            },
        });

        const series = chart.addCandlestickSeries({
            upColor: '#22c55e',
            downColor: '#ef4444',
            borderVisible: false,
            wickUpColor: '#22c55e',
            wickDownColor: '#ef4444',
        });

        series.setData(dataRef.current);
        chart.timeScale().fitContent();

        chartRef.current = chart;
        seriesRef.current = series;

        // Resize handler to keep chart full screen
        const handleResize = () => {
            const width = window.innerWidth < 768 ? window.innerWidth : window.innerWidth - 378;
            const height = window.innerWidth < 768
                ? window.innerHeight * 0.7 // same as 100vh - 30vh
                : window.innerHeight;

            chart.applyOptions({
                width,
                height,
            });
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            chart.remove();
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, []);

    const startChart = () => {
        if (intervalRef.current || !seriesRef.current) return;

        intervalRef.current = setInterval(() => {
            timeRef.current += 900;
            const open = priceRef.current;
            const close = open + (Math.random() - 0.5) * 150;
            const high = Math.max(open, close) + Math.random() * 30;
            const low = Math.min(open, close) - Math.random() * 30;
            priceRef.current = close;

            const newCandle: CandlestickData = {
                time: timeRef.current as any,
                open: parseFloat(open.toFixed(2)),
                high: parseFloat(high.toFixed(2)),
                low: parseFloat(low.toFixed(2)),
                close: parseFloat(close.toFixed(2)),
            };

            dataRef.current.push(newCandle);
            seriesRef.current!.setData(dataRef.current);
            chartRef.current?.timeScale().scrollToRealTime();
        }, 1000);
    };

    const stopChart = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    };


    useEffect(() => {
        if (tradeStatus === "processing") {
            startChart();
        } else {
            stopChart();
        }
    }, [tradeStatus]);

    return (
        <div
            className="flex flex-col items-center justify-center bg-[#171022] text-slate-100 w-full md:h-screen h-[calc(100vh-15rem)]"
        >
            <div ref={chartContainerRef} className='w-full' />
        </div>
    );
};

export default TradingViewWidget;