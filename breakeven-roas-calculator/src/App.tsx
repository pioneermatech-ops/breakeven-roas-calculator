/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, useNavigate, useParams, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Calculator from './components/Calculator';
import LanguageSelector from './components/LanguageSelector';
import MetaHead from './components/MetaHead';
import SeoIntro from './components/SeoIntro';
import FAQSection from './components/FAQSection';
import StickyCTA from './components/StickyCTA';
import { Calculator as CalcIcon } from 'lucide-react';

function CalculatorPage() {
  const { lang } = useParams();
  const { i18n } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    if (lang && (lang === 'en' || lang === 'zh')) {
      if (i18n.language !== lang) {
        i18n.changeLanguage(lang);
      }
    } else {
      // Default to /en if no valid lang param
      navigate('/en/breakeven-roas-calculator', { replace: true });
    }
  }, [lang, i18n, navigate]);

  return (
    <>
      <MetaHead />
      <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans">
        {/* Header Navigation */}
        <header className="sticky top-0 z-50 h-16 px-4 md:px-8 flex items-center justify-between bg-white/80 backdrop-blur-md border-b border-slate-200 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-200">
              <CalcIcon className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-800">
              ROAS<span className="text-indigo-600 font-medium">CALC</span>
            </span>
          </div>
          
          <div className="flex items-center gap-4 md:gap-6">
            <nav className="hidden lg:flex gap-6 text-sm font-medium text-slate-500">
              <a href="#" className="text-indigo-600 font-bold">Calculator</a>
              <a href="#" className="hover:text-slate-900 transition-colors">Glossary</a>
              <a href="#" className="hover:text-slate-900 transition-colors">Templates</a>
            </nav>
            <LanguageSelector />
          </div>
        </header>

        <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-12 md:px-8">
          <SeoIntro />
          <div className="mb-16">
            <Calculator />
          </div>
          <StickyCTA />
          <FAQSection />
        </main>

        <footer className="mt-20 border-t border-slate-200 bg-white py-12 px-8">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-indigo-600 rounded flex items-center justify-center">
                  <CalcIcon className="w-4 h-4 text-white" />
                </div>
                <span className="text-lg font-bold">ROASCALC</span>
              </div>
              <p className="text-slate-400 text-sm max-w-xs">Precise unit economics and profitability analysis for high-growth DTC brands.</p>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-12">
              <div className="flex flex-col gap-3">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-widest">Tools</span>
                <a href="#" className="text-sm text-slate-500 hover:text-indigo-600">ROAS Calculator</a>
                <a href="#" className="text-sm text-slate-500 hover:text-indigo-600">MER Calculator</a>
                <a href="#" className="text-sm text-slate-500 hover:text-indigo-600">LTV Calculator</a>
              </div>
              <div className="flex flex-col gap-3">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-widest">Resources</span>
                <a href="#" className="text-sm text-slate-500 hover:text-indigo-600">Glossary</a>
                <a href="#" className="text-sm text-slate-500 hover:text-indigo-600">DTC Templates</a>
                <a href="#" className="text-sm text-slate-500 hover:text-indigo-600">Case Studies</a>
              </div>
            </div>
          </div>
          <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-100 flex justify-between items-center text-[10px] font-bold text-slate-300 uppercase tracking-widest">
            <span>@ Roy‘s Growth Lab</span>
            <span className="hidden sm:inline">Built for Performance Marketers</span>
          </div>
        </footer>
      </div>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/:lang/breakeven-roas-calculator" element={<CalculatorPage />} />
        <Route path="*" element={<Navigate to="/en/breakeven-roas-calculator" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
