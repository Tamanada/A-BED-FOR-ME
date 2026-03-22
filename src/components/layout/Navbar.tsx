import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, BedDouble } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import LanguageSwitcher from './LanguageSwitcher';

export default function Navbar() {
  const { t } = useTranslation();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  async function handleSignOut() {
    await signOut();
    navigate('/');
    setMobileOpen(false);
  }

  return (
    <nav className="sticky top-0 z-40 bg-beige/80 backdrop-blur-md border-b border-gray-200/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-semibold text-gray-900">
            <BedDouble className="w-6 h-6 text-trust" />
            <span className="text-lg">{t('brand')}</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            <Link to="/vision" className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900 rounded-lg hover:bg-white/60 transition-colors">
              {t('nav.vision')}
            </Link>
            <Link to="/survey" className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900 rounded-lg hover:bg-white/60 transition-colors">
              {t('nav.survey')}
            </Link>
            <Link to="/submit" className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900 rounded-lg hover:bg-white/60 transition-colors">
              {t('nav.submit')}
            </Link>
            {user && (
              <Link to="/dashboard" className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900 rounded-lg hover:bg-white/60 transition-colors">
                {t('nav.dashboard')}
              </Link>
            )}
          </div>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-2">
            <LanguageSwitcher />
            {user ? (
              <button onClick={handleSignOut} className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 rounded-lg hover:bg-white/60 transition-colors">
                {t('nav.logout')}
              </button>
            ) : (
              <>
                <Link to="/login" className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 rounded-lg hover:bg-white/60 transition-colors">
                  {t('nav.login')}
                </Link>
                <Link to="/signup" className="px-4 py-2 text-sm font-medium text-white bg-trust hover:bg-trust-dark rounded-lg transition-colors">
                  {t('nav.signup')}
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 text-gray-600">
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden pb-4 border-t border-gray-200/50">
            <div className="flex flex-col gap-1 pt-3">
              <Link to="/vision" onClick={() => setMobileOpen(false)} className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900 rounded-lg hover:bg-white/60">
                {t('nav.vision')}
              </Link>
              <Link to="/survey" onClick={() => setMobileOpen(false)} className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900 rounded-lg hover:bg-white/60">
                {t('nav.survey')}
              </Link>
              <Link to="/submit" onClick={() => setMobileOpen(false)} className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900 rounded-lg hover:bg-white/60">
                {t('nav.submit')}
              </Link>
              {user && (
                <Link to="/dashboard" onClick={() => setMobileOpen(false)} className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900 rounded-lg hover:bg-white/60">
                  {t('nav.dashboard')}
                </Link>
              )}
              <div className="pt-2 border-t border-gray-200/50 mt-2">
                <LanguageSwitcher />
              </div>
              <div className="pt-2">
                {user ? (
                  <button onClick={handleSignOut} className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:text-gray-900 rounded-lg hover:bg-white/60">
                    {t('nav.logout')}
                  </button>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setMobileOpen(false)} className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900 rounded-lg hover:bg-white/60">
                      {t('nav.login')}
                    </Link>
                    <Link to="/signup" onClick={() => setMobileOpen(false)} className="block px-3 py-2 mt-1 text-sm font-medium text-center text-white bg-trust hover:bg-trust-dark rounded-lg">
                      {t('nav.signup')}
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
