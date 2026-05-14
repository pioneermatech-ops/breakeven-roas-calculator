import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      title: 'Breakeven ROAS Calculator',
      description: 'Calculate your eCommerce profitability metrics instantly.',
      summary: {
        title: 'The Bottom Line',
        operatorMode: 'Operator Mode',
        bottomLine: {
          idle: 'Enter your numbers above to see if your business is actually making money.',
          printingMoney: "Honestly? You're killing it. Your margins are fat and your ad costs are low. You've basically got a money machine here. Don't overthink it, just scale.",
          makingMoney: "You're making money, which is more than most can say. There's room to grow, but keep an eye on those rising ad costs.",
          thinProfit: "You're making a profit, but it's paper-thin. You're basically working for your suppliers and shipping carriers right now. Fix the product cost or raise prices.",
          breakevenStruggle: "You're dancing on the edge. One bad week of ad performance could wipe out your profit. It's a tightrope walk right now.",
          underperforming: "You're slightly underwater. The product is likely fine, but your marketing efficiency or margins need a quick adjustment to hit daylight.",
          bleeding: "Look, this isn't working yet. You're spending too much to get customers on a product that doesn't have enough margin. Stop scaling and fix the math first.",
        }
      },
      modules: {
        breakevenPoint: 'Breakeven Point',
        breakevenROAS: 'Breakeven ROAS',
        rogp: 'Return on Gross Profit (ROGP)',
      },
      inputs: {
        revenue: 'Revenue Inputs',
        sellingPrice: 'Product Selling Price',
        aov: 'Average Order Value (AOV)',
        currency: 'Currency',
        costs: 'Cost Inputs',
        cogs: 'Product Cost (COGS)',
        shipping: 'Shipping Cost',
        transactionFees: 'Transaction Fees',
        agencyFee: 'Agency Fee',
        packaging: 'Packaging Cost',
        otherVariable: 'Other Variable Costs',
        fixedCosts: 'Fixed Costs',
        advertising: 'Advertising Inputs',
        adSpend: 'Ad Spend',
        actualROAS: 'Actual ROAS',
        targetMargin: 'Target Profit Margin (%)',
      },
      results: {
        summary: 'Calculation Results',
        grossProfit: 'Gross Profit',
        contributionMargin: 'Contribution Margin',
        profitPerOrder: 'Profit per Order',
        breakevenUnits: 'Breakeven Units',
        breakevenROAS: 'Breakeven ROAS',
        rogp: 'ROGP',
        efficiency: 'Efficiency after Ad Spend',
        estMonthlyRevenue: 'Est. Monthly Revenue',
        totalGrossProfit: 'Total Gross Profit',
        netProfit: 'Net Profit (After Fixed)',
        unit: 'Orders',
      },
      tooltips: {
        sellingPrice: 'The price at which you sell a single unit of your product.',
        aov: 'The average amount a customer spends per transaction.',
        cogs: 'The total cost of manufacturing or acquiring the product.',
        shipping: 'Cost to deliver the order to the customer.',
        transactionFees: 'Fees from payment processors (e.g., Stripe, PayPal).',
        agencyFee: 'Fees paid to marketing or management agencies.',
        packaging: 'Cost of boxes, tape, and labels.',
        fixedCosts: 'Operating expenses that do not change with sales volume.',
        adSpend: 'Your total budget spent on advertising.',
        targetMargin: 'The specific profit percentage you aim to achieve.',
        breakevenROAS: 'The minimum ROAS needed to avoid losing money.',
        rogp: 'Measures how much gross profit is generated for every dollar of ad spend.',
        actualROAS: 'Your actual marketing performance from ad platforms.',
        contributionMargin: 'Percentage of revenue remaining after subtracting total variable costs.',
        marginPercent: 'Percentage of AOV remaining after subtracting total variable costs.',
        totalVariableCosts: 'Sum of COGS, shipping, transaction fees, and packaging.',
        grossProfitPerOrder: 'Revenue minus total variable costs per single order.',
        breakevenUnits: 'The number of orders required to cover all fixed and variable expenses.',
        netProfit: 'Final profit remaining after all expenses and ad spend.',
      },
      formulas: {
        breakevenROAS: 'Determines the exact point where advertising revenue equals total costs of goods and fulfillment.',
        contributionMargin: 'The percentage of each dollar that contributes to covering fixed costs and generating net profit.',
        rogp: 'Efficiency metric measuring how effectively ad spend converts into raw profit before fixed expenses.',
      },
      faq: {
        title: 'Frequently Asked Questions',
        subtitle: 'Knowledge Base',
      },
      footer: {
        description: 'Precise unit economics and profitability analysis for high-growth DTC brands.',
        tagline: 'Built for Performance Marketers',
      },
      interpretation: {
        title: 'Business Interpretation',
        subtitle: 'What These Numbers Mean',
        recommendation: 'Recommendation',
        badges: {
          healthy: 'Healthy',
          moderate: 'Moderate',
          risky: 'Risky',
          aggressive: 'Aggressive',
          efficient: 'Efficient',
          strong: 'Strong',
          weak: 'Weak',
          average: 'Average',
          thin: 'Thin Margin',
        },
        roas: {
          healthy: {
            summary: 'You have relatively healthy unit economics, giving your paid acquisition campaigns more room to scale efficiently.',
            recommendation: 'You may have capacity to scale more aggressively while maintaining profitability.',
          },
          moderate: {
            summary: 'Your breakeven ROAS is in a standard range. Profitability will depend heavily on creative testing and conversion rate optimization.',
            recommendation: 'Focus on improving AOV and reducing churn to increase the lifetime value of each acquisition.',
          },
          risky: {
            summary: 'Your breakeven ROAS is relatively high, which means your contribution margins are tight. Scaling paid ads profitably may become difficult.',
            recommendation: 'Consider improving pricing, bundling, AOV, or reducing operational costs before scaling spend.',
          }
        },
        rogp: {
          strong: {
            summary: 'Your return on gross profit is strong, indicating high efficiency in converting ad spend into real profit.',
            recommendation: 'Look for opportunities to reinvest this profit into brand building or inventory expansion.',
          },
          moderate: {
            summary: 'Your return on gross profit is healthy but has room for optimization.',
            recommendation: 'Review your middle-of-funnel conversion tactics to squeeze more profit from existing traffic.',
          },
          weak: {
            summary: 'Your return on gross profit is currently weak, which may indicate inefficient acquisition costs.',
            recommendation: 'Review CAC efficiency, pricing strategy, and operational overhead immediately.',
          }
        },
        margin: {
          healthy: {
            summary: 'High gross margins provide a strong buffer against rising ad costs and competitive pressure.',
            recommendation: 'Maintain your premium positioning and invest in product R&D to stay ahead.',
          },
          average: {
            summary: 'Your gross margins are within the industry average for DTC brands.',
            recommendation: 'Monitor supply chain costs and fulfillment efficiency to prevent margin erosion.',
          },
          thin: {
            summary: 'Your gross margins are thin, leaving little room for error in your marketing or operations.',
            recommendation: 'Consider a price increase or renegotiating with suppliers to improve your baseline profitability.',
          }
        }
      },
      seo: {
        metaTitle: 'Breakeven ROAS Calculator for Shopify & DTC Brands',
        metaDescription: 'Calculate your Breakeven ROAS, gross profit, and profitability instantly. Free calculator for Shopify stores, media buyers, and DTC brands.',
        introTitle: 'Master Your Profitability with the Breakeven ROAS Calculator',
        introBody: 'For modern DTC brands and Shopify store owners, understanding your numbers is the difference between scaling a business and burning cash. Breakeven ROAS (Return on Ad Spend) is the critical threshold where your revenue covers all costs, including COGS, shipping, and transaction fees. Use this tool to visualize your unit economics and find the exact efficiency required to stay profitable.',
        questions: [
          {
            q: 'What is Breakeven ROAS?',
            a: 'Breakeven ROAS is the minimum advertising return required to cover your total costs (COGS, shipping, fees, etc.) without making a loss. If your ROAS is below this point, you are losing money on every order.'
          },
          {
            q: 'How do you calculate Breakeven ROAS?',
            a: 'The formula is: Breakeven ROAS = Average Order Value / (AOV - Total Variable Costs). Total variable costs include everything required to fulfill an order.'
          },
          {
            q: 'What is the difference between ROAS and MER?',
            a: 'ROAS (Return on Ad Spend) measures the return for a specific ad platform. MER (Marketing Efficiency Ratio) measures total revenue divided by total marketing spend across all channels.'
          }
        ]
      }
    }
  },
  zh: {
    translation: {
      title: '盈亏平衡 ROAS 计算器',
      description: '即时计算您的电子商务盈利指标。',
      summary: {
        title: '核心总结',
        operatorMode: '操盘手模式',
        bottomLine: {
          idle: '在上方输入数据，看看你的生意是否真的在赚钱。',
          printingMoney: '说实话？你现在太猛了。利润够厚，广告成本又低。你这简直就是个印钞机。别犹豫了，赶紧拉规模吧。',
          makingMoney: '你在赚钱，这已经比大多数人强了。还有增长空间，但要留意近期不断上涨的广告成本。',
          thinProfit: '虽然在赚钱，但利润薄得像张纸。你现在基本上是在给供应商和物流公司打工。得想办法压低产品成本或者涨价。',
          breakevenStruggle: '你在盈亏线上跳舞。广告表现稍微差一个礼拜，利润就全打水漂了。现在的状态就像是在走钢丝。',
          underperforming: '你现在稍微有点入不敷出。产品可能没问题，但营销效率或者毛利率得赶紧调一调，不然很难出头。',
          bleeding: '听着，现在的路子走不通。给一个利润不够的产品砸了太多广告费。别再蒙头冲规模了，先停下来把账算清楚。',
        }
      },
      modules: {
        breakevenPoint: '盈亏平衡点',
        breakevenROAS: '盈亏平衡 ROAS',
        rogp: '毛利回报率 (ROGP)',
      },
      inputs: {
        revenue: '收入输入',
        sellingPrice: '产品销售价格',
        aov: '平均订单价值 (AOV)',
        currency: '货币',
        costs: '成本输入',
        cogs: '产品成本 (COGS)',
        shipping: '物流成本',
        transactionFees: '交易手续费',
        agencyFee: '代理费',
        packaging: '包装成本',
        otherVariable: '其他变动成本',
        fixedCosts: '固定成本',
        advertising: '广告输入',
        adSpend: '广告支出',
        actualROAS: '实际 ROAS',
        targetMargin: '目标利润率 (%)',
      },
      results: {
        summary: '计算结果',
        grossProfit: '毛利润',
        contributionMargin: '边际贡献',
        profitPerOrder: '单笔订单利润',
        breakevenUnits: '盈亏平衡销量',
        breakevenROAS: '盈亏平衡 ROAS',
        rogp: 'ROGP',
        efficiency: '广告支出后的效率',
        estMonthlyRevenue: '预估月收入',
        totalGrossProfit: '总毛利润',
        netProfit: '净利润 (扣除固定成本)',
        unit: '单',
      },
      tooltips: {
        sellingPrice: '您销售单个产品的价格。',
        aov: '客户每次交易的平均支出金额。',
        cogs: '制造或采购产品的总成本。',
        shipping: '将订单交付给客户的费用。',
        transactionFees: '支付处理商（如 Stripe, PayPal）收取的费用。',
        agencyFee: '支付给营销或管理机构的费用。',
        packaging: '纸箱、胶带和标签的成本。',
        fixedCosts: '不随销售增长而变化的运营支出。',
        adSpend: '您的广告预算总额。',
        targetMargin: '您希望实现的特定利润百分比。',
        actualROAS: '您广告平台的实际营销表现。',
        breakevenROAS: '不亏损所需要达到的最低广告回报率。',
        rogp: '衡量每花费一美元广告费能产生多少毛利润。',
        contributionMargin: '除去所有变动成本后剩下的收入百分比。',
        marginPercent: '除去所有变动成本后剩下的 AOV 百分比。',
        totalVariableCosts: '货物成本、运费、交易费和包装费的总和。',
        grossProfitPerOrder: '单个订单的收入减去总变动成本。',
        breakevenUnits: '覆盖所有固定和变动支出所需的订单数量。',
        netProfit: '扣除所有支出和广告费用后剩下的最终利润。',
      },
      formulas: {
        breakevenROAS: '确定广告收入等于售出货物总成本和履行成本的精确点。',
        contributionMargin: '每一美元收入中用于支付固定成本并产生净利润的百分比。',
        rogp: '衡量广告支出在扣除固定费用前转化为原始利润的效率指标。',
      },
      faq: {
        title: '常见问题',
        subtitle: '知识库',
      },
      footer: {
        description: '为快速增长的 DTC 品牌提供精确的单位经济效益和盈利能力分析。',
        tagline: '为效果营销人员打造',
      },
      interpretation: {
        title: '业务解读',
        subtitle: '这些数据意味着什么',
        recommendation: '改进建议',
        badges: {
          healthy: '健康',
          moderate: '适中',
          risky: '高风险',
          aggressive: '激进',
          efficient: '高效',
          strong: '强劲',
          weak: '薄弱',
          average: '平均水平',
          thin: '低毛利',
        },
        roas: {
          healthy: {
            summary: '您的单位经济效益相对健康，这让您的营销活动有更大的空间在保持效率的同时进行规模化。',
            recommendation: '您有能力在保持盈利的同时，更加激进地扩大投放规模。',
          },
          moderate: {
            summary: '您的盈亏平衡 ROAS 处于标准范围。盈利能力将高度依赖于素材测试和转化率优化。',
            recommendation: '重点关注提高客单价（AOV）和降低流失率，以通过单次获客获取更高的终身价值（LTV）。',
          },
          risky: {
            summary: '您的盈亏平衡 ROAS 相对较高，这意味着您的边际利润非常薄。在这种情况下，规模化投放可能会变得非常困难。',
            recommendation: '在扩大支出之前，考虑优化定价、产品组合、客单价或降低运营成本。',
          }
        },
        rogp: {
          strong: {
            summary: '您的毛利回报率表现强劲，这表明您在将广告支出转化为实际利润方面效率极高。',
            recommendation: '寻找机会将这些利润重新投入到品牌建设或库存扩张中。',
          },
          moderate: {
            summary: '您的毛利回报率处于健康水平，但仍有优化空间。',
            recommendation: '审查您的漏斗中部转化策略，从现有流量中榨取更多利润。',
          },
          weak: {
            summary: '您目前的毛利回报率较弱，这可能表明获客成本效率低下。',
            recommendation: '立即重新审查获客效率、定价策略和运营管理成本。',
          }
        },
        margin: {
          healthy: {
            summary: '高毛利为您抵御广告成本上升和竞争压力提供了强大的缓冲。',
            recommendation: '保持您的高端定位，并投资于产品研发以保持领先地位。',
          },
          average: {
            summary: '您的毛利率处于 DTC 品牌的行业平均水平。',
            recommendation: '监控供应链成本和履行效率，以防止利润分配进一步被侵蚀。',
          },
          thin: {
            summary: '您的毛利率较低，这使得您的营销或运营几乎没有犯错的空间。',
            recommendation: '考虑提价或与供应商重新谈判，以提高您的基础盈利能力。',
          }
        }
      },
      seo: {
        metaTitle: '盈亏平衡 ROAS 计算器 - 适用于 Shopify 和 DTC 品牌',
        metaDescription: '立即计算您的盈亏平衡 ROAS、毛利润和盈利能力。适用于 Shopify 卖家、媒体买家和 DTC 品牌的免费计算器。',
        introTitle: '使用盈亏平衡 ROAS 计算器掌控您的盈利能力',
        introBody: '对于现代 DTC 品牌和 Shopify 店主来说，了解数据是规模化经营还是白白烧钱的区别。盈亏平衡 ROAS（广告支出回报率）是收入覆盖所有成本（包括 COGS、运费和交易费）的关键阈值。使用此工具可视化您的单位经济效益，并找到保持盈利所需的精确效率。',
        questions: [
          {
            q: '什么是盈亏平衡 ROAS？',
            a: '盈亏平衡 ROAS 是在不产生亏损的情况下覆盖总成本（COGS、物流费、手续费等）所需的最低广告回报率。如果您的 ROAS 低于此点，那么每笔订单都在亏损。'
          },
          {
            q: '如何计算盈亏平衡 ROAS？',
            a: '公式为：盈亏平衡 ROAS = 平均订单价值 / (平均订单价值 - 总变动成本)。总变动成本包括完成订单所需的所有费用。'
          },
          {
            q: 'ROAS 和 MER 有什么区别？',
            a: 'ROAS（广告支出回报率）衡量特定广告平台的的回报。MER（营销效率比）衡量总收入除以所有渠道的总营销支出。'
          }
        ]
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
