import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { MailOutlined } from '@ant-design/icons';

export default function StickyCTA() {
  const { t } = useTranslation();

  return (
    <div className="mt-16 p-8 bg-indigo-600 rounded-3xl text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl shadow-indigo-200 overflow-hidden relative group">
      <div className="relative z-10">
        <h3 className="text-2xl font-bold mb-2">Get Profitability Templates</h3>
        <p className="text-indigo-100 max-w-md">Join 10,000+ DTC founders getting weekly store optimization tips and free profitability templates.</p>
      </div>
      <div className="relative z-10 w-full md:w-auto">
        <Button 
          type="primary" 
          size="large" 
          icon={<MailOutlined />}
          className="!bg-white !text-indigo-600 !border-none !font-bold h-12 px-8 rounded-xl w-full"
        >
          Subscribe Now
        </Button>
      </div>
      
      {/* Decorative patterns */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl transition-transform group-hover:scale-110 duration-700"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-400/20 rounded-full -ml-16 -mb-16 blur-2xl"></div>
    </div>
  );
}
