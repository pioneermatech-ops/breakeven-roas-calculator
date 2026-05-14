import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { InputNumber, Select, Tooltip, Typography, Space } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { motion } from 'motion/react';
import { getInterpretation, getBottomLine } from '../lib/interpretationRules';
import InterpretationSection from './InterpretationSection';

const { Text } = Typography;

interface Inputs {
  sellingPrice: number | null;
  aov: number | null;
  currency: string;
  cogs: number | null;
  shipping: number | null;
  transactionFees: number | null;
  packaging: number | null;
  otherVariable: number | null;
  fixedCosts: number | null;
  adSpend: number | null;
  targetMargin: number | null;
  actualROAS: number | null;
}

const INITIAL_INPUTS: Inputs = {
  sellingPrice: null,
  aov: null,
  currency: 'USD',
  cogs: null,
  shipping: null,
  transactionFees: null,
  packaging: null,
  otherVariable: null,
  fixedCosts: null,
  adSpend: null,
  targetMargin: null,
  actualROAS: null,
};

export default function Calculator() {
  const { t } = useTranslation();
  const [inputs, setInputs] = useState<Inputs>(INITIAL_INPUTS);

  const updateInput = (key: keyof Inputs, value: number | string | null) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
  };

  const results = useMemo(() => {
    const sellingPrice = inputs.sellingPrice || 0;
    const aov = inputs.aov || 0;
    const cogs = inputs.cogs || 0;
    const shipping = inputs.shipping || 0;
    const transactionFees = inputs.transactionFees || 0;
    const packaging = inputs.packaging || 0;
    const otherVariable = inputs.otherVariable || 0;
    const fixedCosts = inputs.fixedCosts || 0;
    const adSpend = inputs.adSpend || 0;
    const actualROAS = inputs.actualROAS || 0;

    const totalVariableCosts = cogs + shipping + transactionFees + packaging + otherVariable;
    const contributionMargin = sellingPrice - totalVariableCosts;
    const grossProfitPerOrder = aov - totalVariableCosts;
    
    const breakevenUnits = contributionMargin > 0 ? fixedCosts / contributionMargin : Infinity;
    const breakevenROAS = grossProfitPerOrder > 0 ? aov / grossProfitPerOrder : Infinity;
    
    const simulatedRevenue = adSpend * actualROAS;
    const simulatedOrders = aov > 0 ? simulatedRevenue / aov : 0;
    const totalGrossProfit = simulatedOrders * grossProfitPerOrder;
    const netProfit = totalGrossProfit - fixedCosts;
    const rogp = adSpend > 0 ? totalGrossProfit / adSpend : 0;

    const marginPercent = aov > 0 ? (grossProfitPerOrder / aov) * 100 : 0;
    
    const netProfitPercent = simulatedRevenue > 0 ? (netProfit / simulatedRevenue) * 100 : 0;
    const fixedCostsPercent = simulatedRevenue > 0 ? (fixedCosts / simulatedRevenue) * 100 : 0;
    const adSpendPercent = simulatedRevenue > 0 ? (adSpend / simulatedRevenue) * 100 : 0;

    const isReady = inputs.aov !== null && inputs.sellingPrice !== null && inputs.cogs !== null;

    return {
      totalVariableCosts,
      contributionMargin,
      grossProfitPerOrder,
      breakevenUnits: isFinite(breakevenUnits) ? Math.ceil(breakevenUnits) : null,
      breakevenROAS: isFinite(breakevenROAS) ? breakevenROAS : null,
      simulatedRevenue,
      totalGrossProfit,
      netProfit,
      marginPercent,
      rogp: rogp, // as multiplier
      netProfitPercent,
      fixedCostsPercent,
      adSpendPercent,
      isReady,
      interpretations: getInterpretation(breakevenROAS, rogp, marginPercent),
      bottomLine: getBottomLine(actualROAS, breakevenROAS, marginPercent)
    };
  }, [inputs]);

  const currencySymbol = useMemo(() => {
    switch (inputs.currency) {
      case 'USD': return '$';
      case 'CNY': return '¥';
      case 'EUR': return '€';
      case 'GBP': return '£';
      default: return '$';
    }
  }, [inputs.currency]);

  const formatCurrency = (val: number | null) => {
    if (val === null || (val === 0 && !results.isReady)) return '-';
    return `${currencySymbol}${val.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const formatNumber = (val: number | null, precision: number = 2, suffix: string = '') => {
    if (val === null || isNaN(val) || (val === 0 && !results.isReady)) return '-';
    return `${val.toFixed(precision)}${suffix}`;
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-6 flex-col lg:flex-row">
        {/* Sidebar: Inputs */}
        <aside className="w-full lg:w-[360px] flex flex-col gap-6 shrink-0">
          <section className="space-y-4">
            <div className="flex items-center justify-between uppercase tracking-wider text-[10px] font-bold text-slate-400">
              <span>{t('inputs.revenue')}</span>
              <Select
                variant="borderless"
                className="text-[10px] text-indigo-600 font-bold"
                value={inputs.currency}
                onChange={(v) => updateInput('currency', v)}
                options={[
                  { value: 'USD', label: 'USD ($)' },
                  { value: 'CNY', label: 'CNY (¥)' },
                  { value: 'EUR', label: 'EUR (€)' },
                  { value: 'GBP', label: 'GBP (£)' },
                ]}
              />
            </div>
            <div className="space-y-3">
              <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-xs focus-within:ring-2 ring-indigo-500 ring-opacity-20 transition-all">
                <div className="flex justify-between mb-1">
                  <label className="text-[10px] uppercase font-bold text-slate-400">{t('inputs.sellingPrice')}</label>
                  <Tooltip title={t('tooltips.sellingPrice')}>
                    <div className="w-4 h-4 rounded-full border border-slate-200 text-[10px] flex items-center justify-center text-slate-400 cursor-help hover:border-indigo-400 hover:text-indigo-600 transition-all duration-200">?</div>
                  </Tooltip>
                </div>
                <InputNumber
                  variant="borderless"
                  className="w-full !p-0 text-lg font-bold"
                  value={inputs.sellingPrice}
                  onChange={(v) => updateInput('sellingPrice', v)}
                  prefix={currencySymbol}
                  placeholder="00"
                />
              </div>
              <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-xs transition-all">
                <div className="flex justify-between mb-1">
                  <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">{t('inputs.aov')}</label>
                  <Tooltip title={t('tooltips.aov')}>
                    <div className="w-4 h-4 rounded-full border border-slate-200 text-[10px] flex items-center justify-center text-slate-400 cursor-help hover:border-indigo-400 hover:text-indigo-600 transition-all duration-200">?</div>
                  </Tooltip>
                </div>
                <InputNumber
                  variant="borderless"
                  className="w-full !p-0 text-lg font-bold"
                  value={inputs.aov}
                  onChange={(v) => updateInput('aov', v)}
                  prefix={currencySymbol}
                  placeholder="00"
                />
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <div className="uppercase tracking-wider text-[10px] font-bold text-slate-400">{t('inputs.costs')}</div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { key: 'cogs', label: t('inputs.cogs'), tooltip: t('tooltips.cogs') },
                { key: 'shipping', label: t('inputs.shipping'), tooltip: t('tooltips.shipping') },
                { key: 'transactionFees', label: t('inputs.transactionFees'), tooltip: t('tooltips.transactionFees') },
                { key: 'packaging', label: t('inputs.packaging'), tooltip: t('tooltips.packaging') },
                { key: 'otherVariable', label: t('inputs.otherVariable') || 'Other Var.', tooltip: 'Any other per-order variable costs.' },
              ].map((item) => (
                <div key={item.key} className="bg-white border border-slate-200 rounded-xl p-3 shadow-xs transition-all">
                  <div className="flex justify-between mb-1">
                    <label className="text-[10px] text-slate-500 block uppercase font-bold">{item.label}</label>
                    <Tooltip title={item.tooltip}>
                      <div className="w-4 h-4 rounded-full border border-slate-200 text-[10px] flex items-center justify-center text-slate-400 cursor-help hover:border-indigo-400 hover:text-indigo-600 transition-all duration-200">?</div>
                    </Tooltip>
                  </div>
                  <InputNumber
                    variant="borderless"
                    className="w-full !p-0 text-sm font-bold"
                    value={inputs[item.key as keyof Inputs] as number}
                    onChange={(v) => updateInput(item.key as keyof Inputs, v)}
                    prefix={currencySymbol}
                    placeholder="00"
                  />
                </div>
              ))}
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-xs transition-all">
              <div className="flex justify-between mb-1">
                <label className="text-[10px] text-slate-500 block uppercase font-bold">{t('inputs.fixedCosts')}</label>
                <Tooltip title={t('tooltips.fixedCosts')}>
                  <div className="w-4 h-4 rounded-full border border-slate-200 text-[10px] flex items-center justify-center text-slate-400 cursor-help hover:border-indigo-400 hover:text-indigo-600 transition-all duration-200">?</div>
                </Tooltip>
              </div>
              <InputNumber
                variant="borderless"
                className="w-full !p-0 text-sm font-bold"
                value={inputs.fixedCosts}
                onChange={(v) => updateInput('fixedCosts', v)}
                prefix={currencySymbol}
                placeholder="00"
              />
            </div>
          </section>

          <section className="space-y-4">
            <div className="uppercase tracking-wider text-[10px] font-bold text-slate-400">{t('inputs.advertising')}</div>
            <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <label className="text-xs font-bold text-indigo-900">{t('inputs.adSpend')}</label>
                  <Tooltip title={t('tooltips.adSpend')}>
                    <div className="w-4 h-4 rounded-full border border-indigo-200 text-[10px] flex items-center justify-center text-indigo-400 cursor-help hover:border-indigo-600 hover:text-indigo-600 transition-all duration-200">?</div>
                  </Tooltip>
                </div>
                <span className="text-indigo-600 text-[10px] font-bold">{formatCurrency(inputs.adSpend)}</span>
              </div>
                <InputNumber
                  variant="outlined"
                  className="w-full"
                  value={inputs.adSpend}
                  onChange={(v) => updateInput('adSpend', v)}
                  prefix={currencySymbol}
                  placeholder="00"
                />
              </div>
              <div className="flex gap-4">
              <div className="flex-1">
                <div className="flex justify-between mb-1">
                  <label className="text-[10px] text-indigo-700 block uppercase font-bold">{t('inputs.actualROAS')}</label>
                  <Tooltip title={t('tooltips.actualROAS')}>
                    <div className="w-4 h-4 rounded-full border border-indigo-200 text-[10px] flex items-center justify-center text-indigo-400 cursor-help hover:border-indigo-600 hover:text-indigo-600 transition-all duration-200">?</div>
                  </Tooltip>
                </div>
                <InputNumber
                  className="w-full"
                  value={inputs.actualROAS}
                  onChange={(v) => updateInput('actualROAS', v)}
                  precision={2}
                  suffix="x"
                  placeholder="00"
                />
              </div>
              <div className="flex-1">
                <div className="flex justify-between mb-1">
                  <label className="text-[10px] text-indigo-700 block uppercase font-bold">{t('inputs.targetMargin')}</label>
                  <Tooltip title={t('tooltips.targetMargin')}>
                    <div className="w-4 h-4 rounded-full border border-indigo-200 text-[10px] flex items-center justify-center text-indigo-400 cursor-help hover:border-indigo-600 hover:text-indigo-600 transition-all duration-200">?</div>
                  </Tooltip>
                </div>
                <InputNumber
                  className="w-full"
                  value={inputs.targetMargin}
                  onChange={(v) => updateInput('targetMargin', v)}
                  precision={1}
                  suffix="%"
                  placeholder="00"
                />
              </div>
              </div>
            </div>
          </section>
        </aside>

        {/* Main Content: Results */}
        <div className="flex-1 flex flex-col gap-6">
          {/* Top Dashboard Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t('results.breakevenROAS')}</span>
                <Tooltip title={t('tooltips.breakevenROAS')}>
                  <div className="w-4 h-4 rounded-full border border-slate-200 text-[10px] flex items-center justify-center text-slate-400 cursor-help hover:border-indigo-400 hover:text-indigo-600 transition-all duration-200">?</div>
                </Tooltip>
              </div>
              <div className="text-4xl font-extrabold text-slate-900 tracking-tight">
                {formatNumber(results.breakevenROAS, 2, 'x')}
              </div>
              <div className="mt-4 flex items-center gap-2">
                <div className="h-1 flex-1 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, ((inputs.actualROAS || 0) / (results.breakevenROAS || 1)) * 50)}%` }}
                    className={`h-full transition-all duration-500 ${results.breakevenROAS < (inputs.actualROAS || 0) ? 'bg-emerald-500' : 'bg-red-400'}`}
                  ></motion.div>
                </div>
                <span className={`text-[10px] font-bold uppercase ${results.breakevenROAS < (inputs.actualROAS || 0) ? 'text-emerald-600' : 'text-red-500'}`}>
                  {results.breakevenROAS < (inputs.actualROAS || 0) ? 'Healthy' : 'Warning'}
                </span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t('results.contributionMargin')} %</span>
                <Tooltip title={t('tooltips.contributionMargin')}>
                  <div className="w-4 h-4 rounded-full border border-slate-200 text-[10px] flex items-center justify-center text-slate-400 cursor-help hover:border-indigo-400 hover:text-indigo-600 transition-all duration-200">?</div>
                </Tooltip>
              </div>
              <div className="text-4xl font-extrabold text-slate-900 tracking-tight">
                {formatNumber(results.marginPercent, 1, '%')}
              </div>
              <div className="mt-4 text-xs font-bold text-slate-400 uppercase">
                {formatCurrency(results.grossProfitPerOrder)} {t('results.profitPerOrder')}
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t('results.rogp')}</span>
                <Tooltip title={t('tooltips.rogp')}>
                  <div className="w-4 h-4 rounded-full border border-slate-200 text-[10px] flex items-center justify-center text-slate-400 cursor-help hover:border-indigo-400 hover:text-indigo-600 transition-all duration-200">?</div>
                </Tooltip>
              </div>
              <div className="text-4xl font-extrabold text-indigo-600 tracking-tight">
                {formatNumber(results.rogp, 2, 'x')}
              </div>
              <div className="mt-4 text-xs font-bold text-indigo-400 uppercase">
                {t('results.rogp')}
              </div>
            </div>
          </div>

          {/* Detailed Breakdown & Visualization */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-6">
            <div className="bg-slate-900 text-white rounded-2xl p-6 flex flex-col shadow-xl">
              <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-8">{t('results.title')} - Unit Economics</h3>
              <div className="space-y-6 flex-1">
                <div className="flex justify-between items-center py-2 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase text-slate-500 tracking-wider">{t('inputs.costs')} (Total Variable)</span>
                    <Tooltip title={t('tooltips.totalVariableCosts')}>
                      <div className="w-4 h-4 rounded-full border border-slate-700 text-[10px] flex items-center justify-center text-slate-500 cursor-help hover:border-indigo-400 hover:text-indigo-400 transition-all duration-200">?</div>
                    </Tooltip>
                  </div>
                  <span className="text-sm font-bold text-slate-200">{formatCurrency(results.totalVariableCosts)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase text-slate-500 tracking-wider">{t('results.profitPerOrder')}</span>
                    <Tooltip title={t('tooltips.grossProfitPerOrder')}>
                      <div className="w-4 h-4 rounded-full border border-slate-700 text-[10px] flex items-center justify-center text-slate-500 cursor-help hover:border-indigo-400 hover:text-indigo-400 transition-all duration-200">?</div>
                    </Tooltip>
                  </div>
                  <span className="text-sm font-bold text-emerald-400">{formatCurrency(results.grossProfitPerOrder)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase text-slate-500 tracking-wider">{t('results.breakevenUnits')}</span>
                    <Tooltip title={t('tooltips.breakevenUnits')}>
                      <div className="w-4 h-4 rounded-full border border-slate-700 text-[10px] flex items-center justify-center text-slate-500 cursor-help hover:border-indigo-400 hover:text-indigo-400 transition-all duration-200">?</div>
                    </Tooltip>
                  </div>
                  <span className="text-sm font-bold text-slate-200">
                    {results.breakevenUnits !== null ? `${results.breakevenUnits} ${t('results.unit')}` : '-'}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase text-slate-500 tracking-wider">{t('results.netProfit')}</span>
                    <Tooltip title={t('tooltips.netProfit')}>
                      <div className="w-4 h-4 rounded-full border border-slate-700 text-[10px] flex items-center justify-center text-slate-500 cursor-help hover:border-indigo-400 hover:text-indigo-400 transition-all duration-200">?</div>
                    </Tooltip>
                  </div>
                  <span className={`text-sm font-bold ${results.netProfit >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                    {formatCurrency(results.netProfit)}
                  </span>
                </div>
              </div>
              <div className="mt-8 p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-xl">
                <p className="text-xs text-indigo-300 italic font-medium leading-relaxed">
                  {t('formulas.rogp')}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col shadow-sm">
              <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-8">{t('results.summary')} - Visualization</h3>
              <div className="flex-1 flex items-end gap-6 pb-6 px-4 min-h-[300px]">
                {/* Fixed Costs Bar */}
                <div className="flex-1 flex flex-col items-center gap-3 h-full justify-end">
                  <div className="w-full bg-slate-50 rounded-t-lg relative h-[200px]">
                    <motion.div 
                      initial={{ height: 0 }}
                      animate={{ height: `${Math.min(100, results.fixedCostsPercent)}%` }}
                      className="absolute bottom-0 w-full bg-slate-200 rounded-t-lg flex flex-col items-center justify-start pt-2 overflow-hidden"
                    >
                      {results.fixedCostsPercent > 10 && (
                        <span className="text-[9px] font-bold text-slate-500 whitespace-nowrap">{results.fixedCostsPercent.toFixed(0)}%</span>
                      )}
                    </motion.div>
                    {results.fixedCostsPercent <= 10 && (
                      <div className="absolute w-full text-center -top-5">
                        <span className="text-[9px] font-bold text-slate-400">{results.fixedCostsPercent.toFixed(0)}%</span>
                      </div>
                    )}
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">{t('inputs.fixedCosts')}</span>
                </div>

                {/* Ad Spend Bar */}
                <div className="flex-1 flex flex-col items-center gap-3 h-full justify-end">
                  <div className="w-full bg-slate-50 rounded-t-lg relative h-[200px]">
                    <motion.div 
                      initial={{ height: 0 }}
                      animate={{ height: `${Math.min(100, results.adSpendPercent)}%` }}
                      className="absolute bottom-0 w-full bg-indigo-500/80 rounded-t-lg shadow-[0_0_15px_rgba(99,102,241,0.2)] flex flex-col items-center justify-start pt-2 overflow-hidden"
                    >
                      {results.adSpendPercent > 10 && (
                        <span className="text-[9px] font-bold text-white whitespace-nowrap">{results.adSpendPercent.toFixed(0)}%</span>
                      )}
                    </motion.div>
                    {results.adSpendPercent <= 10 && (
                      <div className="absolute w-full text-center -top-5">
                        <span className="text-[9px] font-bold text-indigo-500">{results.adSpendPercent.toFixed(0)}%</span>
                      </div>
                    )}
                  </div>
                  <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-tight">{t('inputs.adSpend')}</span>
                </div>

                {/* Net Profit Bar */}
                <div className="flex-1 flex flex-col items-center gap-3 h-full justify-end">
                  <div className="w-full bg-slate-50 rounded-t-lg relative h-[200px]">
                    <motion.div 
                      initial={{ height: 0 }}
                      animate={{ height: `${Math.max(0, Math.min(100, results.netProfitPercent))}%` }}
                      className={`absolute bottom-0 w-full rounded-t-lg flex flex-col items-center justify-start pt-2 overflow-hidden shadow-sm ${results.netProfit >= 0 ? 'bg-emerald-500' : 'bg-red-400'}`}
                    >
                      {Math.abs(results.netProfitPercent) > 10 && (
                        <span className="text-[9px] font-bold text-white whitespace-nowrap">{results.netProfitPercent.toFixed(0)}%</span>
                      )}
                    </motion.div>
                    {Math.abs(results.netProfitPercent) <= 10 && (
                      <div className="absolute w-full text-center -top-5">
                        <span className={`text-[9px] font-bold ${results.netProfit >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>{results.netProfitPercent.toFixed(0)}%</span>
                      </div>
                    )}
                  </div>
                  <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-tight">{t('results.netProfit')}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-4 pt-6 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-slate-200"></div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t('inputs.fixedCosts')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-indigo-500/80"></div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t('inputs.adSpend')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t('results.netProfit')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <InterpretationSection 
        interpretations={results.interpretations} 
        bottomLine={results.bottomLine} 
      />

    </div>
  );
}
