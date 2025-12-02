export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
        
        <div className="prose prose-neutral max-w-none space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              By accessing and using EnergyStore's services, you accept and agree to be bound by the terms 
              and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Use License</h2>
            <p className="text-muted-foreground leading-relaxed">
              Permission is granted to temporarily access the materials (information or software) on EnergyStore's 
              platform for personal, non-commercial transitory viewing only. This is the grant of a license, not a 
              transfer of title.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Subscription Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              Free trial users receive 30 days of limited access. Pro subscriptions are billed monthly or annually 
              and provide full access to all dashboard features, including interactive maps and comprehensive analytics.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Data Usage</h2>
            <p className="text-muted-foreground leading-relaxed">
              All data provided through EnergyStore is for informational purposes only. Users may not redistribute, 
              resell, or commercially exploit the data without explicit written permission.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Disclaimer</h2>
            <p className="text-muted-foreground leading-relaxed">
              The materials on EnergyStore's platform are provided on an 'as is' basis. EnergyStore makes no warranties, 
              expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, 
              implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement 
              of intellectual property or other violation of rights.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Limitations</h2>
            <p className="text-muted-foreground leading-relaxed">
              In no event shall EnergyStore or its suppliers be liable for any damages (including, without limitation, 
              damages for loss of data or profit, or due to business interruption) arising out of the use or inability 
              to use the materials on EnergyStore's platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Revisions</h2>
            <p className="text-muted-foreground leading-relaxed">
              EnergyStore may revise these terms of service at any time without notice. By using this platform you are 
              agreeing to be bound by the then current version of these terms of service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">8. Governing Law</h2>
            <p className="text-muted-foreground leading-relaxed">
              These terms and conditions are governed by and construed in accordance with the laws and you irrevocably 
              submit to the exclusive jurisdiction of the courts in that location.
            </p>
          </section>
        </div>

        <div className="mt-12 text-sm text-muted-foreground">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  )
}
