export const emailVerificationTemplate = (name, otp) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Email Verification</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f4;">
  <table align="center" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); font-family: Arial, sans-serif;">
    <tr>
      <td style="padding: 30px; text-align: center; background-color: #1d8348; border-top-left-radius: 8px; border-top-right-radius: 8px;">
        <h1 style="color: #ffffff; margin: 0;">Mazracare</h1>
        <p style="color: #dff0d8; margin: 5px 0 0;">Your Trusted E-commerce Partner</p>
      </td>
    </tr>
    <tr>
      <td style="padding: 30px;">
        <h2 style="color: #333333;">Hello ${name},</h2>
        <p style="font-size: 16px; color: #555555;">Thank you for signing up with <strong>Mazracare</strong>. To complete your registration, please verify your email using the OTP below:</p>
        <div style="margin: 30px 0; text-align: center;">
          <span style="display: inline-block; background-color: #1d8348; color: #ffffff; padding: 14px 32px; font-size: 24px; border-radius: 6px; letter-spacing: 5px; font-weight: bold;">${otp}</span>
        </div>
        <p style="font-size: 14px; color: #888888;">This OTP is valid for only 10 minutes. Please do not share it with anyone.</p>
        <p style="font-size: 14px; color: #888888;">If you did not request this, you can safely ignore this email.</p>
        <p style="font-size: 16px; color: #555555; margin-top: 40px;">Warm regards,<br><strong>The Mazracare Team</strong></p>
      </td>
    </tr>
    <tr>
      <td style="padding: 20px; text-align: center; background-color: #f1f1f1; font-size: 12px; color: #888888; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">
        © ${new Date().getFullYear()} Mazracare. All rights reserved.
      </td>
    </tr>
  </table>
</body>
</html>
`;



export const resendOtpTemplate = (name, otp) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>OTP Resend - Mazracare</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f9f9f9;">
  <table align="center" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); font-family: Arial, sans-serif;">
    <tr>
      <td style="padding: 30px; text-align: center; background-color: #1d8348; border-top-left-radius: 8px; border-top-right-radius: 8px;">
        <h1 style="color: #ffffff; margin: 0;">Mazracare</h1>
        <p style="color: #dff0d8; margin: 5px 0 0;">Secure Login OTP</p>
      </td>
    </tr>
    <tr>
      <td style="padding: 30px;">
        <h2 style="color: #333333;">Hello ${name},</h2>
        <p style="font-size: 16px; color: #555555;">You have requested to resend your OTP. Please use the OTP below to proceed with verifying your email address.</p>
        <div style="margin: 30px 0; text-align: center;">
          <span style="display: inline-block; background-color: #1d8348; color: #ffffff; padding: 14px 32px; font-size: 24px; border-radius: 6px; letter-spacing: 5px; font-weight: bold;">${otp}</span>
        </div>
        <p style="font-size: 14px; color: #888888;">This OTP will expire in 10 minutes. Do not share it with anyone for your own security.</p>
        <p style="font-size: 14px; color: #888888;">If you did not request this, please ignore this email or contact support.</p>
        <p style="font-size: 16px; color: #555555; margin-top: 40px;">Thank you,<br><strong>The Mazracare Team</strong></p>
      </td>
    </tr>
    <tr>
      <td style="padding: 20px; text-align: center; background-color: #f1f1f1; font-size: 12px; color: #888888; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">
        © ${new Date().getFullYear()} Mazracare. All rights reserved.
      </td>
    </tr>
  </table>
</body>
</html>
`;

export const resetPasswordOtpTemplate = (name, otp) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Password Reset OTP - Mazracare</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f9f9f9;">
  <table align="center" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); font-family: Arial, sans-serif;">
    <tr>
      <td style="padding: 30px; text-align: center; background-color: #1d8348; border-top-left-radius: 8px; border-top-right-radius: 8px;">
        <h1 style="color: #ffffff; margin: 0;">Mazracare</h1>
        <p style="color: #dff0d8; margin: 5px 0 0;">Password Reset Request</p>
      </td>
    </tr>
    <tr>
      <td style="padding: 30px;">
        <h2 style="color: #333333;">Hi ${name},</h2>
        <p style="font-size: 16px; color: #555555;">We received a request to reset your password. Please use the OTP below to proceed:</p>
        <div style="margin: 30px 0; text-align: center;">
          <span style="display: inline-block; background-color: #1d8348; color: #ffffff; padding: 14px 32px; font-size: 24px; border-radius: 6px; letter-spacing: 5px; font-weight: bold;">${otp}</span>
        </div>
        <p style="font-size: 14px; color: #888888;">This OTP is valid for 10 minutes. If you didn’t request a password reset, you can safely ignore this email.</p>
        <p style="font-size: 16px; color: #555555; margin-top: 40px;">Stay safe,<br><strong>The Mazracare Team</strong></p>
      </td>
    </tr>
    <tr>
      <td style="padding: 20px; text-align: center; background-color: #f1f1f1; font-size: 12px; color: #888888; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">
        © ${new Date().getFullYear()} Mazracare. All rights reserved.
      </td>
    </tr>
  </table>
</body>
</html>
`;



export const customizationNotificationTemplate = (customizationData, userData) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>New Customization Request - Mazracare</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f9f9f9;">
  <table align="center" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); font-family: Arial, sans-serif;">
    <tr>
      <td style="padding: 30px; text-align: center; background-color: #1d8348; border-top-left-radius: 8px; border-top-right-radius: 8px;">
        <h1 style="color: #ffffff; margin: 0;">Mazracare</h1>
        <p style="color: #dff0d8; margin: 5px 0 0;">New Customization Request</p>
      </td>
    </tr>
    <tr>
      <td style="padding: 30px;">
        <h2 style="color: #333333;">New Customization Request Received</h2>
        <p style="font-size: 16px; color: #555555;">A new customization request has been submitted. Here are the details:</p>
        
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold; color: #333;">User:</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee; color: #555;">${userData.username} (${userData.email})</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold; color: #333;">Crops:</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee; color: #555;">${Array.isArray(customizationData.crops) ? customizationData.crops.join(', ') : customizationData.crops}</td>
          </tr>
          ${customizationData.customCrop ? `
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold; color: #333;">Custom Crop:</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee; color: #555;">${customizationData.customCrop}</td>
          </tr>
          ` : ''}
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold; color: #333;">Dimensions:</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee; color: #555;">${customizationData.width} x ${customizationData.height}</td>
          </tr>
        </table>
        
        <p style="font-size: 14px; color: #888888; margin-top: 30px;">Request submitted on: ${new Date().toLocaleString()}</p>
      </td>
    </tr>
    <tr>
      <td style="padding: 20px; text-align: center; background-color: #f1f1f1; font-size: 12px; color: #888888; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">
        © ${new Date().getFullYear()} Mazracare. All rights reserved.
      </td>
    </tr>
  </table>
</body>
</html>
`;

export const enquiryNotificationTemplate = (enquiryData, userData) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>New Enquiry Received - Mazracare</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f9f9f9;">
  <table align="center" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); font-family: Arial, sans-serif;">
    <tr>
      <td style="padding: 30px; text-align: center; background-color: #1d8348; border-top-left-radius: 8px; border-top-right-radius: 8px;">
        <h1 style="color: #ffffff; margin: 0;">Mazracare</h1>
        <p style="color: #dff0d8; margin: 5px 0 0;">New Enquiry Received</p>
      </td>
    </tr>
    <tr>
      <td style="padding: 30px;">
        <h2 style="color: #333333;">New Enquiry Details</h2>
        <p style="font-size: 16px; color: #555555;">A new enquiry has been submitted. Here are the details:</p>
        
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          ${enquiryData.fullName ? `<tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold; color: #333;">Full Name:</td><td style="padding: 8px; border-bottom: 1px solid #eee; color: #555;">${enquiryData.fullName}</td></tr>` : ''}
          ${enquiryData.company ? `<tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold; color: #333;">Company:</td><td style="padding: 8px; border-bottom: 1px solid #eee; color: #555;">${enquiryData.company}</td></tr>` : ''}
          ${enquiryData.email ? `<tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold; color: #333;">Email:</td><td style="padding: 8px; border-bottom: 1px solid #eee; color: #555;">${enquiryData.email}</td></tr>` : ''}
          ${enquiryData.phone ? `<tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold; color: #333;">Phone:</td><td style="padding: 8px; border-bottom: 1px solid #eee; color: #555;">${enquiryData.phone}</td></tr>` : ''}
          ${enquiryData.location ? `<tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold; color: #333;">Location:</td><td style="padding: 8px; border-bottom: 1px solid #eee; color: #555;">${enquiryData.location}</td></tr>` : ''}
          ${enquiryData.siteTypes && enquiryData.siteTypes.length > 0 ? `<tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold; color: #333;">Site Types:</td><td style="padding: 8px; border-bottom: 1px solid #eee; color: #555;">${Array.isArray(enquiryData.siteTypes) ? enquiryData.siteTypes.join(', ') : enquiryData.siteTypes}</td></tr>` : ''}
          ${enquiryData.siteTypeOther ? `<tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold; color: #333;">Other Site Type:</td><td style="padding: 8px; border-bottom: 1px solid #eee; color: #555;">${enquiryData.siteTypeOther}</td></tr>` : ''}
          ${enquiryData.spaceType ? `<tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold; color: #333;">Space Type:</td><td style="padding: 8px; border-bottom: 1px solid #eee; color: #555;">${enquiryData.spaceType}</td></tr>` : ''}
          ${enquiryData.siteArea ? `<tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold; color: #333;">Site Area:</td><td style="padding: 8px; border-bottom: 1px solid #eee; color: #555;">${enquiryData.siteArea}</td></tr>` : ''}
          ${enquiryData.siteAreaCustom ? `<tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold; color: #333;">Custom Site Area:</td><td style="padding: 8px; border-bottom: 1px solid #eee; color: #555;">${enquiryData.siteAreaCustom}</td></tr>` : ''}
          ${enquiryData.purpose && enquiryData.purpose.length > 0 ? `<tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold; color: #333;">Purpose:</td><td style="padding: 8px; border-bottom: 1px solid #eee; color: #555;">${Array.isArray(enquiryData.purpose) ? enquiryData.purpose.join(', ') : enquiryData.purpose}</td></tr>` : ''}
          ${enquiryData.purposeOther ? `<tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold; color: #333;">Other Purpose:</td><td style="padding: 8px; border-bottom: 1px solid #eee; color: #555;">${enquiryData.purposeOther}</td></tr>` : ''}
          ${enquiryData.technology ? `<tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold; color: #333;">Technology:</td><td style="padding: 8px; border-bottom: 1px solid #eee; color: #555;">${enquiryData.technology}</td></tr>` : ''}
          ${enquiryData.waterAvailable ? `<tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold; color: #333;">Water Available:</td><td style="padding: 8px; border-bottom: 1px solid #eee; color: #555;">${enquiryData.waterAvailable}</td></tr>` : ''}
          ${enquiryData.waterType ? `<tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold; color: #333;">Water Type:</td><td style="padding: 8px; border-bottom: 1px solid #eee; color: #555;">${enquiryData.waterType}</td></tr>` : ''}
          ${enquiryData.electricityAvailable ? `<tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold; color: #333;">Electricity Available:</td><td style="padding: 8px; border-bottom: 1px solid #eee; color: #555;">${enquiryData.electricityAvailable}</td></tr>` : ''}
          ${enquiryData.powerBackup ? `<tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold; color: #333;">Power Backup:</td><td style="padding: 8px; border-bottom: 1px solid #eee; color: #555;">${enquiryData.powerBackup}</td></tr>` : ''}
          ${enquiryData.greenhouseRequired ? `<tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold; color: #333;">Greenhouse Required:</td><td style="padding: 8px; border-bottom: 1px solid #eee; color: #555;">${enquiryData.greenhouseRequired}</td></tr>` : ''}
          ${enquiryData.budget ? `<tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold; color: #333;">Budget:</td><td style="padding: 8px; border-bottom: 1px solid #eee; color: #555;">${enquiryData.budget}</td></tr>` : ''}
          ${enquiryData.timeline ? `<tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold; color: #333;">Timeline:</td><td style="padding: 8px; border-bottom: 1px solid #eee; color: #555;">${enquiryData.timeline}</td></tr>` : ''}
          ${enquiryData.additionalServices && enquiryData.additionalServices.length > 0 ? `<tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold; color: #333;">Additional Services:</td><td style="padding: 8px; border-bottom: 1px solid #eee; color: #555;">${Array.isArray(enquiryData.additionalServices) ? enquiryData.additionalServices.join(', ') : enquiryData.additionalServices}</td></tr>` : ''}
          ${enquiryData.serviceOther ? `<tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold; color: #333;">Other Services:</td><td style="padding: 8px; border-bottom: 1px solid #eee; color: #555;">${enquiryData.serviceOther}</td></tr>` : ''}
          ${enquiryData.crops && enquiryData.crops.length > 0 ? `<tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold; color: #333;">Crops:</td><td style="padding: 8px; border-bottom: 1px solid #eee; color: #555;">${Array.isArray(enquiryData.crops) ? enquiryData.crops.join(', ') : enquiryData.crops}</td></tr>` : ''}
          ${enquiryData.customCrop ? `<tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold; color: #333;">Custom Crop:</td><td style="padding: 8px; border-bottom: 1px solid #eee; color: #555;">${enquiryData.customCrop}</td></tr>` : ''}
          ${enquiryData.message ? `<tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold; color: #333;">Message:</td><td style="padding: 8px; border-bottom: 1px solid #eee; color: #555;">${enquiryData.message}</td></tr>` : ''}
        </table>
        
        ${enquiryData.images && enquiryData.images.length > 0 ? `
        <div style="margin: 20px 0;">
          <h3 style="color: #333; margin-bottom: 10px;">Attached Images:</h3>
          <div style="display: flex; flex-wrap: wrap; gap: 10px;">
            ${enquiryData.images.map((image, index) => `
              <div style="text-align: center;">
                <img src="${image.url}" alt="Enquiry Image ${index + 1}" style="max-width: 200px; max-height: 150px; border-radius: 5px; border: 1px solid #ddd;">
                <p style="font-size: 12px; color: #888; margin: 5px 0;">Image ${index + 1}</p>
              </div>
            `).join('')}
          </div>
        </div>
        ` : ''}
        
        <p style="font-size: 14px; color: #888888; margin-top: 30px;">Enquiry submitted on: ${new Date().toLocaleString()}</p>
      </td>
    </tr>
    <tr>
      <td style="padding: 20px; text-align: center; background-color: #f1f1f1; font-size: 12px; color: #888888; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">
        © ${new Date().getFullYear()} Mazracare. All rights reserved.
      </td>
    </tr>
  </table>
</body>
</html>
`;

export const getInTouchNotificationTemplate = (getInTouchData) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>New Get In Touch Request - Mazracare</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f9f9f9;">
  <table align="center" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); font-family: Arial, sans-serif;">
    <tr>
      <td style="padding: 30px; text-align: center; background-color: #1d8348; border-top-left-radius: 8px; border-top-right-radius: 8px;">
        <h1 style="color: #ffffff; margin: 0;">Mazracare</h1>
        <p style="color: #dff0d8; margin: 5px 0 0;">New Get In Touch Request</p>
      </td>
    </tr>
    <tr>
      <td style="padding: 30px;">
        <h2 style="color: #333333;">New Get In Touch Request</h2>
        <p style="font-size: 16px; color: #555555;">Someone has submitted a get in touch request. Here are the details:</p>
        
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          ${getInTouchData.name ? `<tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold; color: #333;">Name:</td><td style="padding: 8px; border-bottom: 1px solid #eee; color: #555;">${getInTouchData.name}</td></tr>` : ''}
          ${getInTouchData.email ? `<tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold; color: #333;">Email:</td><td style="padding: 8px; border-bottom: 1px solid #eee; color: #555;">${getInTouchData.email}</td></tr>` : ''}
          ${getInTouchData.phone ? `<tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold; color: #333;">Phone:</td><td style="padding: 8px; border-bottom: 1px solid #eee; color: #555;">${getInTouchData.phone}</td></tr>` : ''}
          ${getInTouchData.subject ? `<tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold; color: #333;">Subject:</td><td style="padding: 8px; border-bottom: 1px solid #eee; color: #555;">${getInTouchData.subject}</td></tr>` : ''}
          ${getInTouchData.message ? `<tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold; color: #333;">Message:</td><td style="padding: 8px; border-bottom: 1px solid #eee; color: #555;">${getInTouchData.message}</td></tr>` : ''}
        </table>
        
        <p style="font-size: 14px; color: #888888; margin-top: 30px;">Request submitted on: ${new Date().toLocaleString()}</p>
      </td>
    </tr>
    <tr>
      <td style="padding: 20px; text-align: center; background-color: #f1f1f1; font-size: 12px; color: #888888; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">
        © ${new Date().getFullYear()} Mazracare. All rights reserved.
      </td>
    </tr>
  </table>
</body>
</html>
`;

export const productDetailsCustomisationNotificationTemplate = (customisationData, userData) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>New Product Details Customisation - Mazracare</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f9f9f9;">
  <table align="center" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); font-family: Arial, sans-serif;">
    <tr>
      <td style="padding: 30px; text-align: center; background-color: #1d8348; border-top-left-radius: 8px; border-top-right-radius: 8px;">
        <h1 style="color: #ffffff; margin: 0;">Mazracare</h1>
        <p style="color: #dff0d8; margin: 5px 0 0;">New Product Details Customisation</p>
      </td>
    </tr>
    <tr>
      <td style="padding: 30px;">
        <h2 style="color: #333333;">New Product Details Customisation Request</h2>
        <p style="font-size: 16px; color: #555555;">A new product details customisation request has been submitted. Here are the details:</p>
        
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold; color: #333;">User:</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee; color: #555;">${userData.username} (${userData.email})</td>
          </tr>
          ${customisationData.productName ? `<tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold; color: #333;">Product Name:</td><td style="padding: 8px; border-bottom: 1px solid #eee; color: #555;">${customisationData.productName}</td></tr>` : ''}
          ${customisationData.quantity ? `<tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold; color: #333;">Quantity:</td><td style="padding: 8px; border-bottom: 1px solid #eee; color: #555;">${customisationData.quantity}</td></tr>` : ''}
          ${customisationData.specifications ? `<tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold; color: #333;">Specifications:</td><td style="padding: 8px; border-bottom: 1px solid #eee; color: #555;">${customisationData.specifications}</td></tr>` : ''}
          ${customisationData.customRequirements ? `<tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold; color: #333;">Custom Requirements:</td><td style="padding: 8px; border-bottom: 1px solid #eee; color: #555;">${customisationData.customRequirements}</td></tr>` : ''}
          ${customisationData.budget ? `<tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold; color: #333;">Budget:</td><td style="padding: 8px; border-bottom: 1px solid #eee; color: #555;">${customisationData.budget}</td></tr>` : ''}
          ${customisationData.timeline ? `<tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold; color: #333;">Timeline:</td><td style="padding: 8px; border-bottom: 1px solid #eee; color: #555;">${customisationData.timeline}</td></tr>` : ''}
          ${customisationData.notes ? `<tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold; color: #333;">Notes:</td><td style="padding: 8px; border-bottom: 1px solid #eee; color: #555;">${customisationData.notes}</td></tr>` : ''}
        </table>

        
        <p style="font-size: 14px; color: #888888; margin-top: 30px;">Request submitted on: ${new Date().toLocaleString()}</p>
      </td>
    </tr>
    <tr>
      <td style="padding: 20px; text-align: center; background-color: #f1f1f1; font-size: 12px; color: #888888; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">
        © ${new Date().getFullYear()} Mazracare. All rights reserved.
      </td>
    </tr>
  </table>
</body>
</html>
`;

export const carrierNotificationTemplate = (carrierData, backend_url) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>New Carrier Application - Mazracare</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f9f9f9;">
  <table align="center" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); font-family: Arial, sans-serif;">
    <tr>
      <td style="padding: 30px; text-align: center; background-color: #1d8348; border-top-left-radius: 8px; border-top-right-radius: 8px;">
        <h1 style="color: #ffffff; margin: 0;">Mazracare</h1>
        <p style="color: #dff0d8; margin: 5px 0 0;">New Carrier Application</p>
      </td>
    </tr>
    <tr>
      <td style="padding: 30px;">
        <h2 style="color: #333333;">New Carrier Application Received</h2>
        <p style="font-size: 16px; color: #555555;">A new carrier application has been submitted. Here are the details:</p>
        
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold; color: #333;">Full Name:</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee; color: #555;">${carrierData.fullName}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold; color: #333;">Email:</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee; color: #555;">${carrierData.email}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold; color: #333;">Phone:</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee; color: #555;">${carrierData.phone}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold; color: #333;">Position:</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee; color: #555;">${carrierData.position}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold; color: #333;">Experience:</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee; color: #555;">${carrierData.experience} years</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold; color: #333;">Skills:</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee; color: #555;">${carrierData.skills}</td>
          </tr>
          ${carrierData.url ? `
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold; color: #333;">Resume:</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee; color: #555;"><a href="${backend_url}/uploads/pdfs/${carrierData.public_id}" download style="color: #1d8348; text-decoration: none;">Download Resume</a></td>
          </tr>
          ` : ''}
        </table>
        
        ${carrierData.message ? `
        <div style="margin: 20px 0;">
          <h3 style="color: #333; margin-bottom: 10px;">Message:</h3>
          <p style="background: #f8f9fa; padding: 15px; border-radius: 5px; color: #555; font-style: italic;">${carrierData.message}</p>
        </div>
        ` : ''}
        
        <p style="font-size: 14px; color: #888888; margin-top: 30px;">Application submitted on: ${new Date().toLocaleString()}</p>
      </td>
    </tr>
    <tr>
      <td style="padding: 20px; text-align: center; background-color: #f1f1f1; font-size: 12px; color: #888888; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">
        © ${new Date().getFullYear()} Mazracare. All rights reserved.
      </td>
    </tr>
  </table>
</body>
</html>
`;