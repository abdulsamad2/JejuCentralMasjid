import type { CollectionConfig } from 'payload'
import { receiptEmailHtml } from '../email/receiptEmail'
import { acknowledgementHtml, committeeRecipients, esc, INFO_EMAIL } from '../email/notify'
import { emailsField, isSavingEmailResults, saveEmailResults, sendTracked } from '../email/tracking'

export const ReceiptRequests: CollectionConfig = {
  slug: 'receipt-requests',
  labels: { singular: 'Receipt request', plural: 'Receipt requests' },
  defaultSort: '-createdAt',
  access: {
    // Requests come only via /api/receipt-request (spam-filtered, rate-limited);
    // the raw REST create is closed. Only admins read and manage.
    create: () => false,
    read: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  admin: {
    useAsTitle: 'name',
    group: 'Inbox',
    defaultColumns: ['name', 'amount', 'transferDate', 'status', 'receiptNumber'],
    description:
      'Donation receipt requests. Verify the transfer in the bank app, then set Status to "Issued" — the receipt is numbered and emailed automatically.',
  },
  hooks: {
    beforeChange: [
      // Assign a sequential receipt number the moment a request is issued.
      async ({ data, originalDoc, req }) => {
        if (data?.status === 'issued' && !originalDoc?.receiptNumber && !data.receiptNumber) {
          const year = new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Seoul' }).slice(0, 4)
          const { totalDocs } = await req.payload.count({
            collection: 'receipt-requests',
            where: { receiptNumber: { like: `JCM-${year}-` } },
            // Same transaction as the save being made.
            req,
          })
          data.receiptNumber = `JCM-${year}-${String(totalDocs + 1).padStart(4, '0')}`
          data.issuedAt = new Date().toISOString()
        }
        return data
      },
    ],
    afterChange: [
      async ({ doc, previousDoc, operation, req, context }) => {
        if (isSavingEmailResults(context)) return doc
        const results: Record<string, Awaited<ReturnType<typeof sendTracked>> | undefined> = {}
        if (operation === 'create') {
          // Notify the committee of the new request.
          results.committee = await sendTracked(
            req,
            {
              ...committeeRecipients(),
              replyTo: doc.email,
              subject: `Receipt request — ${doc.name} · ₩${Number(doc.amount).toLocaleString()}`,
              html: `<p>New donation receipt request on the website:</p>
                <p><strong>${esc(doc.name)}</strong> (${esc(doc.email)})<br/>
                Amount: ₩${Number(doc.amount).toLocaleString()}<br/>
                Transfer date: ${esc(doc.transferDate?.slice(0, 10))}<br/>
                Designation: ${esc(doc.designation || '—')}</p>
                <p>Verify the transfer in the bank app, then open the admin panel and set Status to "Issued":<br/>
                <a href="https://jejucentralmasjid.kr/admin/collections/receipt-requests/${doc.id}">Open request</a></p>`,
            },
            'Receipt request notification',
          )
          // Let the donor know the request arrived.
          results.acknowledgement = await sendTracked(
            req,
            {
              to: doc.email,
              replyTo: INFO_EMAIL,
              subject: 'We received your receipt request — Jeju Central Masjid',
              html: acknowledgementHtml({
                name: doc.name,
                heading: 'We received your receipt request',
                intro: 'JazakAllah khair for your donation. Your request for a receipt has reached the masjid committee.',
                details: [
                  ['Amount', `₩${Number(doc.amount).toLocaleString('en-US')}`],
                  ['Transfer date', doc.transferDate?.slice(0, 10) || ''],
                  ['Designation', doc.designation || 'Sadaqah'],
                ],
                next: "We'll check the transfer and email your receipt, usually within a day, insha'Allah.",
              }),
            },
            'Receipt request acknowledgement',
          )
        }
        if (operation === 'update' && doc.status === 'issued' && previousDoc?.status !== 'issued') {
          // Send the receipt to the donor.
          results.receipt = await sendTracked(
            req,
            {
              to: doc.email,
              subject: `Donation receipt ${doc.receiptNumber} — Jeju Central Masjid`,
              html: receiptEmailHtml({
                receiptNumber: doc.receiptNumber,
                name: doc.name,
                amount: doc.amount,
                transferDate: doc.transferDate?.slice(0, 10) || '',
                designation: doc.designation,
              }),
            },
            `Receipt ${doc.receiptNumber}`,
          )
        }
        return saveEmailResults({ collection: 'receipt-requests', doc, req, results })
      },
    ],
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'email', type: 'email', required: true },
    {
      name: 'amount',
      type: 'number',
      required: true,
      min: 1,
      admin: { description: 'Donation amount in KRW' },
    },
    {
      name: 'transferDate',
      type: 'date',
      required: true,
      admin: { date: { pickerAppearance: 'dayOnly', displayFormat: 'd MMM yyyy' } },
    },
    {
      name: 'designation',
      type: 'select',
      options: ['Sadaqah', 'Masjid', 'Zakat'],
      defaultValue: 'Sadaqah',
    },
    {
      name: 'screenshot',
      type: 'upload',
      relationTo: 'receipt-screenshots',
      admin: { description: 'Payment screenshot uploaded by the donor.' },
    },
    { name: 'note', type: 'textarea' },
    {
      name: 'sendReceipt',
      type: 'ui',
      admin: {
        position: 'sidebar',
        components: { Field: '/cms/components/SendReceiptButton#SendReceiptButton' },
      },
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Pending verification', value: 'pending' },
        { label: 'Issued', value: 'issued' },
        { label: 'Rejected', value: 'rejected' },
      ],
      defaultValue: 'pending',
      required: true,
      admin: {
        position: 'sidebar',
        description: 'Set to "Issued" AFTER verifying the transfer — this emails the receipt.',
      },
      access: {
        // Only admins may change status (public create is forced to pending).
        create: () => false,
        update: ({ req }) => Boolean(req.user),
      },
    },
    {
      name: 'receiptNumber',
      type: 'text',
      unique: true,
      admin: { position: 'sidebar', readOnly: true },
      access: { create: () => false, update: () => false },
    },
    {
      name: 'issuedAt',
      type: 'date',
      admin: { position: 'sidebar', readOnly: true },
      access: { create: () => false, update: () => false },
    },
    emailsField([
      ['acknowledgement', '"We received your request" to the donor'],
      ['receipt', 'Receipt to the donor'],
      ['committee', 'Notification to the committee'],
    ]),
  ],
}
