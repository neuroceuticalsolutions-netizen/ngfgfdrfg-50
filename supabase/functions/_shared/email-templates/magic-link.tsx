/// <reference types="npm:@types/react@18.3.1" />
import * as React from 'npm:react@18.3.1'
import { Button, Heading, Section, Text } from 'npm:@react-email/components@0.0.22'
import { BrandLayout, styles } from './_brand.tsx'

interface MagicLinkEmailProps {
  siteName: string
  confirmationUrl: string
}

export const MagicLinkEmail = ({ siteName, confirmationUrl }: MagicLinkEmailProps) => (
  <BrandLayout preview={`Your secure login link for ${siteName}`}>
    <Heading style={styles.h1}>Your secure login link</Heading>
    <Text style={styles.text}>
      Tap the button below to sign in to {siteName}. For your security, this
      link expires shortly and can only be used once.
    </Text>
    <Section style={styles.buttonWrap}>
      <Button style={styles.button} href={confirmationUrl}>
        Sign in to {siteName}
      </Button>
    </Section>
    <Text style={styles.text}>
      Didn't request this? You can safely ignore this email — no one can
      access your account without it.
    </Text>
  </BrandLayout>
)

export default MagicLinkEmail
