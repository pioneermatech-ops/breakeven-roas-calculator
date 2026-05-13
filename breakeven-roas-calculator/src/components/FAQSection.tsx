import { Collapse, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';

const { Title, Paragraph } = Typography;

export default function FAQSection() {
  const { t } = useTranslation();
  const questions = t('seo.questions', { returnObjects: true }) as { q: string, a: string }[];

  return (
    <section className="mt-20 pt-10 border-t border-slate-100 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="text-center mb-12">
          <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-[0.2em] mb-4 block">Knowledge Base</span>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Frequently Asked Questions</h2>
        </div>
        <Collapse
          accordion
          className="bg-transparent border-none space-y-4"
          expandIconPlacement="end"
          items={questions.map((item, index) => ({
            key: index,
            label: <span className="font-bold text-slate-800 text-sm">{item.q}</span>,
            children: <div className="text-slate-500 leading-relaxed text-sm">{item.a}</div>,
            className: 'bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden'
          }))}
        />
        
        {/* FAQ Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": questions.map(item => ({
              "@type": "Question",
              "name": item.q,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": item.a
              }
            }))
          })}
        </script>
      </motion.div>
    </section>
  );
}
