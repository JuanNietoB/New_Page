'use client'

import Link from 'next/link'
import { Facebook, Linkedin } from 'lucide-react'
import { useLanguage } from '@/components/language-provider'

export function Footer() {
  const { t } = useLanguage()
  
  return (
    <footer className="bg-neutral-900 text-neutral-400 border-t border-neutral-800">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-xl md:text-2xl font-bold text-white">EnergyStore</h3>
            <p className="text-sm leading-relaxed">
              {t.consultancyDesc}
            </p>
          </div>

          {/* Navigation Section */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm md:text-base">{t.navigation}</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="hover:text-cyan-400 transition-colors text-sm">
                  {t.home}
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-cyan-400 transition-colors text-sm">
                  {t.about}
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-cyan-400 transition-colors text-sm">
                  {t.pricing}
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-cyan-400 transition-colors text-sm">
                  {t.blog}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-cyan-400 transition-colors text-sm">
                  {t.contact}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Section */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm md:text-base">{t.legal}</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/terms" className="hover:text-cyan-400 transition-colors text-sm">
                  {t.terms}
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-cyan-400 transition-colors text-sm">
                  {t.privacy}
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="hover:text-cyan-400 transition-colors text-sm">
                  {t.cookies}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm md:text-base">{t.contact}</h4>
            <div className="space-y-3">
              <Link 
                href="mailto:contact@energystore.com" 
                className="block hover:text-cyan-400 transition-colors underline text-sm break-all"
              >
                contact@energystore.com
              </Link>
              <p className="text-sm">United States</p>
              <div className="flex gap-4 pt-2">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-400 transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-400 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-neutral-800 mt-6 md:mt-8 pt-6 md:pt-8 text-center text-xs md:text-sm">
          <p>&copy; {new Date().getFullYear()} EnergyStore. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
