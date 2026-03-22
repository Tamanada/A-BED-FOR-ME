import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowRight, Percent, Users, PiggyBank } from 'lucide-react';

export default function VisionPage() {
  const { t } = useTranslation();

  const steps = [
    t('vision.step1'),
    t('vision.step2'),
    t('vision.step3'),
    t('vision.step4'),
    t('vision.step5'),
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">{t('vision.title')}</h1>
        <p className="mt-4 text-xl text-gray-600">{t('vision.subtitle')}</p>
      </div>

      {/* The Problem */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('vision.section1Title')}</h2>
        <div className="bg-red-50 rounded-2xl p-8 border border-red-100">
          <p className="text-gray-700 leading-relaxed text-lg">{t('vision.section1')}</p>
        </div>
      </section>

      {/* Our Solution */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('vision.section2Title')}</h2>
        <div className="bg-green-50 rounded-2xl p-8 border border-green-100">
          <p className="text-gray-700 leading-relaxed text-lg">{t('vision.section2')}</p>
        </div>
      </section>

      {/* How It Works */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">{t('vision.section3Title')}</h2>
        <div className="space-y-4">
          {steps.map((step, i) => (
            <div key={i} className="flex items-start gap-4 bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
              <div className="flex-shrink-0 w-8 h-8 bg-trust text-white rounded-full flex items-center justify-center text-sm font-bold">
                {i + 1}
              </div>
              <p className="text-gray-700 text-lg pt-0.5">{step}</p>
            </div>
          ))}
        </div>
      </section>

      {/* The Numbers */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">{t('vision.section4Title')}</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-8 text-center border border-gray-100 shadow-sm">
            <div className="w-14 h-14 bg-trust/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Percent className="w-7 h-7 text-trust" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">{t('vision.commission')}</h3>
            <p className="mt-2 text-gray-600">{t('vision.commissionDesc')}</p>
          </div>
          <div className="bg-white rounded-2xl p-8 text-center border border-gray-100 shadow-sm">
            <div className="w-14 h-14 bg-growth/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Users className="w-7 h-7 text-growth" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">{t('vision.ownership')}</h3>
            <p className="mt-2 text-gray-600">{t('vision.ownershipDesc')}</p>
          </div>
          <div className="bg-white rounded-2xl p-8 text-center border border-gray-100 shadow-sm">
            <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <PiggyBank className="w-7 h-7 text-emerald-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">{t('vision.revenue')}</h3>
            <p className="mt-2 text-gray-600">{t('vision.revenueDesc')}</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center py-8">
        <Link
          to="/signup"
          className="inline-flex items-center gap-2 px-8 py-4 bg-trust hover:bg-trust-dark text-white font-semibold rounded-xl shadow-lg shadow-blue-500/25 transition-all text-lg"
        >
          {t('vision.joinNow')}
          <ArrowRight className="w-5 h-5" />
        </Link>
      </section>
    </div>
  );
}
