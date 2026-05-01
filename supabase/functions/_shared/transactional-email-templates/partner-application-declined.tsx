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

const PartnerApplicationDeclinedEmail = ({
  name,
  companyName,
  applicationId,
  notes,
}: Props) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>An update on your distribution application</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>
          {name ? `Hi ${name},` : 'Hi there,'}
        </Heading>
        <Text style={text}>
          Thank you for your interest in becoming a free sample distribution
          partner{companyName ? ` for ${companyName}` : ''}. After a thorough
          review, we are unable to move forward with your application at
          this time.
        </Text>
        {notes ? (
          <Text style={notesBlock}>
            <strong>Note from our team:</strong> {notes}
          </Text>
        ) : null}
        <Text style={text}>
          We genuinely appreciate the time you spent applying. Our partner
          criteria evolve as we expand, and you are welcome to re-apply in
          the future.
        </Text>
        {applicationId ? (
          <Text style={meta}>Reference: {applicationId}</Text>
        ) : null}
        <Text style={footer}>— The {SITE_NAME} Partnerships Team</Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: PartnerApplicationDeclinedEmail,
  subject: 'An update on your distribution application',
  displayName: 'Partner application — declined',
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
  backgroundColor: 'hsl(210, 16%, 96%)',
  borderRadius: '12px',
  padding: '14px 16px',
  margin: '8px 0 16px',
}
const meta = { fontSize: '12px', color: 'hsl(210, 11%, 46%)', margin: '0 0 16px' }
const footer = { fontSize: '12px', color: '#999999', margin: '24px 0 0' }