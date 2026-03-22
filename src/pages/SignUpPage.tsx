import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Cloud, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface SignUpForm {
  fullName: string;
  email: string;
  password: string;
  referralCode: string;
}

export default function SignUpPage() {
  const { t } = useTranslation();
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { register, handleSubmit, formState: { errors } } = useForm<SignUpForm>({
    defaultValues: {
      referralCode: searchParams.get('ref') || '',
    },
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function onSubmit(data: SignUpForm) {
    setLoading(true);
    setError('');
    const { error } = await signUp(data.email, data.password, data.fullName, data.referralCode);
    if (error) {
      setError(error);
      setLoading(false);
    } else {
      navigate('/dashboard');
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Cloud className="w-12 h-12 text-sky mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900">{t('auth.signupTitle')}</h1>
          <p className="mt-2 text-gray-600">{t('auth.signupSubtitle')}</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-xl text-sm">{error}</div>
          )}

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('auth.fullName')}</label>
              <input
                {...register('fullName', { required: true })}
                className={`w-full px-4 py-3 rounded-xl border ${errors.fullName ? 'border-red-400' : 'border-gray-200'} focus:border-sky focus:ring-1 focus:ring-sky outline-none`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('auth.email')}</label>
              <input
                type="email"
                {...register('email', { required: true })}
                className={`w-full px-4 py-3 rounded-xl border ${errors.email ? 'border-red-400' : 'border-gray-200'} focus:border-sky focus:ring-1 focus:ring-sky outline-none`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('auth.password')}</label>
              <input
                type="password"
                {...register('password', { required: true, minLength: 6 })}
                className={`w-full px-4 py-3 rounded-xl border ${errors.password ? 'border-red-400' : 'border-gray-200'} focus:border-sky focus:ring-1 focus:ring-sky outline-none`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('auth.referredBy')}</label>
              <input
                {...register('referralCode')}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-sky focus:ring-1 focus:ring-sky outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-sky hover:bg-sky-dark text-white font-semibold rounded-xl shadow-lg shadow-sky/25 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : t('auth.signup')}
            </button>
          </div>

          <p className="mt-6 text-center text-sm text-gray-600">
            {t('auth.hasAccount')}{' '}
            <Link to="/login" className="text-sky hover:underline font-medium">{t('auth.login')}</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
