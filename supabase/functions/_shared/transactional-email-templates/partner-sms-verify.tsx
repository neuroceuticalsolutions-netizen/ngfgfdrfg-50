/// <reference types="npm:@types/react@18.3.1" />
import * as React from 'npm:react@18.3.1'
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_NAME = 'Neuroceutical Solutions'

interface Props {
  name?: string
  phoneMasked?: string
  verifyUrl: string
}

const PartnerSmsVerifyEmail = ({ name, phoneMasked, verifyUrl }: Props) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Confirm your SMS number — link valid for 14 days</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>
          {name ? `Hi ${name}, confirm your SMS number` : 'Confirm your SMS number'}
        </Heading>
        <Text style={text}>
          You opted in to receive transactional SMS updates about your free
          sample distribution application
          {phoneMasked ? ` on ${phoneMasked}` : ''}. To meet POPIA consent
          requirements and protect your number, please confirm it by clicking
          the button below. We will not send you any SMS until you do.
        </Text>
        <Section style={{ textAlign: 'center' as const, margin: '24px 0' }}>
          <Button href={verifyUrl} style={button}>
            Confirm my SMS number
          </Button>
        </Section>
        <Text style={meta}>
          This confirmation link is valid for <strong>14 days</strong> and can
          only be used once. If the button does not work, copy and paste this
          link into your browser:<br />
          <span style={{ wordBreak: 'break-all' as const }}>{verifyUrl}</span>
        </Text>
        <Section style={consentCard}>
          <Text style={consentLabel}>What you're consenting to (POPIA)</Text>
          <Text style={cardBody}>
            • Essential, transactional SMS only — application status,
            verification, and onboarding instructions.<br />
            • <strong>No marketing, promotions, or third-party messages</strong>,
            ever.<br />
            • Standard SA carrier rates may apply to any reply.<br />
            • You can withdraw consent at any time by replying{' '}
            <strong>STOP</strong> to any SMS, or emailing{' '}
            privacy@neuroceutical.co.za. Withdrawal takes effect immediately.
          </Text>
        </Section>
        <Section style={card}>
          <Text style={cardLabel}>Didn't request this?</Text>
          <Text style={cardBody}>
            You can safely ignore this email — no SMS will be sent unless
            you confirm, and your number will not be stored as verified. If
            you believe someone used your number without permission, please
            email privacy@neuroceutical.co.za so we can remove it.
          </Text>
        </Section>
        <Text style={legal}>
          Responsible party: {SITE_NAME} (South Africa). We process your
          number under POPIA on the basis of your consent, solely to send
          you the transactional SMS described above. See our Privacy Policy
          for retention and your rights of access, correction, and deletion.
        </Text>
        <Text style={footer}>— The {SITE_NAME} Partnerships Team</Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: PartnerSmsVerifyEmail,
  subject: 'Confirm your SMS number for distribution updates',
  displayName: 'Partner — confirm SMS number',
  previewData: {
    name: 'Jordan',
    phoneMasked: '+27 ••• ••• 1234',
    verifyUrl: 'https://neuroceutical.lovable.app/partners/sms-verify?token=preview-token',
  },
} satisfies TemplateEntry

const main = {
  backgroundColor: '#ffffff',
  fontFamily:
    'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif',
}
const container = { padding: '24px 28px', maxWidth: '560px' }
const h1 = {
  fontSize: '22px',
  fontWeight: 700,
  color: 'hsl(210, 22%, 8%)',
  margin: '0 0 16px',
}
const text = {
  fontSize: '14px',
  color: 'hsl(210, 11%, 46%)',
  lineHeight: '1.6',
  margin: '0 0 12px',
}
const button = {
  backgroundColor: 'hsl(271, 50%, 35%)',
  color: '#ffffff',
  padding: '12px 22px',
  borderRadius: '8px',
  fontSize: '14px',
  fontWeight: 600,
  textDecoration: 'none',
  display: 'inline-block',
}
const card = {
  backgroundColor: 'hsl(271, 50%, 97%)',
  borderRadius: '12px',
  padding: '16px 18px',
  margin: '20px 0 0',
}
const cardLabel = {
  fontSize: '12px',
  fontWeight: 600,
  color: 'hsl(271, 50%, 35%)',
  letterSpacing: '0.04em',
  textTransform: 'uppercase' as const,
  margin: '0 0 8px',
}
const cardBody = {
  fontSize: '13px',
  color: 'hsl(210, 22%, 8%)',
  lineHeight: '1.6',
  margin: 0,
}
const consentCard = {
  backgroundColor: 'hsl(174, 60%, 96%)',
  border: '1px solid hsl(174, 60%, 85%)',
  borderRadius: '12px',
  padding: '16px 18px',
  margin: '20px 0 0',
}
const consentLabel = {
  fontSize: '12px',
  fontWeight: 700,
  color: 'hsl(174, 60%, 28%)',
  letterSpacing: '0.04em',
  textTransform: 'uppercase' as const,
  margin: '0 0 8px',
}
const legal = {
  fontSize: '11px',
  color: 'hsl(210, 11%, 46%)',
  lineHeight: '1.55',
  margin: '20px 0 0',
}
const meta = {
  fontSize: '12px',
  color: 'hsl(210, 11%, 46%)',
  margin: '0 0 16px',
  lineHeight: '1.5',
}
const footer = { fontSize: '12px', color: '#999999', margin: '24px 0 0' }