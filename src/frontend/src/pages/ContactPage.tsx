import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  CheckCircle2,
  Clock,
  Instagram,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setSubmitted(true);
    toast.success("Message sent! We'll get back to you within 24 hours.");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    if (name === "phone" && !/^\d*$/.test(value)) return;
    setForm((p) => ({ ...p, [name]: value }));
  };

  return (
    <Layout>
      {/* Hero */}
      <div className="bg-primary/5 border-b border-border py-14 px-4">
        <div className="container mx-auto max-w-2xl text-center">
          <p className="text-primary font-medium text-sm tracking-widest uppercase mb-3">
            Get in Touch
          </p>
          <h1 className="font-display text-4xl font-bold text-foreground mb-3">
            We'd love to hear from you
          </h1>
          <p className="text-muted-foreground text-lg">
            Questions, feedback, or partnership enquiries — our team is here to
            help.
          </p>
        </div>
      </div>

      <div className="bg-background py-12 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="grid lg:grid-cols-5 gap-10">
            {/* Contact info */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                  Contact Information
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="h-9 w-9 rounded-lg bg-primary/8 flex items-center justify-center flex-shrink-0">
                      <Mail className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">
                        Email
                      </p>
                      <a
                        href="mailto:contact@soluracosmo.com"
                        className="text-sm text-foreground hover:text-primary transition-colors"
                        data-ocid="contact-email-link"
                      >
                        contact@soluracosmo.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-9 w-9 rounded-lg bg-primary/8 flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">
                        Address
                      </p>
                      <p className="text-sm text-foreground">
                        184, South Manthai Street
                        <br />
                        Pallapatti, Karur
                        <br />
                        Tamil Nadu 639205
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-9 w-9 rounded-lg bg-primary/8 flex items-center justify-center flex-shrink-0">
                      <Clock className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">
                        Support Hours
                      </p>
                      <p className="text-sm text-foreground">
                        Monday – Saturday
                        <br />
                        10:00 AM – 6:00 PM IST
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-9 w-9 rounded-lg bg-primary/8 flex items-center justify-center flex-shrink-0">
                      <Instagram className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">
                        Instagram
                      </p>
                      <a
                        href="https://www.instagram.com/solura_cosmo?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-foreground hover:text-primary transition-colors"
                      >
                        @solura_cosmo
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-primary/5 rounded-xl border border-primary/20 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Phone className="h-4 w-4 text-primary" />
                  <p className="text-sm font-semibold text-foreground">
                    Fastest Response
                  </p>
                </div>
                <p className="text-xs text-muted-foreground">
                  For urgent order issues, email us at{" "}
                  <a
                    href="mailto:contact@soluracosmo.com"
                    className="text-primary hover:underline"
                  >
                    contact@soluracosmo.com
                  </a>{" "}
                  with your order ID. We typically respond within 4 hours on
                  working days.
                </p>
              </div>
            </div>

            {/* Contact form */}
            <div className="lg:col-span-3">
              {submitted ? (
                <div className="flex flex-col items-center justify-center h-full min-h-64 text-center bg-card rounded-2xl border border-border p-10">
                  <CheckCircle2 className="h-14 w-14 text-primary mb-4" />
                  <h2 className="font-display text-2xl font-bold text-foreground mb-2">
                    Message Received!
                  </h2>
                  <p className="text-muted-foreground">
                    Thank you for reaching out. Our team will get back to you
                    within 24 hours on working days.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setForm({
                        name: "",
                        email: "",
                        phone: "",
                        subject: "",
                        message: "",
                      });
                    }}
                    className="mt-6 text-sm text-primary hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <div className="bg-card rounded-2xl border border-border p-8">
                  <h2 className="font-display text-xl font-semibold text-foreground mb-6">
                    Send us a Message
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="name">
                          Full Name <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          placeholder="Priya Krishnamurthy"
                          required
                          data-ocid="contact-name"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          inputMode="numeric"
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="9876543210"
                          maxLength={10}
                          data-ocid="contact-phone"
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="email">
                        Email Address{" "}
                        <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="priya@example.com"
                        required
                        data-ocid="contact-email"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        placeholder="e.g. Order issue, Product query..."
                        data-ocid="contact-subject"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="message">
                        Message <span className="text-destructive">*</span>
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Tell us how we can help you..."
                        rows={5}
                        required
                        data-ocid="contact-message"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full"
                      data-ocid="contact-submit"
                    >
                      Send Message
                    </Button>
                    <p className="text-xs text-muted-foreground text-center">
                      We typically respond within 24 hours on working days.
                    </p>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
