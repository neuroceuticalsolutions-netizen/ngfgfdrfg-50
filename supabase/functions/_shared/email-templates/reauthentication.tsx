/// <reference types="npm:@types/react@18.3.1" />
import * as React from 'npm:react@18.3.1'
import { Heading, Section, Text } from 'npm:@react-email/components@0.0.22'
import { BrandLayout, styles } from './_brand.tsx'

interface ReauthenticationEmailProps {
  token: string
}

export const ReauthenticationEmail = ({ token }: ReauthenticationEmailProps) => (
  <BrandLayout preview="Your Neuroceutical verification code">
    <Heading style={styles.h1}>Confirm it's you</Heading>
    <Text style={styles.text}>
      Enter the verification code below to confirm your identity and continue.
    </Text>
    <Section style={styles.codeCard}>
      <Text style={styles.codeText}>{token}</Text>
    </Section>
    <Text style={styles.text}>
      This code expires shortly. If you didn't request it, you can safely
      ignore this email.
    </Text>
  </BrandLayout>
)

export default ReauthenticationEmail
