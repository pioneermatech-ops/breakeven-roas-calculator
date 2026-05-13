import { Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';

const { Title, Paragraph } = Typography;

export default function SeoIntro() {
  const { t } = useTranslation();

  return (
    <motion.section 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-12 max-w-3xl"
    >
      <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-6 leading-tight">
        {t('seo.introTitle')}
      </h1>
      <p className="text-base md:text-lg text-slate-500 leading-relaxed font-medium">
        {t('seo.introBody')}
      </p>
    </motion.section>
  );
}
