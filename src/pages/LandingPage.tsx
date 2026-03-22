import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { TrendingDown, ShieldOff, DollarSign, Percent, Heart, Users, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function LandingPage() {
  const { t } = useTranslation();

  return (
    <div>
      {/* Hero — sky blue full-width like pitch deck */}
      <section className="bg-sky text-white px-4 sm:px-6 pt-16 pb-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
            {t('hero.title')}
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
            {t('hero.subtitle')}
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/signup"
              className="w-full sm:w-auto px-8 py-4 bg-white text-sky font-bold rounded-xl shadow-lg hover:bg-blue-50 transition-all flex items-center justify-center gap-2 text-lg"
            >
              {t('hero.cta')}
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/survey"
              className="w-full sm:w-auto px-8 py-4 bg-white/15 hover:bg-white/25 text-white font-medium rounded-xl border border-white/30 transition-colors"
            >
              {t('cta.survey')}
            </Link>
          </div>
          <p className="mt-6 text-sm text-white/70">
            {t('hero.already')}{' '}
            <Link to="/login" className="text-white underline">{t('hero.login')}</Link>
          </p>
        </div>
      </section>

      {/* The Problem — sky blue */}
      <section className="bg-sky text-white px-4 sm:px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold">{t('why.title')}</h2>
            <div className="mt-6 inline-flex items-center gap-3 bg-navy/30 px-6 py-3 rounded-2xl">
              <span className="text-4xl font-extrabold">{t('why.stat')}</span>
              <span className="text-sm text-white/90 text-left">{t('why.statLabel')}</span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                <TrendingDown className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold mb-2">{t('why.point1Title')}</h3>
              <p className="text-white/85 leading-relaxed">{t('why.point1')}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                <ShieldOff className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold mb-2">{t('why.point2Title')}</h3>
              <p className="text-white/85 leading-relaxed">{t('why.point2')}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold mb-2">{t('why.point3Title')}</h3>
              <p className="text-white/85 leading-relaxed">{t('why.point3')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* The Solution — sky blue darker */}
      <section className="bg-sky-dark text-white px-4 sm:px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-12">{t('how.title')}</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                <Percent className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold mb-2">{t('how.point1Title')}</h3>
              <p className="text-white/85 leading-relaxed">{t('how.point1')}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold mb-2">{t('how.point2Title')}</h3>
              <p className="text-white/85 leading-relaxed">{t('how.point2')}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold mb-2">{t('how.point3Title')}</h3>
              <p className="text-white/85 leading-relaxed">{t('how.point3')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits for Hosts — white background like slide 12 */}
      <section className="bg-sky text-white px-4 sm:px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-10">{t('benefits.title')}</h2>
          <div className="space-y-6">
            {[
              { key: 'higher', icon: '💰' },
              { key: 'priority', icon: '📋' },
              { key: 'support', icon: '🤝' },
              { key: 'fair', icon: '⚖️' },
              { key: 'referral', icon: '🎁' },
            ].map(({ key }) => (
              <div key={key} className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-white rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-sky" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">{t(`benefits.${key}`)}</h3>
                  <p className="text-white/80 mt-0.5">{t(`benefits.${key}Desc`)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA — navy */}
      <section className="bg-navy text-white px-4 sm:px-6 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight">{t('cta.title')}</h2>
          <p className="mt-4 text-lg text-white/80">{t('cta.subtitle')}</p>
          <div className="mt-8">
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 px-8 py-4 bg-sky hover:bg-sky-dark text-white font-bold rounded-xl shadow-lg transition-all text-lg"
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
