import React from 'react';
import { Camera, Cpu, Sprout } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: '01',
      icon: Camera,
      title: 'Capture',
      subtitle: 'Take a photo of your crop',
      description: 'Capture affected leaf or plant parts using your phone camera or upload an existing photo from daylight.',
    },
    {
      number: '02',
      icon: Cpu,
      title: 'Understand',
      subtitle: 'AI analyzes symptoms & live weather',
      description: 'KisanMitra matches leaf disease patterns with real-time temperature, humidity, and rainfall forecasts.',
    },
    {
      number: '03',
      icon: Sprout,
      title: 'Act',
      subtitle: 'Get a clear plan for what to do next',
      description: 'Receive non-technical treatment steps, active ingredients, and optimal spray window timings.',
    },
  ];

  return (
    <section className="py-16 bg-white border-b border-agri-fresh/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold text-agri-deep uppercase tracking-widest bg-agri-leaf/20 px-3 py-1 rounded-full">
            SIMPLE 3-STEP PROCESS
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-agri-dark tracking-tight mt-3">
            From Field Photo to Farming Decision
          </h2>
          <p className="text-base text-gray-600 mt-3 font-normal">
            No complicated jargon. Just 3 simple steps to save your crops and maximize your harvest yield.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="relative bg-agri-cream rounded-2xl p-8 border border-agri-fresh/20 shadow-sm hover:shadow-agri-card transition-all duration-300 flex flex-col justify-between"
              >
                {/* Step Number badge */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-4xl font-black text-agri-fresh/40 font-mono">
                    {step.number}
                  </span>
                  <div className="w-12 h-12 rounded-xl bg-agri-deep text-agri-fresh flex items-center justify-center shadow-md">
                    <Icon className="w-6 h-6" />
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-agri-dark mb-1">
                    {step.title}
                  </h3>
                  <p className="text-sm font-semibold text-agri-deep mb-3">
                    {step.subtitle}
                  </p>
                  <p className="text-sm text-gray-600 leading-relaxed font-normal">
                    {step.description}
                  </p>
                </div>

                {/* Connector line for desktop */}
                {idx < 2 && (
                  <div className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-agri-fresh text-agri-dark flex items-center justify-center shadow font-bold text-xs">
                    →
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
