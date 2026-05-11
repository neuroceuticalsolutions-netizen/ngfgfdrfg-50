/// <reference types="npm:@types/react@18.3.1" />
import * as React from 'npm:react@18.3.1'
import { Button, Heading, Link, Section, Text } from 'npm:@react-email/components@0.0.22'
import { BrandLayout, styles } from './_brand.tsx'

interface SignupEmailProps {
  siteName: string
  siteUrl: string
  recipient: string
  confirmationUrl: string
}

export const SignupEmail = ({
  siteName,
  siteUrl,
  recipient,
  confirmationUrl,
}: SignupEmailProps) => (
  <BrandLayout preview={`Confirm your email for ${siteName}`}>
    <Heading style={styles.h1}>Confirm your email</Heading>
    <Text style={styles.text}>
      Welcome to{' '}
      <Link href={siteUrl} style={styles.link}>
        <strong>{siteName}</strong>
      </Link>
      . Please confirm{' '}
      <Link href={`mailto:${recipient}`} style={styles.link}>
        {recipient}
      </Link>{' '}
      to activate your account and start your cognitive performance journey.
    </Text>
    <Section style={styles.buttonWrap}>
      <Button style={styles.button} href={confirmationUrl}>
        Verify my email
      </Button>
    </Section>
    <Text style={styles.text}>
      If you didn't create an account, you can safely ignore this email.
    </Text>
  </BrandLayout>
)

export default SignupEmail
