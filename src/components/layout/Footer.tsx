import { useTranslation } from 'react-i18next';
import { Cloud } from 'lucide-react';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="mt-auto bg-navy text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Cloud className="w-5 h-5" />
            <span className="text-sm text-white/80">{t('footer.tagline')}</span>
          </div>
          <p className="text-xs text-white/50">{t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
}
