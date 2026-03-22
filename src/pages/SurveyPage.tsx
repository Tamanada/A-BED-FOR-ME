import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

export default function SurveyPage() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [answers, setAnswers] = useState({
    satisfaction: 0,
    commission: '',
    frustration: '',
    interest: 5,
    wouldJoin: true,
  });

  const totalSteps = 5;

  async function handleSubmit() {
    setSubmitting(true);

    if (isSupabaseConfigured()) {
      await supabase.from('survey_answers').insert({
        user_id: user?.id || null,
        satisfaction_level: answers.satisfaction,
        current_commission: answers.commission,
        biggest_frustration: answers.frustration,
        interest_level: answers.interest,
        would_join_if_profitable: answers.wouldJoin,
      });
    }

    // Also store locally for demo mode
    const existing = JSON.parse(localStorage.getItem('survey_answers') || '[]');
    existing.push({ ...answers, timestamp: new Date().toISOString() });
    localStorage.setItem('survey_answers', JSON.stringify(existing));

    setSubmitted(true);
    setSubmitting(false);
  }

  if (submitted) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <CheckCircle2 className="w-16 h-16 text-growth mx-auto mb-6" />
        <h1 className="text-3xl font-bold text-gray-900">{t('survey.thanks')}</h1>
        <p className="mt-4 text-gray-600">{t('survey.thanksText')}</p>
        <Link
          to="/submit"
          className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-trust hover:bg-trust-dark text-white font-medium rounded-xl transition-colors"
        >
          {t('survey.submitHotel')}
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{t('survey.title')}</h1>
        <p className="mt-2 text-gray-600">{t('survey.subtitle')}</p>
      </div>

      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex justify-between text-xs text-gray-500 mb-2">
          <span>{step + 1} / {totalSteps}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-trust h-2 rounded-full transition-all duration-300"
            style={{ width: `${((step + 1) / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        {/* Step 1: Satisfaction */}
        {step === 0 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-6">{t('survey.q1')}</h3>
            <div className="flex flex-col gap-3">
              {(t('survey.q1Options', { returnObjects: true }) as string[]).map((option, i) => (
                <button
                  key={i}
                  onClick={() => setAnswers({ ...answers, satisfaction: i + 1 })}
                  className={`p-4 text-left rounded-xl border-2 transition-all ${
                    answers.satisfaction === i + 1
                      ? 'border-trust bg-blue-50 text-trust'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Commission */}
        {step === 1 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-6">{t('survey.q2')}</h3>
            <div className="flex flex-col gap-3">
              {(t('survey.q2Options', { returnObjects: true }) as string[]).map((option, i) => (
                <button
                  key={i}
                  onClick={() => setAnswers({ ...answers, commission: option })}
                  className={`p-4 text-left rounded-xl border-2 transition-all ${
                    answers.commission === option
                      ? 'border-trust bg-blue-50 text-trust'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Frustration */}
        {step === 2 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-6">{t('survey.q3')}</h3>
            <textarea
              value={answers.frustration}
              onChange={(e) => setAnswers({ ...answers, frustration: e.target.value })}
              placeholder={t('survey.q3Placeholder')}
              rows={4}
              className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-trust focus:ring-0 outline-none resize-none text-gray-700 placeholder:text-gray-400"
            />
          </div>
        )}

        {/* Step 4: Interest level */}
        {step === 3 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-6">{t('survey.q4')}</h3>
            <div className="flex items-center gap-4 justify-center">
              <span className="text-sm text-gray-500">1</span>
              <input
                type="range"
                min={1}
                max={10}
                value={answers.interest}
                onChange={(e) => setAnswers({ ...answers, interest: parseInt(e.target.value) })}
                className="flex-1 accent-trust"
              />
              <span className="text-sm text-gray-500">10</span>
            </div>
            <p className="text-center mt-4 text-3xl font-bold text-trust">{answers.interest}</p>
          </div>
        )}

        {/* Step 5: Would join */}
        {step === 4 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-6">{t('survey.q5')}</h3>
            <div className="flex gap-4">
              <button
                onClick={() => setAnswers({ ...answers, wouldJoin: true })}
                className={`flex-1 p-6 text-center rounded-xl border-2 text-lg font-medium transition-all ${
                  answers.wouldJoin
                    ? 'border-growth bg-green-50 text-growth'
                    : 'border-gray-200 hover:border-gray-300 text-gray-700'
                }`}
              >
                {t('survey.yes')}
              </button>
              <button
                onClick={() => setAnswers({ ...answers, wouldJoin: false })}
                className={`flex-1 p-6 text-center rounded-xl border-2 text-lg font-medium transition-all ${
                  !answers.wouldJoin
                    ? 'border-red-400 bg-red-50 text-red-600'
                    : 'border-gray-200 hover:border-gray-300 text-gray-700'
                }`}
              >
                {t('survey.no')}
              </button>
            </div>
          </div>
        )}

        {/* Navigation buttons */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
          <button
            onClick={() => setStep(step - 1)}
            disabled={step === 0}
            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {t('survey.back')}
          </button>

          {step < totalSteps - 1 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="flex items-center gap-2 px-6 py-2.5 bg-trust hover:bg-trust-dark text-white font-medium rounded-xl transition-colors"
            >
              {t('survey.next')}
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="flex items-center gap-2 px-6 py-2.5 bg-growth hover:bg-growth-dark text-white font-medium rounded-xl transition-colors disabled:opacity-50"
            >
              {submitting ? '...' : t('survey.submit')}
              <CheckCircle2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
