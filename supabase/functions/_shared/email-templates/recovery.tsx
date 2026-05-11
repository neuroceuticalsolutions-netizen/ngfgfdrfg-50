/// <reference types="npm:@types/react@18.3.1" />
import * as React from 'npm:react@18.3.1'
import { Button, Heading, Section, Text } from 'npm:@react-email/components@0.0.22'
import { BrandLayout, styles } from './_brand.tsx'

interface RecoveryEmailProps {
  siteName: string
  confirmationUrl: string
}

export const RecoveryEmail = ({ siteName, confirmationUrl }: RecoveryEmailProps) => (
  <BrandLayout preview={`Reset your ${siteName} password`}>
    <Heading style={styles.h1}>Reset your password</Heading>
    <Text style={styles.text}>
      We received a request to reset the password on your {siteName} account.
      Choose a new password using the button below.
    </Text>
    <Section style={styles.buttonWrap}>
      <Button style={styles.button} href={confirmationUrl}>
        Choose a new password
      </Button>
    </Section>
    <Text style={styles.text}>
      If you didn't request this, no action is needed — your password stays
      the same.
    </Text>
  </BrandLayout>
)

export default RecoveryEmail
