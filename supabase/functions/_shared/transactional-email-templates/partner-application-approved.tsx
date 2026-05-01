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

const PartnerApplicationApprovedEmail = ({
  name,
  companyName,
  applicationId,
  notes,
}: Props) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Welcome aboard — your distribution partnership is approved</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>
          {name ? `Welcome aboard, ${name}!` : 'Welcome aboard!'}
        </Heading>
        <Text style={text}>
          We are excited to confirm that your free sample distribution
          application{companyName ? ` for ${companyName}` : ''} has been{' '}
          <strong>approved</strong>. Our partnerships team will be in touch
          shortly to coordinate your first sample shipment and onboarding
          materials.
        </Text>
        {notes ? (
          <Text style={notesBlock}>
            <strong>Note from our team:</strong> {notes}
          </Text>
        ) : null}
        <Button href="https://neuroceutical.lovable.app/partners/apply" style={button}>
          View partner resources
        </Button>
        {applicationId ? (
          <Text style={meta}>Reference: {applicationId}</Text>
        ) : null}
        <Text style={footer}>— The {SITE_NAME} Partnerships Team</Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: PartnerApplicationApprovedEmail,
  subject: 'Your distribution partnership has been approved',
  displayName: 'Partner application — approved',
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
  margin: '0 0 20px',
}
const notesBlock = {
  fontSize: '14px',
  color: 'hsl(210, 22%, 8%)',
  lineHeight: '1.6',
  backgroundColor: 'hsl(172, 70%, 96%)',
  borderRadius: '12px',
  padding: '14px 16px',
  margin: '0 0 20px',
}
const button = {
  backgroundColor: 'hsl(271, 50%, 35%)',
  color: '#ffffff',
  padding: '12px 20px',
  borderRadius: '12px',
  fontSize: '14px',
  fontWeight: 600,
  textDecoration: 'none',
  display: 'inline-block',
  margin: '0 0 24px',
}
const meta = { fontSize: '12px', color: 'hsl(210, 11%, 46%)', margin: '0 0 16px' }
const footer = { fontSize: '12px', color: '#999999', margin: '24px 0 0' }