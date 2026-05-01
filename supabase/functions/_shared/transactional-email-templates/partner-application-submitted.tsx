/// <reference types="npm:@types/react@18.3.1" />
import * as React from 'npm:react@18.3.1'
import {
  Body,
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
  companyName?: string
  applicationId?: string
}

const PartnerApplicationSubmittedEmail = ({
  name,
  companyName,
  applicationId,
}: Props) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>We received your free sample distribution application</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>
          {name ? `Thanks, ${name}!` : 'Thanks for your application!'}
        </Heading>
        <Text style={text}>
          We have received your free sample distribution application
          {companyName ? ` for ${companyName}` : ''}. Our partnerships team
          will review your submission and follow up with next steps shortly.
        </Text>
        <Section style={card}>
          <Text style={cardLabel}>What happens next</Text>
          <Text style={cardBody}>
            1. We confirm receipt of your application (this email).<br />
            2. Our team reviews your venue and audience fit.<br />
            3. You receive a decision with onboarding instructions.
          </Text>
        </Section>
        {applicationId ? (
          <Text style={meta}>Reference: {applicationId}</Text>
        ) : null}
        <Text style={footer}>— The {SITE_NAME} Partnerships Team</Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: PartnerApplicationSubmittedEmail,
  subject: 'We received your distribution application',
  displayName: 'Partner application — submitted',
  previewData: {
    name: 'Jordan',
    companyName: 'Apex Coworking',
    applicationId: 'app_123',
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
  margin: '0 0 20px',
}
const card = {
  backgroundColor: 'hsl(271, 50%, 97%)',
  borderRadius: '12px',
  padding: '16px 18px',
  margin: '0 0 20px',
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
  fontSize: '14px',
  color: 'hsl(210, 22%, 8%)',
  lineHeight: '1.6',
  margin: 0,
}
const meta = { fontSize: '12px', color: 'hsl(210, 11%, 46%)', margin: '0 0 16px' }
const footer = { fontSize: '12px', color: '#999999', margin: '24px 0 0' }