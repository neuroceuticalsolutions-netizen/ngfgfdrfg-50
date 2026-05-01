/// <reference types="npm:@types/react@18.3.1" />
import * as React from 'npm:react@18.3.1'

export interface TemplateEntry {
  component: React.ComponentType<any>
  subject: string | ((data: Record<string, any>) => string)
  to?: string
  displayName?: string
  previewData?: Record<string, any>
}

import { template as partnerApplicationSubmitted } from './partner-application-submitted.tsx'
import { template as partnerApplicationReviewing } from './partner-application-reviewing.tsx'
import { template as partnerApplicationApproved } from './partner-application-approved.tsx'
import { template as partnerApplicationDeclined } from './partner-application-declined.tsx'

export const TEMPLATES: Record<string, TemplateEntry> = {
  'partner-application-submitted': partnerApplicationSubmitted,
  'partner-application-reviewing': partnerApplicationReviewing,
  'partner-application-approved': partnerApplicationApproved,
  'partner-application-declined': partnerApplicationDeclined,
}