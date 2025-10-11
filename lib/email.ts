import nodemailer from 'nodemailer'
import { ContactFormData } from './validations'

const transporter = nodemailer.createTransporter({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export async function sendOwnerNotification(data: ContactFormData): Promise<void> {
  const mailOptions = {
    from: process.env.SMTP_FROM || 'noreply@tracehold.com',
    to: 'marcor@tracehold.es',
    subject: `New Lead from ${data.name} - Tracehold Contact Form`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #0ea5e9;">New Lead from Tracehold Contact Form</h2>
        
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #1e293b;">Contact Information</h3>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          ${data.company ? `<p><strong>Company:</strong> ${data.company}</p>` : ''}
        </div>
        
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #1e293b;">Message</h3>
          <p style="white-space: pre-wrap;">${data.message}</p>
        </div>
        
        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 0; color: #0369a1;">
            <strong>GDPR Consent:</strong> ${data.gdprConsent ? 'Yes' : 'No'}
          </p>
          <p style="margin: 5px 0 0 0; color: #0369a1; font-size: 14px;">
            Submitted on: ${new Date().toLocaleString()}
          </p>
        </div>
      </div>
    `,
  }

  try {
    await transporter.sendMail(mailOptions)
    console.log('Owner notification email sent successfully')
  } catch (error) {
    console.error('Error sending owner notification email:', error)
    throw new Error('Failed to send notification email')
  }
}

export async function sendConfirmationEmail(data: ContactFormData): Promise<void> {
  const mailOptions = {
    from: process.env.SMTP_FROM || 'noreply@tracehold.com',
    to: data.email,
    subject: 'Thank you for contacting Tracehold',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="text-align: center; margin-bottom: 30px;">
          <div style="display: inline-block; width: 40px; height: 40px; background: linear-gradient(135deg, #0ea5e9, #06b6d4); border-radius: 12px; text-align: center; line-height: 40px; font-weight: bold; color: white; font-size: 18px;">T</div>
          <h1 style="color: #1e293b; margin: 10px 0;">Tracehold</h1>
        </div>
        
        <h2 style="color: #1e293b;">Thank you for your interest!</h2>
        
        <p style="color: #64748b; line-height: 1.6;">
          Hi ${data.name},
        </p>
        
        <p style="color: #64748b; line-height: 1.6;">
          Thank you for reaching out to Tracehold. We've received your message and will get back to you within 24 hours.
        </p>
        
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #1e293b;">What's next?</h3>
          <ul style="color: #64748b; line-height: 1.6;">
            <li>Our team will review your requirements</li>
            <li>We'll schedule a 20-minute demo of our MVP</li>
            <li>If you're interested, we'll invite you to our pilot program</li>
          </ul>
        </div>
        
        <p style="color: #64748b; line-height: 1.6;">
          In the meantime, feel free to explore our platform and learn more about how we're revolutionizing the Bill of Lading process.
        </p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="https://tracehold.com" style="display: inline-block; background: #0ea5e9; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 600;">Visit Tracehold</a>
        </div>
        
        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 30px 0;">
        
        <p style="color: #94a3b8; font-size: 14px; text-align: center;">
          This email was sent to ${data.email} because you contacted us through our website.<br>
          If you didn't request this, please ignore this email.
        </p>
        
        <p style="color: #94a3b8; font-size: 12px; text-align: center; margin-top: 20px;">
          © ${new Date().getFullYear()} Tracehold B.V. All rights reserved.
        </p>
      </div>
    `,
  }

  try {
    await transporter.sendMail(mailOptions)
    console.log('Confirmation email sent successfully')
  } catch (error) {
    console.error('Error sending confirmation email:', error)
    throw new Error('Failed to send confirmation email')
  }
}
