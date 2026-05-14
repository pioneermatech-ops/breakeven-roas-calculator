export type InterpretationStatus = 'healthy' | 'moderate' | 'risky' | 'aggressive' | 'efficient' | 'strong' | 'weak' | 'average' | 'thin';

export interface InterpretationResult {
  metric: string;
  status: InterpretationStatus;
  summaryKey: string;
  recommendationKey: string;
}

export interface BottomLineResult {
  mood: 'great' | 'okay' | 'caution' | 'bad';
  messageKey: string;
}

export function getBottomLine(
  actualROAS: number,
  breakevenROAS: number,
  grossMarginPercent: number
): BottomLineResult {
  if (!breakevenROAS || breakevenROAS === 0) {
    return { mood: 'okay', messageKey: 'bottomLine.idle' };
  }

  const roasGap = actualROAS - breakevenROAS;

  // Scenario 1: Printing Money
  if (roasGap > 1 && grossMarginPercent > 50) {
    return { mood: 'great', messageKey: 'bottomLine.printingMoney' };
  }

  // Scenario 2: Making Money but could be better
  if (roasGap > 0.2) {
    if (grossMarginPercent < 40) {
      return { mood: 'caution', messageKey: 'bottomLine.thinProfit' };
    }
    return { mood: 'okay', messageKey: 'bottomLine.makingMoney' };
  }

  // Scenario 3: Hovering around breakeven
  if (Math.abs(roasGap) <= 0.2) {
    return { mood: 'caution', messageKey: 'bottomLine.breakevenStruggle' };
  }

  // Scenario 4: Losing Money
  if (roasGap < -0.5) {
    return { mood: 'bad', messageKey: 'bottomLine.bleeding' };
  }

  // Default fallback for slight negative
  return { mood: 'caution', messageKey: 'bottomLine.underperforming' };
}

export function getInterpretation(
  breakevenROAS: number,
  rogp: number, // multiplier, e.g., 2.5
  grossMarginPercent: number // percentage, e.g., 45
): InterpretationResult[] {
  if (!breakevenROAS || breakevenROAS === 0) return [];
  
  const results: InterpretationResult[] = [];

  // 1. Breakeven ROAS Interpretation
  let roasStatus: InterpretationStatus = 'moderate';
  let roasSummary = 'roas.moderate.summary';
  let roasRec = 'roas.moderate.recommendation';

  if (breakevenROAS < 1.8) {
    roasStatus = 'healthy';
    roasSummary = 'roas.healthy.summary';
    roasRec = 'roas.healthy.recommendation';
  } else if (breakevenROAS > 3) {
    roasStatus = 'risky';
    roasSummary = 'roas.risky.summary';
    roasRec = 'roas.risky.recommendation';
  }

  results.push({
    metric: 'Breakeven ROAS',
    status: roasStatus,
    summaryKey: roasSummary,
    recommendationKey: roasRec,
  });

  // 2. Return on Gross Profit (ROGP) Interpretation
  const rogpPercent = (rogp - 1) * 100; // Convert multiplier to profit margin over spend
  let rogpStatus: InterpretationStatus = 'moderate';
  let rogpSummary = 'rogp.moderate.summary';
  let rogpRec = 'rogp.moderate.recommendation';

  if (rogpPercent > 25) {
    rogpStatus = 'strong';
    rogpSummary = 'rogp.strong.summary';
    rogpRec = 'rogp.strong.recommendation';
  } else if (rogpPercent < 10) {
    rogpStatus = 'weak';
    rogpSummary = 'rogp.weak.summary';
    rogpRec = 'rogp.weak.recommendation';
  }

  results.push({
    metric: 'Return on Gross Profit',
    status: rogpStatus,
    summaryKey: rogpSummary,
    recommendationKey: rogpRec,
  });

  // 3. Gross Margin Interpretation
  let marginStatus: InterpretationStatus = 'average';
  let marginSummary = 'margin.average.summary';
  let marginRec = 'margin.average.recommendation';

  if (grossMarginPercent > 60) {
    marginStatus = 'healthy';
    marginSummary = 'margin.healthy.summary';
    marginRec = 'margin.healthy.recommendation';
  } else if (grossMarginPercent < 40) {
    marginStatus = 'thin';
    marginSummary = 'margin.thin.summary';
    marginRec = 'margin.thin.recommendation';
  }

  results.push({
    metric: 'Gross Margin',
    status: marginStatus,
    summaryKey: marginSummary,
    recommendationKey: marginRec,
  });

  return results;
}
