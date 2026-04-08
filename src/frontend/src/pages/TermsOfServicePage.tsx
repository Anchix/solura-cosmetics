import Layout from "@/components/Layout";
import { FileText } from "lucide-react";

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

export default function TermsOfServicePage() {
  return (
    <Layout>
      {/* Hero */}
      <div className="bg-primary/5 border-b border-border py-14 px-4">
        <div className="container mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-primary/10 mb-4">
            <FileText className="h-7 w-7 text-primary" />
          </div>
          <h1 className="font-display text-4xl font-bold text-foreground mb-3">
            Terms of Service
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
            Welcome to Solura Cosmetics. By accessing or using our website and
            purchasing our products, you agree to be bound by the following
            Terms of Service. Please read them carefully before making any
            purchase. If you do not agree with these terms, please refrain from
            using our website.
          </p>

          <Section title="1. About Us">
            <p>
              Solura Cosmetics is a beauty brand operated from Karur, Tamil
              Nadu, India. Our registered business address is 184, South Manthai
              Street, Pallapatti, Karur, Tamil Nadu 639205. GST Registration:
              33AFUFS3776C1ZM.
            </p>
          </Section>

          <Section title="2. Eligibility">
            <p>
              You must be at least 18 years old to make a purchase on our
              website. By using our services, you represent and warrant that you
              are of legal age and have the legal capacity to enter into a
              binding agreement.
            </p>
          </Section>

          <Section title="3. Products and Pricing">
            <p>
              All prices are listed in Indian Rupees (INR) and are inclusive of
              applicable GST. We reserve the right to modify prices at any time
              without prior notice. Prices at the time of order placement will
              apply.
            </p>
            <p>
              Product images are for illustrative purposes only. Actual product
              appearance may vary slightly due to photography and screen display
              differences. We strive to accurately describe all products but do
              not warrant that descriptions are 100% complete or error-free.
            </p>
            <p>
              We reserve the right to limit quantities, discontinue products, or
              refuse orders at our sole discretion.
            </p>
          </Section>

          <Section title="4. Orders and Payment">
            <p>
              By placing an order, you make an offer to purchase the product(s)
              listed. Your order is confirmed only upon receipt of our
              confirmation email. We accept payments via Razorpay (credit/debit
              cards, UPI, net banking, digital wallets) and Cash on Delivery
              (COD).
            </p>
            <p>
              A COD handling charge of ₹40 is added to Cash on Delivery orders.
              Razorpay transactions are subject to Razorpay's own terms and
              conditions.
            </p>
            <p>
              We reserve the right to cancel any order in the event of pricing
              errors, unavailability of stock, or suspected fraudulent activity.
              In such cases, a full refund will be issued.
            </p>
          </Section>

          <Section title="5. Shipping and Delivery">
            <p>
              Delivery timelines and shipping charges are outlined in our
              Shipping & Returns policy. Delivery dates are estimates and not
              guaranteed. We are not responsible for delays caused by courier
              partners, natural events, or circumstances beyond our control.
            </p>
            <p>
              Risk of loss and title for items purchased pass to you upon
              delivery of the items to the carrier.
            </p>
          </Section>

          <Section title="6. Returns and Refunds">
            <p>
              Our return and refund policy is detailed in the Shipping & Returns
              page. By making a purchase, you agree to be bound by those terms.
              We reserve the right to reject returns that do not meet the
              eligibility criteria.
            </p>
          </Section>

          <Section title="7. Intellectual Property">
            <p>
              All content on this website — including text, images, logos,
              product descriptions, and design — is the intellectual property of
              Solura Cosmetics and is protected under applicable Indian and
              international intellectual property laws.
            </p>
            <p>
              You may not reproduce, distribute, or create derivative works from
              any content on this website without our prior written consent.
            </p>
          </Section>

          <Section title="8. User Accounts">
            <p>
              If you create an account, you are responsible for maintaining the
              confidentiality of your login credentials and for all activities
              that occur under your account. Notify us immediately of any
              unauthorised use of your account.
            </p>
            <p>
              We reserve the right to suspend or terminate accounts that violate
              these terms, engage in fraudulent activity, or misuse our
              platform.
            </p>
          </Section>

          <Section title="9. Product Use and Disclaimer">
            <p>
              Our products are intended for external cosmetic use only. Always
              read the label and ingredient list before use. Perform a patch
              test before first use. We are not responsible for allergic
              reactions resulting from failure to read ingredient disclosures.
            </p>
            <p>
              Product results may vary by individual. Testimonials and reviews
              represent individual experiences and are not guaranteed results.
            </p>
          </Section>

          <Section title="10. Limitation of Liability">
            <p>
              To the fullest extent permitted by law, Solura Cosmetics shall not
              be liable for any indirect, incidental, special, or consequential
              damages arising from your use of our products or website. Our
              total liability in any matter shall not exceed the value of the
              specific order giving rise to the claim.
            </p>
          </Section>

          <Section title="11. Governing Law">
            <p>
              These Terms of Service shall be governed by and construed in
              accordance with the laws of India. Any disputes arising shall be
              subject to the exclusive jurisdiction of the courts in Karur,
              Tamil Nadu.
            </p>
          </Section>

          <Section title="12. Changes to Terms">
            <p>
              We reserve the right to modify these Terms of Service at any time.
              Updated terms will be posted on this page. Continued use of our
              website after changes are posted constitutes your acceptance of
              the revised terms.
            </p>
          </Section>

          <Section title="13. Contact Us">
            <p>For questions or concerns about these Terms, contact us at:</p>
            <div className="bg-card rounded-xl border border-border p-4 mt-2">
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
            </div>
          </Section>
        </div>
      </div>
    </Layout>
  );
}
