import React from 'react';
import { useTranslation } from 'react-i18next';
import { Tag, Tooltip } from 'antd';
import { InterpretationResult, InterpretationStatus, BottomLineResult } from '../lib/interpretationRules';
import { LayoutGrid, TrendingUp, ShieldCheck, AlertCircle, MessageSquareQuote } from 'lucide-react';

interface InterpretationSectionProps {
  interpretations: InterpretationResult[];
  bottomLine?: BottomLineResult;
}

const getStatusColor = (status: InterpretationStatus) => {
  switch (status) {
    case 'healthy':
    case 'strong':
    case 'efficient':
      return 'success';
    case 'moderate':
    case 'average':
      return 'processing';
    case 'risky':
    case 'weak':
    case 'thin':
      return 'error';
    default:
      return 'default';
  }
};

const getIcon = (metric: string) => {
  if (metric.includes('ROAS')) return <TrendingUp className="w-4 h-4" />;
  if (metric.includes('Margin')) return <ShieldCheck className="w-4 h-4" />;
  return <LayoutGrid className="w-4 h-4" />;
};

export default function InterpretationSection({ interpretations, bottomLine }: InterpretationSectionProps) {
  const { t } = useTranslation();

  if (interpretations.length === 0 && (!bottomLine || bottomLine.messageKey === 'bottomLine.idle')) return null;

  return (
    <div className="mt-12">
      {bottomLine && bottomLine.messageKey !== 'bottomLine.idle' && (
        <div className="mb-10 p-8 bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden group">
          <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none">
            <MessageSquareQuote className="w-48 h-48 text-white rotate-12" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-indigo-500/20 px-3 py-1 rounded-full border border-indigo-500/30">
                <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">{t('summary.title')}</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 border border-slate-700">
                <div className={`w-2 h-2 rounded-full shadow-[0_0_8px_rgba(255,255,255,0.5)] ${
                  bottomLine.mood === 'great' ? 'bg-emerald-400' : 
                  bottomLine.mood === 'okay' ? 'bg-blue-400' : 
                  bottomLine.mood === 'caution' ? 'bg-amber-400' : 'bg-red-500'
                }`} />
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tight">
                  {t('summary.operatorMode') || 'Operator Mode'}
                </span>
              </div>
            </div>
            <p className="text-lg md:text-xl font-medium text-slate-100 leading-relaxed max-w-4xl">
              <span className="text-indigo-400 mr-2 opacity-50 font-serif text-3xl leading-none transition-all group-hover:opacity-100 italic">“</span>
              <span className="italic">{t(`summary.${bottomLine.messageKey}`)}</span>
              <span className="text-indigo-400 ml-1 opacity-50 font-serif text-3xl leading-none transition-all group-hover:opacity-100 italic">”</span>
            </p>
          </div>
        </div>
      )}

      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-800 tracking-tight">{t('interpretation.title')}</h2>
        <p className="text-xs text-slate-500 uppercase font-bold tracking-widest mt-1">{t('interpretation.subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {interpretations.map((item, index) => {
          const tooltipKey = item.metric === 'Breakeven ROAS' ? 'breakevenROAS' : item.metric === 'Gross Margin' ? 'marginPercent' : 'rogp';
          
          return (
            <div 
              key={index}
              className="group bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full"
            >
              <div className="flex items-center justify-between mb-4">
                <Tooltip title={t(`tooltips.${tooltipKey}`)}>
                  <div className="flex items-center gap-2 text-indigo-600 cursor-help">
                    {getIcon(item.metric)}
                    <span className="text-[10px] font-bold uppercase tracking-widest">{t(`modules.${tooltipKey}`)}</span>
                  </div>
                </Tooltip>
                <Tag color={getStatusColor(item.status)} className="rounded-full px-3 text-[10px] font-bold uppercase border-none">
                  {t(`interpretation.badges.${item.status}`)}
                </Tag>
              </div>

              <div className="flex-1">
                <p className="text-sm text-slate-700 font-medium leading-relaxed mb-4">
                  {t(`interpretation.${item.summaryKey}`)}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-50">
                <div className="flex gap-2 items-start">
                  <AlertCircle className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest block mb-1">
                      {t('interpretation.recommendation')}
                    </span>
                    <p className="text-xs text-slate-500 leading-relaxed italic">
                      {t(`interpretation.${item.recommendationKey}`)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
