import React, { useState } from 'react';
import { DiagnosisResult, Language } from '../types';
import { getTranslation } from '../services/i18n';
import { History, Calendar, Trash2, ArrowRight, Sparkles, AlertCircle, Leaf } from 'lucide-react';

interface FarmHistoryProps {
  history: DiagnosisResult[];
  onSelectRecord: (record: DiagnosisResult) => void;
  onClearHistory: () => void;
  language: Language;
  onGoToDoctor: () => void;
}

export const FarmHistory: React.FC<FarmHistoryProps> = ({
  history,
  onSelectRecord,
  onClearHistory,
  language,
  onGoToDoctor,
}) => {
  const t = (key: string) => getTranslation(language, key);

  return (
    <section className="py-10 bg-agri-cream min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 animate-fadeIn">
        
        {/* Header */}
        <div className="bg-white p-6 rounded-3xl border border-agri-fresh/20 shadow-agri-card flex items-center justify-between">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-bold mb-1">
              <History className="w-3.5 h-3.5" />
              <span>SAVED HEALTH REPORTS</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-agri-dark tracking-tight">
              My Crop History
            </h1>
            <p className="text-xs text-gray-500 font-medium mt-0.5">
              Review previous crop disease diagnostics & track harvest recovery progression over time.
            </p>
          </div>

          {history.length > 0 && (
            <button
              onClick={onClearHistory}
              className="px-3.5 py-2 rounded-xl bg-red-50 text-red-600 text-xs font-bold hover:bg-red-100 transition-colors flex items-center space-x-1"
            >
              <Trash2 className="w-4 h-4" />
              <span className="hidden sm:inline">Clear History</span>
            </button>
          )}
        </div>

        {/* List of Saved Records or Empty State */}
        {history.length === 0 ? (
          /* Empty State */
          <div className="bg-white rounded-3xl p-12 text-center shadow-agri-card border border-agri-fresh/20 space-y-4">
            <div className="w-20 h-20 rounded-full bg-agri-fresh/15 text-agri-deep mx-auto flex items-center justify-center text-4xl animate-bounce">
              🌱
            </div>
            <h2 className="text-xl font-bold text-agri-dark">
              Your crop health journey starts here.
            </h2>
            <p className="text-sm text-gray-500 max-w-md mx-auto">
              No saved crop reports yet. Take a photo of an affected leaf to run your first AI diagnosis!
            </p>
            <button
              onClick={onGoToDoctor}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-agri-fresh to-agri-leaf text-agri-dark font-extrabold text-sm shadow-md hover:scale-105 transition-all inline-flex items-center space-x-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Analyze Your First Crop</span>
            </button>
          </div>
        ) : (
          /* History List Cards */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {history.map((record) => (
              <div
                key={record.id}
                onClick={() => onSelectRecord(record)}
                className="bg-white rounded-3xl p-5 shadow-agri-card border border-agri-fresh/20 hover:border-agri-fresh hover:shadow-agri-hover transition-all duration-200 cursor-pointer space-y-4 flex flex-col justify-between group"
              >
                <div className="flex space-x-4">
                  <img
                    src={record.imageUrl}
                    alt={record.diseaseName}
                    className="w-24 h-24 object-cover rounded-2xl border border-agri-fresh/30 group-hover:scale-105 transition-transform"
                  />
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between text-[11px] font-bold text-gray-500">
                      <span className="bg-agri-cream px-2.5 py-0.5 rounded-full text-agri-dark">
                        {record.crop}
                      </span>
                      <span>{record.detectionDate}</span>
                    </div>

                    <h3 className="text-base font-extrabold text-agri-dark group-hover:text-agri-deep transition-colors">
                      {record.diseaseName}
                    </h3>

                    <div className="flex items-center space-x-2 pt-1">
                      <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded">
                        {record.severity} Risk
                      </span>
                      <span className="text-[10px] font-bold text-agri-deep">
                        {record.confidence}% Confidence
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-agri-deep group-hover:text-agri-fresh">
                  <span>View Full Advisory Report</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
