import type { CollectionConfig } from 'payload'
import { receiptEmailHtml } from '../email/receiptEmail'

const INFO_EMAIL = 'info@jejucentralmasjid.kr'

export const ReceiptRequests: CollectionConfig = {
  slug: 'receipt-requests',
  labels: { singular: 'Receipt request', plural: 'Receipt requests' },
  defaultSort: '-createdAt',
  access: {
    // Donors submit from the website; only admins can read and manage.
    create: () => true,
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
          })
          data.receiptNumber = `JCM-${year}-${String(totalDocs + 1).padStart(4, '0')}`
          data.issuedAt = new Date().toISOString()
        }
        return data
      },
    ],
    afterChange: [
      async ({ doc, previousDoc, operation, req }) => {
        try {
          if (operation === 'create') {
            // Notify the committee inbox of the new request.
            await req.payload.sendEmail({
              to: INFO_EMAIL,
              subject: `Receipt request — ${doc.name} · ₩${Number(doc.amount).toLocaleString()}`,
              html: `<p>New donation receipt request on the website:</p>
                <p><strong>${doc.name}</strong> (${doc.email})<br/>
                Amount: ₩${Number(doc.amount).toLocaleString()}<br/>
                Transfer date: ${doc.transferDate?.slice(0, 10)}<br/>
                Designation: ${doc.designation || '—'}</p>
                <p>Verify the transfer in the bank app, then open the admin panel and set Status to "Issued":<br/>
                <a href="https://jejucentralmasjid.kr/admin/collections/receipt-requests/${doc.id}">Open request</a></p>`,
            })
          }
          if (operation === 'update' && doc.status === 'issued' && previousDoc?.status !== 'issued') {
            // Send the receipt to the donor.
            await req.payload.sendEmail({
              to: doc.email,
              subject: `Donation receipt ${doc.receiptNumber} — Jeju Central Masjid`,
              html: receiptEmailHtml({
                receiptNumber: doc.receiptNumber,
                name: doc.name,
                amount: doc.amount,
                transferDate: doc.transferDate?.slice(0, 10) || '',
                designation: doc.designation,
              }),
            })
            req.payload.logger.info(`Receipt ${doc.receiptNumber} emailed to ${doc.email}`)
          }
        } catch (err) {
          req.payload.logger.error(`Receipt email failed: ${String(err)}`)
        }
        return doc
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
  ],
}
