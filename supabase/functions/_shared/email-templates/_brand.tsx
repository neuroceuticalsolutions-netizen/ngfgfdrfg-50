/// <reference types="npm:@types/react@18.3.1" />
import * as React from 'npm:react@18.3.1'
import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from 'npm:@react-email/components@0.0.22'

// Neuroceutical brand tokens (mirrors src/index.css)
export const brand = {
  purple: 'hsl(271, 50%, 35%)',        // royal purple
  purpleDark: 'hsl(271, 55%, 25%)',
  purpleLight: 'hsl(271, 50%, 45%)',
  teal: 'hsl(172, 70%, 50%)',          // fresh teal accent
  tealSoft: 'hsl(172, 70%, 96%)',
  ink: 'hsl(210, 22%, 8%)',
  muted: 'hsl(210, 11%, 46%)',
  border: 'hsl(210, 16%, 92%)',
  bg: '#ffffff',
  font:
    'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif',
}

export const styles = {
  main: { backgroundColor: brand.bg, fontFamily: brand.font, margin: 0 },
  container: {
    maxWidth: '560px',
    margin: '0 auto',
    padding: '0 0 32px',
    backgroundColor: brand.bg,
  },
  header: {
    background: `linear-gradient(135deg, ${brand.purpleDark} 0%, ${brand.purple} 60%, ${brand.purpleLight} 100%)`,
    backgroundColor: brand.purple,
    padding: '28px 28px 24px',
    borderRadius: '0 0 0 0',
  } as const,
  brandRow: {
    fontSize: '11px',
    fontWeight: 700,
    letterSpacing: '0.18em',
    textTransform: 'uppercase' as const,
    color: brand.teal,
    margin: '0 0 6px',
  },
  brandName: {
    fontSize: '20px',
    fontWeight: 700,
    color: '#ffffff',
    margin: 0,
    letterSpacing: '-0.01em',
  },
  tealRule: {
    height: '3px',
    backgroundColor: brand.teal,
    border: 'none',
    margin: 0,
  } as const,
  body: { padding: '32px 28px 8px' },
  h1: {
    fontSize: '24px',
    fontWeight: 700,
    color: brand.ink,
    margin: '0 0 16px',
    letterSpacing: '-0.01em',
  },
  text: {
    fontSize: '15px',
    color: brand.muted,
    lineHeight: '1.6',
    margin: '0 0 18px',
  },
  link: { color: brand.purple, textDecoration: 'underline' },
  buttonWrap: { margin: '8px 0 24px' },
  button: {
    backgroundColor: brand.purple,
    color: '#ffffff',
    fontSize: '15px',
    fontWeight: 600,
    borderRadius: '12px',
    display: 'inline-block',
    padding: '14px 24px',
    textDecoration: 'none',
    boxShadow: `0 8px 20px -8px ${brand.purple}`,
  },
  codeCard: {
    backgroundColor: brand.tealSoft,
    border: `1px solid ${brand.teal}`,
    borderRadius: '12px',
    padding: '18px 20px',
    margin: '4px 0 24px',
    textAlign: 'center' as const,
  },
  codeText: {
    fontFamily: '"SFMono-Regular", Menlo, Consolas, monospace',
    fontSize: '28px',
    fontWeight: 700,
    color: brand.purpleDark,
    letterSpacing: '0.24em',
    margin: 0,
  },
  divider: {
    borderTop: `1px solid ${brand.border}`,
    margin: '24px 0 16px',
  } as const,
  footer: {
    fontSize: '12px',
    color: brand.muted,
    lineHeight: '1.6',
    margin: '0 0 6px',
    padding: '0 28px',
  },
  footerSmall: {
    fontSize: '11px',
    color: brand.muted,
    margin: '8px 0 0',
    padding: '0 28px',
  },
}

export const BrandLayout = ({
  preview,
  children,
}: {
  preview: string
  children: React.ReactNode
}) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>{preview}</Preview>
    <Body style={styles.main}>
      <Container style={styles.container}>
        <Section style={styles.header}>
          <Text style={styles.brandRow}>Neuroceutical Solutions</Text>
          <Text style={styles.brandName}>Cognitive performance, delivered.</Text>
        </Section>
        <Hr style={styles.tealRule} />
        <Section style={styles.body}>{children}</Section>
        <Hr style={styles.divider} />
        <Text style={styles.footer}>
          You received this email because of an action on your Neuroceutical
          Solutions account. If this wasn't you, you can safely ignore it.
        </Text>
        <Text style={styles.footer}>
          Need help? Contact our support team at{' '}
          <a href="mailto:support@neuroceutical.co.za" style={styles.link}>
            support@neuroceutical.co.za
          </a>{' '}
          or visit{' '}
          <a href="https://neuroceutical.co.za" style={styles.link}>
            neuroceutical.co.za
          </a>
          .
        </Text>
        <Text style={styles.footerSmall}>
          <strong>Disclaimer:</strong> Neuroceutical Solutions products are
          dietary supplements intended to support cognitive performance and
          general wellbeing. They are not intended to diagnose, treat, cure,
          or prevent any disease. Always consult a qualified healthcare
          professional before starting any supplement, especially if you are
          pregnant, nursing, taking medication, or have a medical condition.
          Statements have not been evaluated by SAHPRA.
        </Text>
        <Text style={styles.footerSmall}>
          <strong>Email consent:</strong> You're receiving this transactional
          email because you created an account or requested an action on
          neuroceutical.co.za, in line with our{' '}
          <a href="https://neuroceutical.co.za/privacy" style={styles.link}>
            Privacy Policy
          </a>{' '}
          and POPIA. To manage your email preferences or opt out of
          non-essential messages, visit{' '}
          <a href="https://neuroceutical.co.za/unsubscribe" style={styles.link}>
            neuroceutical.co.za/unsubscribe
          </a>
          . Note: essential security and account emails (sign-in, password
          reset, email verification) will still be sent.
        </Text>
        <Text style={styles.footerSmall}>
          <strong>SMS notifications:</strong> SMS is{' '}
          <em>off by default</em>. You will only receive transactional SMS
          (e.g. verification codes, order updates) if you have explicitly
          opted in and added a mobile number under{' '}
          <a
            href="https://neuroceutical.co.za/account/sms-preferences"
            style={styles.link}
          >
            Account → SMS preferences
          </a>
          . You can withdraw SMS consent there at any time, or by replying
          STOP to any SMS we send. Standard carrier rates may apply.
        </Text>
        <Text style={styles.footerSmall}>
          © Neuroceutical Solutions · South Africa ·{' '}
          <a href="https://neuroceutical.co.za/privacy" style={styles.link}>
            Privacy
          </a>{' '}
          ·{' '}
          <a href="https://neuroceutical.co.za/terms" style={styles.link}>
            Terms
          </a>{' '}
          ·{' '}
          <a href="https://neuroceutical.co.za/disclaimer" style={styles.link}>
            Disclaimer
          </a>
        </Text>
      </Container>
    </Body>
  </Html>
)