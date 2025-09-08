import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import ApiError from '../utils/ApiError.js';

dotenv.config();

// Configure email transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// Send verification email with OTP
export const sendEmail = async (email, subject, emailTemplate) => {
  const mailOptions = {
    from: `"MAZRACARE Support" <${process.env.COMPANY_EMAIL}>`,
    to: email,
    subject: subject,
    html: emailTemplate,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Email sending error:', error.message); // Log for debug
    // Throw proper error for global error handler
    throw new ApiError(500, 'Failed to send verification email. Please try again.');
  }
};


// Send password reset email with OTP
export const sendPasswordResetEmail = async (email, otp) => {
  const mailOptions = {
    from: `"Mazracare Support" <${process.env.EMAIL_USERNAME}>`,
    to: email,
    subject: 'Password Reset OTP',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Password Reset Request</h2>
        <p>We received a request to reset your Mazracare account password. Please use the following OTP to proceed:</p>
        <div style="background: #f4f4f4; padding: 10px; margin: 20px 0; text-align: center; font-size: 24px; letter-spacing: 2px;">
          ${otp}
        </div>
        <p>This OTP will expire in 10 minutes.</p>
        <p>If you didn't request this password reset, please ignore this email or contact support if you have concerns.</p>
        <p style="margin-top: 30px; color: #666; font-size: 14px;">
          For your security, never share this OTP with anyone. Mazracare will never ask you for your password or OTP.
        </p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};