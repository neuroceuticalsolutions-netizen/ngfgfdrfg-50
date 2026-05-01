/// <reference types="npm:@types/react@18.3.1" />
import * as React from 'npm:react@18.3.1'
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_NAME = 'Neuroceutical Solutions'

interface Props {
  name?: string
  companyName?: string
  applicationId?: string
  notes?: string
}

const PartnerApplicationReviewingEmail = ({
  name,
  companyName,
  applicationId,
  notes,
}: Props) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Your distribution application is now under review</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>
          {name ? `Hi ${name},` : 'Hi there,'}
        </Heading>
        <Text style={text}>
          Good news — your free sample distribution application
          {companyName ? ` for ${companyName}` : ''} has moved into{' '}
          <strong>active review</strong>. Our partnerships team is now
          assessing venue fit, audience alignment, and logistics.
        </Text>
        <Text style={text}>
          You can expect a final decision within a few business days. We may
          reach out if we need additional information.
        </Text>
        {notes ? (
          <Text style={notesBlock}>
            <strong>Note from our team:</strong> {notes}
          </Text>
        ) : null}
        {applicationId ? (
          <Text style={meta}>Reference: {applicationId}</Text>
        ) : null}
        <Text style={footer}>— The {SITE_NAME} Partnerships Team</Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: PartnerApplicationReviewingEmail,
  subject: 'Your distribution application is under review',
  displayName: 'Partner application — under review',
  previewData: {
    name: 'Jordan',
    companyName: 'Apex Coworking',
    applicationId: 'app_123',
    notes: '',
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
  margin: '0 0 16px',
}
const notesBlock = {
  fontSize: '14px',
  color: 'hsl(210, 22%, 8%)',
  lineHeight: '1.6',
  backgroundColor: 'hsl(172, 70%, 96%)',
  borderRadius: '12px',
  padding: '14px 16px',
  margin: '8px 0 20px',
}
const meta = { fontSize: '12px', color: 'hsl(210, 11%, 46%)', margin: '0 0 16px' }
const footer = { fontSize: '12px', color: '#999999', margin: '24px 0 0' }