import Layout from "@/components/Layout";
import { Shield } from "lucide-react";

function Section({
  title,
  children,
}: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="font-display text-xl font-semibold text-foreground">
        {title}
      </h2>
      <div className="text-sm text-muted-foreground leading-relaxed space-y-2">
        {children}
      </div>
    </section>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <Layout>
      {/* Hero */}
      <div className="bg-primary/5 border-b border-border py-14 px-4">
        <div className="container mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-primary/10 mb-4">
            <Shield className="h-7 w-7 text-primary" />
          </div>
          <h1 className="font-display text-4xl font-bold text-foreground mb-3">
            Privacy Policy
          </h1>
          <p className="text-muted-foreground">
            Last updated: April 2024 &nbsp;|&nbsp; Solura Cosmetics, Karur,
            Tamil Nadu
          </p>
        </div>
      </div>

      <div className="bg-background py-12 px-4">
        <div className="container mx-auto max-w-3xl space-y-8">
          <p className="text-sm text-muted-foreground leading-relaxed">
            Solura Cosmetics ("we", "our", or "us") is committed to protecting
            your privacy. This Privacy Policy explains how we collect, use,
            store, and share your personal information when you visit our
            website or make a purchase from us. By using our website, you
            consent to the practices described in this policy.
          </p>

          <Section title="1. Information We Collect">
            <p>
              <strong className="text-foreground">Personal Information:</strong>{" "}
              Name, email address, phone number, shipping and billing address,
              and payment information provided during registration or checkout.
            </p>
            <p>
              <strong className="text-foreground">Order Information:</strong>{" "}
              Products purchased, order amounts, transaction IDs, and order
              history.
            </p>
            <p>
              <strong className="text-foreground">Usage Data:</strong> Pages
              visited, time spent on site, browser type, device, operating
              system, and IP address collected automatically through cookies and
              analytics tools.
            </p>
            <p>
              <strong className="text-foreground">Communications:</strong>{" "}
              Messages sent to us via email, the contact form, or customer
              support channels.
            </p>
          </Section>

          <Section title="2. How We Use Your Information">
            <p>We use the information we collect to:</p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>Process and fulfil your orders</li>
              <li>Send order confirmations, shipping updates, and invoices</li>
              <li>Respond to customer service requests and support queries</li>
              <li>Improve our website, products, and customer experience</li>
              <li>
                Send promotional emails and offers (only with your consent;
                unsubscribe at any time)
              </li>
              <li>Comply with legal obligations and resolve disputes</li>
              <li>Detect and prevent fraud and unauthorised transactions</li>
            </ul>
          </Section>

          <Section title="3. Payment Information">
            <p>
              All payment transactions are processed securely through Razorpay,
              a PCI DSS Level 1 certified payment gateway. We do not store your
              credit/debit card numbers on our servers. Razorpay's privacy
              policy governs the handling of your payment data.
            </p>
          </Section>

          <Section title="4. Cookies and Tracking Technologies">
            <p>
              We use cookies and similar technologies to enhance your browsing
              experience, remember your preferences, and analyse site traffic.
              You can control cookie settings through your browser, but
              disabling cookies may affect site functionality.
            </p>
            <p>
              We may use third-party analytics services (such as Google
              Analytics) to understand usage patterns. These services may
              collect anonymised data in accordance with their own privacy
              policies.
            </p>
          </Section>

          <Section title="5. Sharing of Information">
            <p>
              We do not sell, trade, or rent your personal information to third
              parties. We may share your information with:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>
                <strong className="text-foreground">Shipping partners</strong> —
                to fulfil and deliver your orders
              </li>
              <li>
                <strong className="text-foreground">Payment processors</strong>{" "}
                — Razorpay, for transaction processing
              </li>
              <li>
                <strong className="text-foreground">Legal authorities</strong> —
                when required by law or court order
              </li>
              <li>
                <strong className="text-foreground">Service providers</strong> —
                third-party vendors who assist us in operating our website and
                business, bound by confidentiality agreements
              </li>
            </ul>
          </Section>

          <Section title="6. Data Retention">
            <p>
              We retain your personal information for as long as necessary to
              provide our services and comply with legal obligations (typically
              5 years for financial records as required by Indian tax law). You
              may request deletion of your account data at any time by emailing
              us.
            </p>
          </Section>

          <Section title="7. Your Rights">
            <p>You have the right to:</p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>
                Request deletion of your personal data (subject to legal
                obligations)
              </li>
              <li>Opt out of marketing communications at any time</li>
              <li>
                Lodge a complaint with the relevant data protection authority
              </li>
            </ul>
            <p>
              To exercise any of these rights, email us at{" "}
              <a
                href="mailto:contact@soluracosmo.com"
                className="text-primary hover:underline"
              >
                contact@soluracosmo.com
              </a>
              .
            </p>
          </Section>

          <Section title="8. Security">
            <p>
              We implement industry-standard security measures including SSL
              encryption to protect your data in transit. However, no method of
              transmission over the internet or electronic storage is 100%
              secure. We strive to use commercially acceptable means to protect
              your data but cannot guarantee absolute security.
            </p>
          </Section>

          <Section title="9. Third-Party Links">
            <p>
              Our website may contain links to third-party websites. We are not
              responsible for the privacy practices of those sites. We encourage
              you to review the privacy policy of every website you visit.
            </p>
          </Section>

          <Section title="10. Children's Privacy">
            <p>
              Our services are not directed to individuals under the age of 18.
              We do not knowingly collect personal information from minors. If
              we become aware that a child has provided us with personal data,
              we will delete it promptly.
            </p>
          </Section>

          <Section title="11. Changes to This Policy">
            <p>
              We reserve the right to update this Privacy Policy from time to
              time. Changes will be posted on this page with an updated revision
              date. We encourage you to review this page periodically.
            </p>
          </Section>

          <Section title="12. Contact Us">
            <p>
              For any privacy-related queries or to exercise your rights,
              contact us at:
            </p>
            <div className="bg-card rounded-xl border border-border p-4 mt-2 not-italic">
              <p className="font-medium text-foreground">Solura Cosmetics</p>
              <p>184, South Manthai Street, Pallapatti</p>
              <p>Karur, Tamil Nadu 639205</p>
              <p>
                Email:{" "}
                <a
                  href="mailto:contact@soluracosmo.com"
                  className="text-primary hover:underline"
                >
                  contact@soluracosmo.com
                </a>
              </p>
              <p>GST: 33AFUFS3776C1ZM</p>
            </div>
          </Section>
        </div>
      </div>
    </Layout>
  );
}
