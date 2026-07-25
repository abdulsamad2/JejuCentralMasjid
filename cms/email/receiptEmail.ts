type ReceiptData = {
  receiptNumber: string
  name: string
  amount: number
  transferDate: string
  designation?: string | null
}

export function receiptEmailHtml(r: ReceiptData): string {
  const amount = `₩${Number(r.amount).toLocaleString('en-US')}`
  const issued = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Asia/Seoul',
  })
  const row = (label: string, value: string) => `
    <tr>
      <td style="padding:8px 0;color:#5b6b7c;font-size:14px;">${label}</td>
      <td style="padding:8px 0;color:#0E3A5F;font-size:14px;font-weight:600;text-align:right;">${value}</td>
    </tr>`

  return `<!doctype html>
<html>
<body style="margin:0;padding:24px;background:#F7F3E9;font-family:Arial,Helvetica,sans-serif;">
  <div style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e5e0d0;">
    <div style="background:#0E3A5F;padding:24px;text-align:center;">
      <p style="margin:0;color:#ffffff;font-size:20px;font-weight:bold;">Jeju Central Masjid</p>
      <p style="margin:4px 0 0;color:#C9A24B;font-size:13px;">제주 이슬람 사원 · Jeju Central Masjid</p>
    </div>
    <div style="padding:28px;">
      <p style="margin:0 0 4px;color:#0B8F4A;font-size:12px;font-weight:bold;letter-spacing:2px;text-transform:uppercase;">Donation Receipt · 기부 확인증</p>
      <p style="margin:0 0 20px;color:#0E3A5F;font-size:22px;font-weight:bold;">${r.receiptNumber}</p>
      <p style="margin:0 0 20px;color:#3a4a5c;font-size:14px;line-height:1.6;">
        Assalamu alaikum ${r.name},<br/>
        JazakAllah khair for your generous donation. We confirm the masjid has received it.
      </p>
      <table width="100%" style="border-top:1px solid #eee;border-bottom:1px solid #eee;">
        ${row('Donor', r.name)}
        ${row('Amount received', amount)}
        ${row('Transfer date', r.transferDate)}
        ${row('Designation', r.designation || 'Sadaqah')}
        ${row('Receipt issued', issued)}
        ${row('Received by', 'Jeju Central Masjid (제주중앙마스지드)')}
        ${row('Bank account', 'NH NongHyup 317-0031-1483-91')}
      </table>
      <p style="margin:20px 0 0;color:#3a4a5c;font-size:14px;line-height:1.7;">
        May Allah accept your sadaqah and multiply its reward, insha'Allah.<br/>
        <span style="font-style:italic;">"Whatever good you spend is for yourselves." — Qur'an 2:272</span>
      </p>
      <p style="margin:20px 0 0;padding:12px;background:#FBF8F0;border-radius:8px;color:#8a8574;font-size:12px;line-height:1.6;">
        This document confirms receipt of a donation by Jeju Central Masjid.
        It is not a tax-deduction certificate (기부금 세액공제용 영수증이 아닙니다).
      </p>
    </div>
    <div style="padding:16px 28px;background:#FBF8F0;border-top:1px solid #eee;text-align:center;">
      <p style="margin:0;color:#8a8574;font-size:12px;">
        Jeju Central Masjid · Sancheondandong 2-gil 15, 2F, Jeju-si ·
        <a href="mailto:info@jejucentralmasjid.kr" style="color:#0B8F4A;">info@jejucentralmasjid.kr</a>
      </p>
    </div>
  </div>
</body>
</html>`
}
