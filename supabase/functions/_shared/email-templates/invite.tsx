/// <reference types="npm:@types/react@18.3.1" />
import * as React from 'npm:react@18.3.1'
import { Button, Heading, Link, Section, Text } from 'npm:@react-email/components@0.0.22'
import { BrandLayout, styles } from './_brand.tsx'

interface InviteEmailProps {
  siteName: string
  siteUrl: string
  confirmationUrl: string
}

export const InviteEmail = ({ siteName, siteUrl, confirmationUrl }: InviteEmailProps) => (
  <BrandLayout preview={`You've been invited to join ${siteName}`}>
    <Heading style={styles.h1}>You're invited</Heading>
    <Text style={styles.text}>
      You've been invited to join{' '}
      <Link href={siteUrl} style={styles.link}>
        <strong>{siteName}</strong>
      </Link>
      . Accept your invitation to set up your account and get started.
    </Text>
    <Section style={styles.buttonWrap}>
      <Button style={styles.button} href={confirmationUrl}>
        Accept invitation
      </Button>
    </Section>
    <Text style={styles.text}>
      Wasn't expecting this? You can safely ignore this email.
    </Text>
  </BrandLayout>
)

export default InviteEmail
