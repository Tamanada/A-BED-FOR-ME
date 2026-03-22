import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowRight, Percent, Users, Heart, Gift } from 'lucide-react';

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
    <div>
      {/* Header */}
      <section className="bg-sky text-white px-4 sm:px-6 pt-16 pb-20 text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold">{t('vision.title')}</h1>
        <p className="mt-4 text-xl text-white/85">{t('vision.subtitle')}</p>
      </section>

      {/* The Problem */}
      <section className="bg-sky text-white px-4 sm:px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-extrabold mb-6">{t('vision.section1Title')}</h2>
          <div className="bg-white/10 rounded-2xl p-8 border border-white/20">
            <p className="text-white/90 leading-relaxed text-lg">{t('vision.section1')}</p>
          </div>
        </div>
      </section>

      {/* Our Solution */}
      <section className="bg-sky-dark text-white px-4 sm:px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-extrabold mb-6">{t('vision.section2Title')}</h2>
          <div className="bg-white/10 rounded-2xl p-8 border border-white/20">
            <p className="text-white/90 leading-relaxed text-lg">{t('vision.section2')}</p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-sky text-white px-4 sm:px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-extrabold mb-8">{t('vision.section3Title')}</h2>
          <div className="space-y-4">
            {steps.map((step, i) => (
              <div key={i} className="flex items-start gap-4 bg-white/10 rounded-xl p-5 border border-white/20">
                <div className="flex-shrink-0 w-8 h-8 bg-white text-sky rounded-full flex items-center justify-center text-sm font-bold">
                  {i + 1}
                </div>
                <p className="text-white/90 text-lg pt-0.5">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Where the 10% Goes — key slide from pitch deck */}
      <section className="bg-navy text-white px-4 sm:px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-extrabold mb-4 text-center">{t('vision.section4Title')}</h2>
          <p className="text-center text-6xl font-extrabold mb-10 text-sky">10%</p>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="flex items-start gap-4 bg-white/10 rounded-2xl p-6 border border-white/15">
              <div className="flex-shrink-0 w-12 h-12 bg-sky rounded-xl flex items-center justify-center">
                <Percent className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">{t('vision.commission')}</h3>
                <p className="mt-1 text-white/70">{t('vision.commissionDesc')}</p>
              </div>
            </div>
            <div className="flex items-start gap-4 bg-white/10 rounded-2xl p-6 border border-white/15">
              <div className="flex-shrink-0 w-12 h-12 bg-sky rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">{t('vision.ownership')}</h3>
                <p className="mt-1 text-white/70">{t('vision.ownershipDesc')}</p>
              </div>
            </div>
            <div className="flex items-start gap-4 bg-white/10 rounded-2xl p-6 border border-white/15">
              <div className="flex-shrink-0 w-12 h-12 bg-sky rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">{t('vision.revenue')}</h3>
                <p className="mt-1 text-white/70">{t('vision.revenueDesc')}</p>
              </div>
            </div>
            <div className="flex items-start gap-4 bg-white/10 rounded-2xl p-6 border border-white/15">
              <div className="flex-shrink-0 w-12 h-12 bg-sky rounded-xl flex items-center justify-center">
                <Gift className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">{t('vision.referralFee')}</h3>
                <p className="mt-1 text-white/70">{t('vision.referralFeeDesc')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-sky text-white text-center px-4 sm:px-6 py-16">
        <Link
          to="/signup"
          className="inline-flex items-center gap-2 px-8 py-4 bg-white text-sky font-bold rounded-xl shadow-lg hover:bg-blue-50 transition-all text-lg"
        >
          {t('vision.joinNow')}
          <ArrowRight className="w-5 h-5" />
        </Link>
      </section>
    </div>
  );
}
