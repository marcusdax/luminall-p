// apps/web/src/components/demo/AIDamageDetector.tsx
'use client';

import { useState, useRef } from 'react';

export function AIDamageDetector() {
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      setResults({
        damageScore: 87,
        confidence: 0.92,
        detectedDamage: [
          { type: 'Hail Bruising', confidence: 0.89, severity: 'High' },
          { type: 'Missing Granules', confidence: 0.76, severity: 'Medium' },
          { type: 'Cracked Shingles', confidence: 0.82, severity: 'High' }
        ],
        recommendedAction: 'Full Roof Replacement',
        estimatedCost: '$12,450 - $18,750'
      });
      setAnalyzing(false);
    }, 2000);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      // Handle the dropped file
      if (fileInputRef.current) {
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        fileInputRef.current.files = dataTransfer.files;
        fileInputRef.current.dispatchEvent(new Event('change', { bubbles: true }));
      }
    }
  };

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
      <h3 className="text-white text-lg font-semibold mb-4">
        🎯 AI Damage Detection
      </h3>

      {!results ? (
        <div
          className="border-2 border-dashed border-slate-600 rounded-lg p-8 text-center cursor-pointer hover:border-slate-500 transition-colors"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
          
          <div className="text-4xl mb-4">📸</div>
          <div className="text-white font-medium mb-2">
            Upload Roof Photo for AI Analysis
          </div>
          <div className="text-gray-400 text-sm">
            Drag & drop or click to upload • Supports JPG, PNG
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-900 p-4 rounded-lg">
              <div className="text-gray-400 text-sm">Damage Score</div>
              <div className="text-2xl font-bold text-red-400">
                {results.damageScore}/100
              </div>
            </div>
            <div className="bg-slate-900 p-4 rounded-lg">
              <div className="text-gray-400 text-sm">AI Confidence</div>
              <div className="text-2xl font-bold text-green-400">
                {(results.confidence * 100).toFixed(0)}%
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-white font-medium mb-2">Detected Damage</h4>
            <div className="space-y-2">
              {results.detectedDamage.map((damage: any, index: number) => (
                <div key={index} className="flex justify-between items-center bg-slate-900 p-3 rounded">
                  <div>
                    <div className="text-white">{damage.type}</div>
                    <div className="text-gray-400 text-sm">
                      Confidence: {(damage.confidence * 100).toFixed(0)}%
                    </div>
                  </div>
                  <div className={`px-2 py-1 rounded text-xs font-medium ${
                    damage.severity === 'High' ? 'bg-red-500 text-white' :
                    damage.severity === 'Medium' ? 'bg-orange-500 text-white' :
                    'bg-yellow-500 text-black'
                  }`}>
                    {damage.severity}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-900/40 to-purple-900/40 p-4 rounded-lg border border-blue-700/50">
            <h4 className="text-white font-medium mb-2">🤖 AI Recommendation</h4>
            <div className="text-white">{results.recommendedAction}</div>
            <div className="text-green-400 text-sm mt-1">
              Estimated Cost: {results.estimatedCost}
            </div>
          </div>

          <button
            onClick={() => setResults(null)}
            className="w-full bg-slate-700 hover:bg-slate-600 text-white py-2 px-4 rounded transition-colors"
          >
            Analyze Another Image
          </button>
        </div>
      )}

      {analyzing && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-slate-800 p-6 rounded-lg border border-slate-700 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <div className="text-white">AI is analyzing your roof image...</div>
            <div className="text-gray-400 text-sm mt-2">
              Detecting damage patterns and calculating repair estimates
            </div>
          </div>
        </div>
      )}
    </div>
  );
}