import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { TrendingDown, ShieldOff, Scale, Building2, Percent, PiggyBank, ArrowRight } from 'lucide-react';

export default function LandingPage() {
  const { t } = useTranslation();

  return (
    <div>
      {/* Hero */}
      <section className="px-4 sm:px-6 pt-16 pb-20 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight leading-tight">
            {t('hero.title')}
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {t('hero.subtitle')}
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/signup"
              className="w-full sm:w-auto px-8 py-4 bg-trust hover:bg-trust-dark text-white font-semibold rounded-xl shadow-lg shadow-blue-500/25 transition-all hover:shadow-xl hover:shadow-blue-500/30 flex items-center justify-center gap-2"
            >
              {t('hero.cta')}
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/survey"
              className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-gray-50 text-gray-700 font-medium rounded-xl border border-gray-200 transition-colors"
            >
              {t('cta.survey')}
            </Link>
          </div>
          <p className="mt-6 text-sm text-gray-500">
            {t('hero.already')}{' '}
            <Link to="/login" className="text-trust hover:underline">{t('hero.login')}</Link>
          </p>
        </div>
      </section>

      {/* Why Section */}
      <section className="px-4 sm:px-6 py-16 bg-white/60">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">{t('why.title')}</h2>
            <div className="mt-6 inline-flex items-center gap-3 bg-red-50 px-6 py-3 rounded-2xl">
              <span className="text-4xl font-bold text-red-600">{t('why.stat')}</span>
              <span className="text-sm text-red-700 text-left">{t('why.statLabel')}</span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center mb-4">
                <TrendingDown className="w-6 h-6 text-red-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('why.point1Title')}</h3>
              <p className="text-gray-600 leading-relaxed">{t('why.point1')}</p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center mb-4">
                <ShieldOff className="w-6 h-6 text-orange-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('why.point2Title')}</h3>
              <p className="text-gray-600 leading-relaxed">{t('why.point2')}</p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-yellow-50 rounded-xl flex items-center justify-center mb-4">
                <Scale className="w-6 h-6 text-yellow-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('why.point3Title')}</h3>
              <p className="text-gray-600 leading-relaxed">{t('why.point3')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* How Section */}
      <section className="px-4 sm:px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-12">{t('how.title')}</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8 border border-blue-100">
              <div className="w-12 h-12 bg-trust/10 rounded-xl flex items-center justify-center mb-4">
                <Building2 className="w-6 h-6 text-trust" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('how.point1Title')}</h3>
              <p className="text-gray-600 leading-relaxed">{t('how.point1')}</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-white rounded-2xl p-8 border border-green-100">
              <div className="w-12 h-12 bg-growth/10 rounded-xl flex items-center justify-center mb-4">
                <Percent className="w-6 h-6 text-growth" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('how.point2Title')}</h3>
              <p className="text-gray-600 leading-relaxed">{t('how.point2')}</p>
            </div>
            <div className="bg-gradient-to-br from-emerald-50 to-white rounded-2xl p-8 border border-emerald-100">
              <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-4">
                <PiggyBank className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('how.point3Title')}</h3>
              <p className="text-gray-600 leading-relaxed">{t('how.point3')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-4 sm:px-6 py-16 bg-gradient-to-br from-trust to-blue-700">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">{t('cta.title')}</h2>
          <p className="mt-4 text-lg text-blue-100">{t('cta.subtitle')}</p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/signup"
              className="w-full sm:w-auto px-8 py-4 bg-white text-trust font-semibold rounded-xl shadow-lg hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
            >
              {t('cta.button')}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
