import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Landlord Resource privacy policy — how we collect, use and protect your data.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-brand-cream">
      <div className="bg-brand-navy py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white mb-3">Privacy Policy</h1>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="bg-white rounded-2xl p-10 shadow-sm border border-gray-100 prose prose-headings:text-brand-navy prose-a:text-brand-green max-w-none">
          <p>Landlord Resource (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) is dedicated to respecting the privacy of your personal information, and this privacy policy describes what information is collected from you on landlordresource.co.uk (hereinafter the &quot;website&quot;) and how it is used. The term &quot;you&quot; refers to anyone who uses, visits and/or views the website.</p>
          <p>By visiting and using the website, you accept and agree to be bound by this privacy policy. Your continued use of the website after posting of any changes to our Privacy Policy constitutes your acceptance of those changes and updates. You must not access or use the website if you do not wish to be bound by this Privacy Policy.</p>

          <h2>Children&apos;s Privacy</h2>
          <p>We respect the privacy of children and &quot;child&quot; means an individual under the age of 13. All information and content on this website is intended for individuals over the age of 18. Children under the age of 13 are prohibited from using this website. We do not knowingly collect, use or disclose personal information from children under the age of 13 without prior parental or guardian consent. If you believe any personal information is collected from someone under the age of 13, please contact us to have that information deleted.</p>

          <h2>What Information We Collect and How It Is Used</h2>
          <p>When you access the website, you may provide certain personally identifiable information including but not limited to your name, email address and phone number.</p>
          <p>This information is collected when you register on the site, subscribe to our newsletter, submit a property enquiry, contact us, fill out a form or enter any other information on the website to communicate with us.</p>
          <p>Your personal information is used to personalise your experience, improve the website to better serve you, provide customer service support, efficiently process your requests, and to follow up with you through correspondence (email or phone). We may also use this information to provide you with relevant property investment opportunities and landlord resources.</p>
          <p>Additionally, like other websites, this website automatically collects certain information about you through Log Data and analytics. This includes information about your IP address, browser information, operating system, and browsing patterns. This information is used to analyse website statistics related to user behaviour and interests, and to improve our performance and your use of the website.</p>

          <h2>Use of Cookies</h2>
          <p>The website uses cookies to facilitate your use of the website. Cookies are files with small amounts of data that a website sends to your computer&apos;s hard drive when you are viewing the website.</p>
          <p>We use essential cookies required for authentication (keeping you logged in) and basic site functionality. If you have an account and log in to this website, we will set cookies to maintain your session. These cookies contain no personal data beyond your session identifier and are discarded when you log out.</p>
          <p id="cookies">You have the option of turning off cookies on your computer should you wish to do so. If you choose to do that, you may not be able to access all features of this website, including member-only content such as property listings and template downloads.</p>

          <h2>Third-Party Links and Services</h2>
          <p>We may include, offer or advertise third-party links, products or services on the website. Once you click on a third-party link and leave this website, you are no longer bound by our Privacy Policy.</p>
          <p>We use the following third-party services which may process your data:</p>
          <ul>
            <li><strong>Supabase</strong> — authentication and database hosting</li>
            <li><strong>Resend</strong> — email delivery for newsletters and account notifications</li>
            <li><strong>Cloudflare</strong> — website hosting, CDN and security</li>
          </ul>
          <p>We have no control over these third parties and they have their own privacy policies. You should contact them directly and read their privacy policies for any questions.</p>

          <h2>Disclosure of Your Information</h2>
          <p>As a general rule, we do not disclose your personal information to third parties without your consent with the exception of the following circumstances:</p>
          <ul>
            <li>We may disclose your information to our trusted third parties that work with us such as our website hosting partners, email service provider, and other service providers that assist in the operation of the website.</li>
            <li>We may disclose your information in order to comply with state or federal regulations related to legal claims related to the website.</li>
            <li>We may disclose your information to a successor and/or acquiring party in the event of a merger, acquisition, restructuring, dissolution or partial sale in the future.</li>
          </ul>

          <h2>Email Marketing</h2>
          <p>You have the option of opting in or unsubscribing from our email list. By subscribing and opting in, you agree to receive newsletters, updates, messages, promotional materials and any other content related to this website. This information is kept confidential and we do not share, sell or trade your email information with third parties except as otherwise stated in this privacy policy.</p>
          <p>Should you wish to no longer receive communication from us, you have the option of unsubscribing by clicking &quot;unsubscribe&quot; at the bottom of the email we send to you or by contacting us.</p>

          <h2>Your Rights Under UK GDPR</h2>
          <p>Under the UK General Data Protection Regulation (UK GDPR), you are entitled to the following rights:</p>
          <ul>
            <li><strong>Right of access</strong> — You have the right to request access to your personal data that we store.</li>
            <li><strong>Right to rectification</strong> — You have the right to have your personal data corrected if it is inaccurate or incomplete.</li>
            <li><strong>Right to erasure</strong> — You have the right to request that we delete your personal data.</li>
            <li><strong>Right to restrict processing</strong> — You have the right to request that we restrict the processing of your personal data.</li>
            <li><strong>Right to data portability</strong> — You have the right to request your personal data in a structured, commonly used format.</li>
            <li><strong>Right to object</strong> — You have the right to object to the processing of your data in certain circumstances including direct marketing.</li>
            <li><strong>Right to withdraw consent</strong> — You have the right to withdraw consent at any time without affecting the lawfulness of processing based upon consent that occurred prior to withdrawal.</li>
            <li><strong>Right to lodge a complaint</strong> — You have the right to lodge a complaint with the Information Commissioner&apos;s Office (ICO).</li>
          </ul>
          <p>To exercise any of these rights, email us at <a href="mailto:hello@landlordresource.co.uk">hello@landlordresource.co.uk</a>.</p>

          <h2>Security</h2>
          <p>The security of your personal information is important to us, and we strive to follow generally accepted commercial industry standards to protect your personal information. However, no method of transmission over the Internet is 100% secure and we cannot guarantee the absolute security of your information.</p>
          <p>Passwords are securely hashed and never stored in plain text. Authentication is handled by Supabase, an enterprise-grade authentication provider.</p>
          <p>By using this website, you agree to hold us harmless for any security breach and for any unauthorised use of your personal information by third parties.</p>

          <h2>Privacy Policy Updates</h2>
          <p>This privacy policy will be updated and modified as needed. You are responsible for visiting this page periodically to check for future updates. Any modifications to this privacy policy will be effective upon our publishing of the new terms, and your continued use of our website after the posting of any updates constitutes your acceptance of our modified privacy policy.</p>

          <h2>Contact</h2>
          <p>For any questions or comments regarding the privacy policy, please contact us at <a href="mailto:hello@landlordresource.co.uk">hello@landlordresource.co.uk</a>.</p>
        </div>
      </div>
    </div>
  );
}
