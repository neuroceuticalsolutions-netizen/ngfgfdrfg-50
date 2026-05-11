/// <reference types="npm:@types/react@18.3.1" />
import * as React from 'npm:react@18.3.1'
import { Button, Heading, Link, Section, Text } from 'npm:@react-email/components@0.0.22'
import { BrandLayout, styles } from './_brand.tsx'

interface EmailChangeEmailProps {
  siteName: string
  // oldEmail is the user's current address (HookData.OldEmail). For the
  // NEW-recipient half of a secure email_change fanout, `email` equals the
  // recipient (NEW), so the "from" line must render oldEmail to read
  // "from OLD to NEW" instead of "from NEW to NEW".
  oldEmail: string
  email: string
  newEmail: string
  confirmationUrl: string
}

export const EmailChangeEmail = ({
  siteName,
  oldEmail,
  newEmail,
  confirmationUrl,
}: EmailChangeEmailProps) => (
  <BrandLayout preview={`Confirm your email change for ${siteName}`}>
    <Heading style={styles.h1}>Confirm your email change</Heading>
    <Text style={styles.text}>
      You requested to change the email address on your {siteName} account
      from{' '}
      <Link href={`mailto:${oldEmail}`} style={styles.link}>
        {oldEmail}
      </Link>{' '}
      to{' '}
      <Link href={`mailto:${newEmail}`} style={styles.link}>
        {newEmail}
      </Link>
      .
    </Text>
    <Section style={styles.buttonWrap}>
      <Button style={styles.button} href={confirmationUrl}>
        Confirm email change
      </Button>
    </Section>
    <Text style={styles.text}>
      If you didn't request this change, please secure your account
      immediately by resetting your password.
    </Text>
  </BrandLayout>
)

export default EmailChangeEmail
