import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { CheckCircle2, Loader2, Sparkles } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { extractBookingData, type ExtractedHotelData } from '../lib/extractBookingData';
import { useAuth } from '../context/AuthContext';

interface HotelForm {
  name: string;
  country: string;
  city: string;
  bookingUrl: string;
  airbnbUrl: string;
  numRooms: number;
  priceRange: string;
  contactEmail: string;
  contactPhone: string;
}

export default function HotelSubmitPage() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<HotelForm>();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [extracting, setExtracting] = useState(false);
  const [extractedData, setExtractedData] = useState<ExtractedHotelData | null>(null);

  async function handleExtract(url: string) {
    if (!url || (!url.includes('booking.com') && !url.includes('airbnb.com'))) return;
    setExtracting(true);
    const data = await extractBookingData(url);
    if (data) {
      setExtractedData(data);
      if (data.name) setValue('name', data.name);
    }
    setExtracting(false);
  }

  async function onSubmit(data: HotelForm) {
    setSubmitting(true);

    if (isSupabaseConfigured() && user) {
      await supabase.from('hotels').insert({
        user_id: user.id,
        name: data.name,
        country: data.country,
        city: data.city,
        booking_url: data.bookingUrl || null,
        airbnb_url: data.airbnbUrl || null,
        num_rooms: data.numRooms,
        price_range: data.priceRange,
        contact_email: data.contactEmail,
        contact_phone: data.contactPhone || null,
        extracted_data: extractedData,
      });
    }

    // Store locally for demo mode
    const existing = JSON.parse(localStorage.getItem('hotels') || '[]');
    existing.push({ ...data, extractedData, status: 'pending', timestamp: new Date().toISOString() });
    localStorage.setItem('hotels', JSON.stringify(existing));

    setSubmitted(true);
    setSubmitting(false);
  }

  if (submitted) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <CheckCircle2 className="w-16 h-16 text-growth mx-auto mb-6" />
        <h1 className="text-3xl font-bold text-gray-900">{t('hotel.success')}</h1>
        <p className="mt-4 text-gray-600">{t('hotel.successText')}</p>
        <Link
          to={user ? '/dashboard' : '/signup'}
          className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-sky hover:bg-sky-dark text-white font-medium rounded-xl transition-colors"
        >
          {user ? t('hotel.goToDashboard') : t('nav.signup')}
        </Link>
      </div>
    );
  }

  const priceOptions = t('hotel.priceOptions', { returnObjects: true }) as string[];

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{t('hotel.title')}</h1>
        <p className="mt-2 text-gray-600">{t('hotel.subtitle')}</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <div className="space-y-6">
          {/* Booking URL with extraction */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('hotel.bookingUrl')}</label>
            <div className="flex gap-2">
              <input
                {...register('bookingUrl')}
                placeholder={t('hotel.bookingUrlPlaceholder')}
                className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:border-sky focus:ring-1 focus:ring-sky outline-none text-gray-700 placeholder:text-gray-400"
                onBlur={(e) => handleExtract(e.target.value)}
              />
            </div>
            {extracting && (
              <p className="mt-2 text-sm text-sky flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                {t('hotel.extracting')}
              </p>
            )}
            {extractedData && !extracting && (
              <div className="mt-2 p-3 bg-green-50 rounded-lg border border-green-200">
                <p className="text-sm text-growth flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  {t('hotel.extracted')} — {extractedData.name} (Rating: {extractedData.rating})
                </p>
              </div>
            )}
          </div>

          {/* Airbnb URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('hotel.airbnbUrl')}</label>
            <input
              {...register('airbnbUrl')}
              placeholder={t('hotel.airbnbUrlPlaceholder')}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-sky focus:ring-1 focus:ring-sky outline-none text-gray-700 placeholder:text-gray-400"
              onBlur={(e) => handleExtract(e.target.value)}
            />
          </div>

          {/* Hotel Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('hotel.name')} *</label>
            <input
              {...register('name', { required: true })}
              placeholder={t('hotel.namePlaceholder')}
              className={`w-full px-4 py-3 rounded-xl border ${errors.name ? 'border-red-400' : 'border-gray-200'} focus:border-sky focus:ring-1 focus:ring-sky outline-none text-gray-700 placeholder:text-gray-400`}
            />
          </div>

          {/* Country & City */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('hotel.country')} *</label>
              <input
                {...register('country', { required: true })}
                placeholder={t('hotel.countryPlaceholder')}
                className={`w-full px-4 py-3 rounded-xl border ${errors.country ? 'border-red-400' : 'border-gray-200'} focus:border-sky focus:ring-1 focus:ring-sky outline-none text-gray-700 placeholder:text-gray-400`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('hotel.city')} *</label>
              <input
                {...register('city', { required: true })}
                placeholder={t('hotel.cityPlaceholder')}
                className={`w-full px-4 py-3 rounded-xl border ${errors.city ? 'border-red-400' : 'border-gray-200'} focus:border-sky focus:ring-1 focus:ring-sky outline-none text-gray-700 placeholder:text-gray-400`}
              />
            </div>
          </div>

          {/* Rooms & Price Range */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('hotel.rooms')} *</label>
              <input
                type="number"
                {...register('numRooms', { required: true, min: 1 })}
                className={`w-full px-4 py-3 rounded-xl border ${errors.numRooms ? 'border-red-400' : 'border-gray-200'} focus:border-sky focus:ring-1 focus:ring-sky outline-none text-gray-700`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('hotel.priceRange')} *</label>
              <select
                {...register('priceRange', { required: true })}
                className={`w-full px-4 py-3 rounded-xl border ${errors.priceRange ? 'border-red-400' : 'border-gray-200'} focus:border-sky focus:ring-1 focus:ring-sky outline-none text-gray-700 bg-white`}
              >
                <option value="">—</option>
                {['budget', 'mid', 'premium', 'luxury'].map((val, i) => (
                  <option key={val} value={val}>{priceOptions[i]}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Email & Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('hotel.email')} *</label>
            <input
              type="email"
              {...register('contactEmail', { required: true })}
              className={`w-full px-4 py-3 rounded-xl border ${errors.contactEmail ? 'border-red-400' : 'border-gray-200'} focus:border-sky focus:ring-1 focus:ring-sky outline-none text-gray-700`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('hotel.phone')}</label>
            <input
              {...register('contactPhone')}
              placeholder={t('hotel.phonePlaceholder')}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-sky focus:ring-1 focus:ring-sky outline-none text-gray-700 placeholder:text-gray-400"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-4 bg-sky hover:bg-sky-dark text-white font-semibold rounded-xl shadow-lg shadow-sky/25 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : t('hotel.submit')}
          </button>
        </div>
      </form>
    </div>
  );
}
