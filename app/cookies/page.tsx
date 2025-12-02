export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Cookie Policy</h1>
        
        <div className="prose prose-neutral max-w-none space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. What Are Cookies</h2>
            <p className="text-muted-foreground leading-relaxed">
              Cookies are small text files that are placed on your computer or mobile device when you visit a website. 
              They are widely used to make websites work more efficiently and provide information to the site owners.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. How We Use Cookies</h2>
            <p className="text-muted-foreground leading-relaxed">
              EnergyStore uses cookies to improve your experience on our platform. We use cookies to remember your 
              preferences, understand how you use our site, and provide personalized content and advertisements.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Types of Cookies We Use</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-medium mb-2">Essential Cookies</h3>
                <p className="text-muted-foreground leading-relaxed">
                  These cookies are necessary for the website to function properly. They enable basic functions like 
                  page navigation, secure areas access, and authentication. The website cannot function properly 
                  without these cookies.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-medium mb-2">Analytics Cookies</h3>
                <p className="text-muted-foreground leading-relaxed">
                  These cookies help us understand how visitors interact with our website by collecting and reporting 
                  information anonymously. This helps us improve how our website works.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-medium mb-2">Preference Cookies</h3>
                <p className="text-muted-foreground leading-relaxed">
                  These cookies allow our website to remember choices you make (such as your user name, language, or 
                  region) and provide enhanced, more personal features.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-medium mb-2">Marketing Cookies</h3>
                <p className="text-muted-foreground leading-relaxed">
                  These cookies are used to track visitors across websites. The intention is to display ads that are 
                  relevant and engaging for the individual user.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Third-Party Cookies</h2>
            <p className="text-muted-foreground leading-relaxed">
              In addition to our own cookies, we may also use various third-party cookies to report usage statistics 
              of the service, deliver advertisements on and through the service, and so on. These third-party services 
              have their own privacy policies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Managing Cookies</h2>
            <p className="text-muted-foreground leading-relaxed">
              Most web browsers allow you to control cookies through their settings preferences. However, if you limit 
              the ability of websites to set cookies, you may impact your overall user experience. Some features of 
              our platform may not function properly if cookies are disabled.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Cookie Duration</h2>
            <p className="text-muted-foreground leading-relaxed">
              Some cookies are session cookies (temporary and deleted when you close your browser), while others are 
              persistent cookies (remain on your device for a set period or until you delete them). The duration 
              depends on the purpose of the cookie.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Updates to This Policy</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update this Cookie Policy from time to time to reflect changes in technology, legislation, or our 
              business practices. Please check this page regularly to stay informed about our use of cookies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">8. Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have any questions about our use of cookies, please contact us at contact@energystore.com.
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
