'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Users, Target, Award, TrendingUp } from 'lucide-react'
import { useLanguage } from '@/components/language-provider'

export default function AboutPage() {
  const { t } = useLanguage()
  
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-balance font-bold text-5xl md:text-6xl mb-6">
            {t.aboutTitle}
          </h1>
          <p className="text-pretty text-muted-foreground text-lg md:text-xl leading-relaxed">
            {t.aboutSubtitle}
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="bg-muted/50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-balance font-bold text-3xl md:text-4xl mb-8 text-center">
              {t.ourMission}
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              {t.missionPara1}
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {t.missionPara2}
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-balance font-bold text-3xl md:text-4xl mb-12 text-center">
            {t.whatDrivesUs}
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="pt-6">
                <Users className="h-12 w-12 text-primary mb-4" />
                <h3 className="font-semibold text-xl mb-3">{t.dataAccuracy}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t.dataAccuracyDesc}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <Target className="h-12 w-12 text-primary mb-4" />
                <h3 className="font-semibold text-xl mb-3">{t.marketFocus}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t.marketFocusDesc}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <Award className="h-12 w-12 text-primary mb-4" />
                <h3 className="font-semibold text-xl mb-3">{t.userExperience}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t.userExperienceDesc}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <TrendingUp className="h-12 w-12 text-primary mb-4" />
                <h3 className="font-semibold text-xl mb-3">{t.innovation}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t.innovationDesc}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-muted/50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-balance font-bold text-3xl md:text-4xl mb-6">
              {t.builtByExperts}
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {t.builtByExpertsDesc}
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
