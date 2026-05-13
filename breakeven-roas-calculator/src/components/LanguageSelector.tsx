import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export default function LanguageSelector() {
  const { i18n } = useTranslation();
  const navigate = useNavigate();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    navigate(`/${lng}/breakeven-roas-calculator`);
  };

  const currentLang = i18n.language.startsWith('zh') ? 'zh' : 'en';

  return (
    <div className="flex bg-slate-100 p-1 rounded-full">
      <button 
        onClick={() => changeLanguage('en')}
        className={`px-4 py-1.5 text-xs font-bold rounded-full transition-all ${
          currentLang === 'en' 
            ? 'bg-white text-slate-900 shadow-sm' 
            : 'text-slate-500 hover:text-slate-700'
        }`}
      >
        EN
      </button>
      <button 
        onClick={() => changeLanguage('zh')}
        className={`px-4 py-1.5 text-xs font-medium rounded-full transition-all ${
          currentLang === 'zh' 
            ? 'bg-white text-slate-900 shadow-sm font-bold' 
            : 'text-slate-500 hover:text-slate-700'
        }`}
      >
        中文
      </button>
    </div>
  );
}
