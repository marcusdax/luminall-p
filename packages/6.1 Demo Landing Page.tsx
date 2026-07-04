// apps/web/src/app/demo/page.tsx
'use client';

import { useState } from 'react';
import { StormDemo } from '@/components/demo/StormDemo';
import { EstimateDemo } from '@/components/demo/EstimateDemo';
import { MeasurementDemo } from '@/components/demo/MeasurementDemo';

export function DemoPage() {
    const [activeDemo, setActiveDemo] = useState<'storm' | 'estimate' | 'measure'>('storm');

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            {/* Demo Header */}
            <header className="bg-slate-900/80 backdrop-blur-sm border-b border-slate-700 sticky top-0 z-50">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="text-2xl font-bold text-white">🏠 Luminall</div>
                            <div className="text-xl text-blue-400">PropertyInsight Demo</div>
                        </div>

                        <nav className="flex space-x-1 bg-slate-800 p-1 rounded-lg">
                            <DemoNavButton
                                active={activeDemo === 'storm'}
                                onClick={() => setActiveDemo('storm')}
                                icon="⚡"
                                label="Storm Intelligence"
                            />
                            <DemoNavButton
                                active={activeDemo === 'estimate'}
                                onClick={() => setActiveDemo('estimate')}
                                icon="📋"
                                label="Estimate Builder"
                            />
                            <DemoNavButton
                                active={activeDemo === 'measure'}
                                onClick={() => setActiveDemo('measure')}
                                icon="📐"
                                label="Roof Measurement"
                            />
                        </nav>

                        <div className="flex items-center space-x-3">
                            <div className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-medium">
                                🟢 LIVE DEMO
                            </div>
                            <button
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                                Get Started Free
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Demo Content */}
            <main>
                {activeDemo === 'storm' && <StormDemo/>}
                {activeDemo === 'estimate' && <EstimateDemo/>}
                {activeDemo === 'measure' && <MeasurementDemo/>}
            </main>

            {/* Demo Footer */}
            <footer className="bg-slate-900 border-t border-slate-700 py-8">
                <div className="container mx-auto px-6 text-center">
                    <div className="text-gray-400 mb-4">
                        This is a live demo of Luminall PropertyInsight. All data is simulated for demonstration
                        purposes.
                    </div>
                    <div className="flex justify-center space-x-6 text-sm text-gray-500">
                        <div>⚡ AI-Powered Storm Detection</div>
                        <div>🎯 95% Damage Accuracy</div>
                        <div>🚀 10x Faster Estimates</div>
                        <div>💰 80% Cost Reduction</div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

function DemoNavButton({ active, onClick, icon, label }: any) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
        active
          ? 'bg-blue-600 text-white shadow-lg'
          : 'text-gray-400 hover:text-white hover:bg-slate-700'
      }`}
    >
      <span>{icon}</span>
      <span className="font-medium">{label}</span>
    </button>
  );
}