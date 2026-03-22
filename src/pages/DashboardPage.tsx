import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Hotel, Users, Trophy, Copy, Check, Plus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function DashboardPage() {
  const { t } = useTranslation();
  const { user, profile } = useAuth();
  const [copied, setCopied] = useState(false);
  const [hotels, setHotels] = useState<Array<{ name: string; status: string }>>([]);
  const referralCode = profile?.referral_code || 'DEMO1234';
  const referralLink = `${window.location.origin}/signup?ref=${referralCode}`;

  useEffect(() => {
    // Load hotels from localStorage for demo mode
    const stored = JSON.parse(localStorage.getItem('hotels') || '[]');
    setHotels(stored);
  }, []);

  function copyReferralLink() {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const statusColors: Record<string, string> = {
    pending: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    validated: 'bg-green-50 text-growth border-green-200',
    rejected: 'bg-red-50 text-red-700 border-red-200',
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{t('dashboard.title')}</h1>
        <p className="mt-1 text-gray-600">
          {t('dashboard.welcome')} {profile?.full_name || user?.email}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Hotel Status Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-trust/10 rounded-xl flex items-center justify-center">
              <Hotel className="w-5 h-5 text-trust" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900">{t('dashboard.hotelStatus')}</h2>
          </div>

          {hotels.length > 0 ? (
            <div className="space-y-3">
              {hotels.map((hotel, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-beige">
                  <span className="font-medium text-gray-900">{hotel.name}</span>
                  <span className={`px-3 py-1 text-xs font-medium rounded-full border ${statusColors[hotel.status] || statusColors.pending}`}>
                    {t(`dashboard.${hotel.status || 'pending'}`)}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6">
              <p className="text-gray-500 mb-4">{t('dashboard.noHotel')}</p>
              <Link
                to="/submit"
                className="inline-flex items-center gap-2 px-4 py-2 bg-trust hover:bg-trust-dark text-white text-sm font-medium rounded-xl transition-colors"
              >
                <Plus className="w-4 h-4" />
                {t('dashboard.submitNow')}
              </Link>
            </div>
          )}
        </div>

        {/* Referral Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-growth/10 rounded-xl flex items-center justify-center">
              <Users className="w-5 h-5 text-growth" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900">{t('dashboard.referrals')}</h2>
          </div>

          <div className="mb-4">
            <label className="text-xs text-gray-500 uppercase tracking-wide">{t('dashboard.referralCode')}</label>
            <div className="mt-1 flex items-center gap-2">
              <input
                readOnly
                value={referralLink}
                className="flex-1 px-3 py-2 text-sm bg-beige rounded-lg border border-gray-200 text-gray-700 truncate"
              />
              <button
                onClick={copyReferralLink}
                className="px-3 py-2 bg-growth hover:bg-growth-dark text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-1.5"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? t('dashboard.copied') : t('dashboard.copy')}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-beige rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-gray-900">0</p>
              <p className="text-xs text-gray-500 mt-1">{t('dashboard.referralCount')}</p>
            </div>
            <div className="bg-beige rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-trust">{t('dashboard.position', { position: 42 })}</p>
              <p className="text-xs text-gray-500 mt-1">{t('dashboard.earlyAdopter')}</p>
            </div>
          </div>
        </div>

        {/* Early Adopter Badge */}
        <div className="md:col-span-2 bg-gradient-to-r from-trust to-blue-600 rounded-2xl p-6 text-white">
          <div className="flex items-center gap-3">
            <Trophy className="w-8 h-8" />
            <div>
              <h3 className="text-lg font-semibold">{t('dashboard.earlyAdopter')}</h3>
              <p className="text-blue-100 text-sm">
                {t('dashboard.joinedOn')} {new Date(profile?.created_at || Date.now()).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
