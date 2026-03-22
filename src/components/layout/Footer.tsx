import { useTranslation } from 'react-i18next';
import { BedDouble } from 'lucide-react';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="mt-auto border-t border-gray-200/50 bg-white/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-gray-600">
            <BedDouble className="w-5 h-5 text-trust" />
            <span className="text-sm">{t('footer.tagline')}</span>
          </div>
          <p className="text-xs text-gray-400">{t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
}
