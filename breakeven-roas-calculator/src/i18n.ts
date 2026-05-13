import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      title: 'Breakeven ROAS Calculator',
      description: 'Calculate your eCommerce profitability metrics instantly.',
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
