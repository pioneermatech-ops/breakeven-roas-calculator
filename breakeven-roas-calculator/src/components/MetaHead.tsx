import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

export default function MetaHead() {
  const { t, i18n } = useTranslation();
  
  const title = t('seo.metaTitle');
  const description = t('seo.metaDescription');
  const url = window.location.href;
  const lang = i18n.language.startsWith('zh') ? 'zh' : 'en';

  return (
    <Helmet>
      <html lang={lang} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <link rel="canonical" href={url} />
      
      {/* Schema.org WebApplication */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": title,
          "description": description,
          "applicationCategory": "BusinessApplication",
          "operatingSystem": "All",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          }
        })}
      </script>
    </Helmet>
  );
}
