/**
 * Records whether each automatic email actually went out, on the request it
 * belongs to, so an admin can see what still needs sending by hand.
 *
 * Each tracked collection gets a sidebar "Emails" group (emailsField) and its
 * afterChange hook sends through sendTracked, then saves the results with
 * saveEmailResults.
 */
import type { CollectionSlug, Field, PayloadRequest, SendEmailOptions } from 'payload'

export type EmailStatus = 'sent' | 'failed' | 'off' | 'manual'

/** Only admins pick "manual"; the rest are written by the hooks. */
export const EMAIL_STATUS_OPTIONS: { label: string; value: EmailStatus }[] = [
  { label: 'Sent', value: 'sent' },
  { label: 'Not sent — it failed', value: 'failed' },
  { label: 'Not sent — email is switched off', value: 'off' },
  { label: 'Sent manually', value: 'manual' },
]

/** Statuses that mean "someone still has to send this". */
export const UNSENT: EmailStatus[] = ['failed', 'off']

/** Set on the request context while saving results, so hooks don't send again. */
const SAVING_RESULTS = 'jcmSavingEmailResults'

export const isSavingEmailResults = (context: Record<string, unknown> | undefined): boolean =>
  Boolean(context?.[SAVING_RESULTS])

type Result = { status: EmailStatus; error?: string }

/**
 * Send one email and report what happened instead of throwing. When no email
 * service is configured Payload only logs the message ("console" adapter), so
 * that counts as not sent.
 */
export async function sendTracked(req: PayloadRequest, message: SendEmailOptions, what: string): Promise<Result> {
  const switchedOff = req.payload.email?.name === 'console'
  try {
    await req.payload.sendEmail(message)
    return switchedOff ? { status: 'off' } : { status: 'sent' }
  } catch (err) {
    req.payload.logger.error(`${what} email failed: ${String(err)}`)
    return { status: 'failed', error: `${what}: ${String(err)}`.slice(0, 500) }
  }
}

type EmailsGroup = Record<string, unknown> | null | undefined

/**
 * Store the results on the document and return the doc with them merged in,
 * so the admin sees the statuses as soon as the save finishes.
 */
export async function saveEmailResults<T extends { id: number | string; emails?: EmailsGroup }>({
  collection,
  doc,
  req,
  results,
}: {
  collection: CollectionSlug
  doc: T
  req: PayloadRequest
  results: Record<string, Result | undefined>
}): Promise<T> {
  const entries = Object.entries(results).filter((e): e is [string, Result] => Boolean(e[1]))
  if (entries.length === 0) return doc
  const errors = entries.map(([, r]) => r.error).filter(Boolean)
  const emails = {
    ...(doc.emails ?? {}),
    ...Object.fromEntries(entries.map(([key, r]) => [key, r.status])),
    ...(errors.length ? { lastError: errors.join('\n') } : {}),
  }
  try {
    await req.payload.update({
      collection,
      id: doc.id,
      data: { emails } as never,
      depth: 0,
      overrideAccess: true,
      req,
      context: { [SAVING_RESULTS]: true },
    })
  } catch (err) {
    req.payload.logger.error(`Could not record email results on ${collection} ${doc.id}: ${String(err)}`)
  }
  return { ...doc, emails }
}

/**
 * The sidebar "Emails" group. `emails` lists the tracked emails as
 * [field name, label]; the notice at the top explains anything unsent.
 */
export function emailsField(emails: [name: string, label: string][]): Field {
  return {
    name: 'emails',
    label: 'Emails',
    type: 'group',
    admin: { position: 'sidebar' },
    fields: [
      {
        name: 'notice',
        type: 'ui',
        admin: { components: { Field: '/cms/components/EmailStatusNotice#EmailStatusNotice' } },
      },
      ...emails.map(
        ([name, label]): Field => ({
          name,
          label,
          type: 'select',
          options: EMAIL_STATUS_OPTIONS,
          admin: {
            description: 'Filled in automatically. After sending it yourself, choose "Sent manually".',
          },
        }),
      ),
      {
        name: 'lastError',
        label: 'Last error',
        type: 'textarea',
        admin: {
          readOnly: true,
          condition: (_, siblingData) => Boolean(siblingData?.lastError),
        },
      },
    ],
  }
}
