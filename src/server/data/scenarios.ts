import type { Scenario } from '../../shared/types';

const scenarioPool: Scenario[] = [
  {
    id: 'MSG-8942-A',
    sender: {
      id: 'sender',
      text: 'admin@poypal.com.security-update.net',
      isRedFlag: true,
      explanation:
        'Typosquat: "poypal" swaps two letters and the real brand name is buried as a subdomain of an unrelated domain (security-update.net). The part right before the final slash is what matters, not what appears first.',
    },
    recipient: 'user@company.org',
    date: 'Oct 24, 2023, 14:32 UTC',
    subject: {
      id: 'subject',
      text: 'ACTION REQUIRED: Your Account Has Been Limited',
      isRedFlag: false,
      explanation:
        'Urgent-sounding subject lines alone are extremely common in legitimate mail too — not a reliable signal by itself.',
    },
    bodyIntro:
      'Dear Customer, we noticed unusual activity on your account. To prevent unauthorized access, we have temporarily restricted your ability to send or receive funds.',
    bodyFlaggedLine: {
      id: 'urgent-line',
      text: 'Please verify your identity immediately to restore access within 24 hours or your account will be permanently closed.',
      isRedFlag: true,
      explanation:
        'Artificial urgency and threat of loss — a classic pressure tactic designed to short-circuit careful thinking.',
    },
    bodyLink: {
      id: 'link',
      text: 'https://verify.poypal-security.com/auth/login?token=8f92a1',
      isRedFlag: true,
      explanation: 'Domain does not match any legitimate PayPal domain.',
    },
    bodyOutro: 'Thank you, The Security Team',
  },

  {
    id: 'MSG-8943-B',
    sender: {
      id: 'sender',
      text: 'IT Help Desk <support@company-helpdesk365.com>',
      isRedFlag: true,
      explanation:
        'The display name says "IT Help Desk" but the domain is company-helpdesk365.com — not your organization\'s actual domain (company.org). Always check the domain, not the display name.',
    },
    recipient: 'user@company.org',
    date: 'Jan 8, 2026, 08:15 UTC',
    subject: {
      id: 'subject',
      text: 'Your password expires today',
      isRedFlag: false,
      explanation:
        'Password expiration notices are routine IT communications — the subject line itself is completely ordinary.',
    },
    bodyIntro:
      'Hi, our records show your network password is set to expire today. To avoid being locked out of email and VPN access, please reset it now using the link below.',
    bodyFlaggedLine: {
      id: 'reset-line',
      text: 'You must complete this reset within the next 2 hours or your account will be automatically suspended.',
      isRedFlag: true,
      explanation:
        "A hard 2-hour deadline for a routine password reset is manufactured urgency — real IT teams don't suspend accounts this fast for expired passwords.",
    },
    bodyLinkIntro: 'Reset your password using the secure link below:',
    bodyLink: {
      id: 'link',
      text: 'https://outlook-office365-login.com/reset?id=44291',
      isRedFlag: true,
      explanation:
        "This is not a Microsoft or company domain — legitimate resets would go through your organization's actual SSO portal.",
    },
    bodyOutro: 'IT Help Desk',
  },

  {
    id: 'MSG-8944-C',
    sender: {
      id: 'sender',
      text: 'David Chen, CEO <dchen@companyname.co>',
      isRedFlag: true,
      explanation:
        "The company's real domain is companyname.com — this message comes from companyname.co, a different top-level domain that's easy to miss at a glance.",
    },
    recipient: 'user@company.org',
    date: 'Mar 3, 2026, 07:52 UTC',
    subject: {
      id: 'subject',
      text: 'Confidential — need this handled today',
      isRedFlag: false,
      explanation:
        "A short, low-key subject line isn't inherently suspicious — plenty of real executive emails read this way.",
    },
    bodyIntro:
      "I'm heading into back-to-back meetings and won't be reachable by phone for the next few hours.",
    bodyFlaggedLine: {
      id: 'wire-line',
      text: "I need you to process an urgent wire transfer to a new vendor today. Please keep this confidential until it's finalized — don't loop in finance yet.",
      isRedFlag: true,
      explanation:
        'Whaling/BEC pattern: authority + secrecy + urgency, and a request to bypass the normal finance approval chain. Confidentiality requests around payments are a major red flag, not a normal business practice.',
    },
    bodyLinkIntro: 'Review and approve the wire instructions here:',
    bodyLink: {
      id: 'link',
      text: 'https://docusign-secure-verify.net/approve/9931',
      isRedFlag: true,
      explanation:
        "DocuSign's real domain is docusign.net — this lookalike domain was registered to impersonate it.",
    },
    bodyOutro: 'Thanks, David',
  },

  {
    id: 'MSG-8945-D',
    sender: {
      id: 'sender',
      text: 'Sarah Whitfield <sarahwhitfield.ceo@gmail.com>',
      isRedFlag: true,
      explanation:
        "Executives don't conduct business from personal Gmail addresses. A free-mail domain claiming to be a company officer is a strong BEC (business email compromise) indicator.",
    },
    recipient: 'user@company.org',
    date: 'Feb 14, 2026, 16:41 UTC',
    subject: {
      id: 'subject',
      text: 'Quick favor',
      isRedFlag: false,
      explanation:
        'Vague, low-pressure subject lines are actually common in gift card scams precisely because they don\'t trip obvious "urgent" filters — but the subject alone tells you nothing either way.',
    },
    bodyIntro:
      "Hey, are you at your desk? I'm stuck in a meeting and need help with something quickly.",
    bodyFlaggedLine: {
      id: 'giftcard-line',
      text: "Can you buy four $100 Amazon gift cards and send me the codes? I'll pay you back later — I can't talk right now so just handle it over email.",
      isRedFlag: true,
      explanation:
        'Gift-card-code requests are a well-known scam pattern taught in security awareness training — no legitimate reimbursement process works this way, and "can\'t talk right now" is used to prevent you from verifying by phone.',
    },
    bodyLinkIntro: 'You can reach me directly at this number if needed:',
    bodyLink: {
      id: 'link',
      text: '+1 (302) 555-0199 (text only, do not call the office)',
      isRedFlag: true,
      explanation:
        'Directing you to an off-channel personal number instead of your known internal contact method is designed to prevent you from verifying the request through official channels.',
    },
    bodyOutro: 'Thanks so much!',
  },

  {
    id: 'MSG-8946-E',
    sender: {
      id: 'sender',
      text: 'DocuSign <no-reply@docu-sign.com>',
      isRedFlag: true,
      explanation:
        'DocuSign\'s actual domain is docusign.net. "docu-sign.com" with a hyphen is a registered lookalike, not the real thing.',
    },
    recipient: 'user@company.org',
    date: 'Nov 19, 2025, 10:03 UTC',
    subject: {
      id: 'subject',
      text: 'Completed: Please DocuSign Vendor Agreement.pdf',
      isRedFlag: false,
      explanation:
        "This subject line format matches exactly how legitimate DocuSign notifications are worded — the wording itself isn't the tell here.",
    },
    bodyIntro:
      'You have a document waiting for your electronic signature from Procurement Team.',
    bodyFlaggedLine: {
      id: 'sign-line',
      text: 'This document requires your signature within 24 hours to avoid automatic cancellation of the associated service agreement.',
      isRedFlag: true,
      explanation:
        'A hard cancellation deadline tied to a routine signature request is an artificial pressure tactic layered on top of the spoofed domain.',
    },
    bodyLinkIntro: 'Review Document:',
    bodyLink: {
      id: 'link',
      text: 'https://docu-sign.com/sign/view?envelope=7729ac',
      isRedFlag: true,
      explanation: 'Same lookalike domain as the sender — not docusign.net.',
    },
    bodyOutro: 'DocuSign',
  },

  {
    id: 'MSG-8947-F',
    sender: {
      id: 'sender',
      text: 'FedEx Delivery <delivery@fedex-notify.info>',
      isRedFlag: true,
      explanation:
        'FedEx uses fedex.com. A ".info" domain with "notify" tacked on is not an official FedEx domain.',
    },
    recipient: 'user@company.org',
    date: 'Dec 2, 2025, 09:27 UTC',
    subject: {
      id: 'subject',
      text: 'We could not deliver your package',
      isRedFlag: false,
      explanation:
        'Missed-delivery notices are genuinely common — the subject line matches real carrier language.',
    },
    bodyIntro:
      'Our courier attempted delivery of your package today but was unable to complete it.',
    bodyFlaggedLine: {
      id: 'fee-line',
      text: 'A redelivery fee of $2.99 is required before your package can be rescheduled for delivery.',
      isRedFlag: true,
      explanation:
        'Legitimate carriers do not charge small "redelivery fees" via email link — this is a classic small-amount card-skimming pattern designed to feel too minor to question.',
    },
    bodyLinkIntro: 'Pay the redelivery fee and reschedule here:',
    bodyLink: {
      id: 'link',
      text: 'https://bit.ly/fdx-redeliver-2521',
      isRedFlag: true,
      explanation:
        'A shortened link hides the actual destination domain, preventing you from checking it before clicking.',
    },
    bodyOutro: 'FedEx Customer Service',
  },

  {
    id: 'MSG-8948-G',
    sender: {
      id: 'sender',
      text: 'IRS Tax Relief <refunds@irs-govrelief.org>',
      isRedFlag: true,
      explanation:
        'The real IRS domain is irs.gov, a .gov domain. "irs-govrelief.org" is not a government domain at all.',
    },
    recipient: 'user@company.org',
    date: 'Apr 9, 2026, 13:18 UTC',
    subject: {
      id: 'subject',
      text: 'You are eligible for a refund of $1,247.00',
      isRedFlag: true,
      explanation:
        'The IRS does not initiate contact about refunds via unsolicited email — an unprompted "you\'re owed money" subject line is itself a known scam pattern.',
    },
    bodyIntro:
      'Our records indicate you are owed a tax refund that has not yet been claimed.',
    bodyFlaggedLine: {
      id: 'ssn-line',
      text: 'To claim your refund, please provide your Social Security Number and bank account details within 72 hours.',
      isRedFlag: true,
      explanation:
        'Requests for SSN and banking details by email are one of the clearest possible red flags — no legitimate government agency collects this information this way.',
    },
    bodyLinkIntro: 'Claim your refund here:',
    bodyLink: {
      id: 'link',
      text: 'https://irs-govrelief.org/claim/refund-portal',
      isRedFlag: true,
      explanation: 'Not an official irs.gov domain.',
    },
    bodyOutro: 'Department of Treasury',
  },

  {
    id: 'MSG-8949-H',
    sender: {
      id: 'sender',
      text: 'Security Alerts <alerts@company-sso-verify.com>',
      isRedFlag: true,
      explanation:
        "This mimics your organization's SSO but uses an external domain (company-sso-verify.com) rather than your real company.org domain.",
    },
    recipient: 'user@company.org',
    date: 'May 21, 2026, 22:04 UTC',
    subject: {
      id: 'subject',
      text: 'Security Alert: Multiple Sign-In Attempts',
      isRedFlag: false,
      explanation:
        'Real MFA/SSO systems do send alerts worded almost exactly like this — the subject alone matches legitimate behavior.',
    },
    bodyIntro:
      'We detected repeated sign-in attempts on your account from an unrecognized device.',
    bodyFlaggedLine: {
      id: 'push-line',
      text: 'If you did not attempt to sign in 14 times in the last 10 minutes, click below immediately to block access before your account is compromised.',
      isRedFlag: true,
      explanation:
        'This mirrors real-world "MFA fatigue" or push-bombing attacks, where victims are pressured into clicking a link out of panic instead of verifying through their actual authenticator app or IT contact.',
    },
    bodyLinkIntro: 'Block unauthorized access now:',
    bodyLink: {
      id: 'link',
      text: 'https://company-sso-verify.com/block-access?session=af12',
      isRedFlag: true,
      explanation: 'Same non-company domain as the sender.',
    },
    bodyOutro: 'Security Operations',
  },

  {
    id: 'MSG-8950-I',
    sender: {
      id: 'sender',
      text: 'Zoom Meetings <meetings@zoom-us-invite.com>',
      isRedFlag: true,
      explanation:
        'Zoom\'s real domain is zoom.us. "zoom-us-invite.com" only contains "zoom-us" as a prefix — it is a separate, unrelated domain.',
    },
    recipient: 'user@company.org',
    date: 'Jun 4, 2026, 08:50 UTC',
    subject: {
      id: 'subject',
      text: 'Meeting Invitation: Q3 Budget Review',
      isRedFlag: false,
      explanation:
        "A specific, plausible meeting title referencing real business activity is common in both real invites and targeted spear-phishing — the title alone doesn't confirm or rule out anything.",
    },
    bodyIntro:
      'You have been invited to join a scheduled Zoom meeting: Q3 Budget Review.',
    bodyFlaggedLine: {
      id: 'join-line',
      text: 'Your meeting starts in 5 minutes — join now to avoid being marked absent from a mandatory session.',
      isRedFlag: true,
      explanation:
        'Fabricated time pressure plus an implied consequence (being "marked absent") is designed to make you click without checking the link first.',
    },
    bodyLinkIntro: 'Join the meeting:',
    bodyLink: {
      id: 'link',
      text: 'https://zoom-us-invite.com/j/88213409',
      isRedFlag: true,
      explanation: 'Lookalike domain, not the real zoom.us.',
    },
    bodyOutro: 'Zoom',
  },

  {
    id: 'MSG-8951-J',
    sender: {
      id: 'sender',
      text: 'Google Drive <drive-share@docs-google-mail.com>',
      isRedFlag: true,
      explanation:
        'Google Drive sharing notifications come from google.com domains — "docs-google-mail.com" only borrows familiar words, it isn\'t an actual Google domain.',
    },
    recipient: 'user@company.org',
    date: 'Jan 27, 2026, 11:12 UTC',
    subject: {
      id: 'subject',
      text: 'Shared with you: Q4_Compensation_Review.xlsx',
      isRedFlag: false,
      explanation:
        "A specific, plausible-sounding filename is a spear-phishing tactic designed to feel personally relevant — but the subject wording itself isn't the technical tell here.",
    },
    bodyIntro: 'Someone from your organization has shared a file with you.',
    bodyFlaggedLine: {
      id: 'expire-line',
      text: 'This file will expire and become permanently inaccessible in 3 hours — view it now to avoid losing access.',
      isRedFlag: true,
      explanation:
        'Google Drive shares do not expire on an artificial countdown like this — the manufactured deadline exists purely to rush the click.',
    },
    bodyLinkIntro: 'Open Document:',
    bodyLink: {
      id: 'link',
      text: 'https://docs-google-mail.com/file/d/9284x/view',
      isRedFlag: true,
      explanation: 'Not a real drive.google.com or docs.google.com URL.',
    },
    bodyOutro: 'Google Drive',
  },

  {
    id: 'MSG-8952-K',
    sender: {
      id: 'sender',
      text: 'Chase Bank <alerts@chase-secure-banking.com>',
      isRedFlag: true,
      explanation:
        'Chase\'s real domain is chase.com. "chase-secure-banking.com" adds extra words to sound official but is not affiliated with Chase.',
    },
    recipient: 'user@company.org',
    date: 'Aug 15, 2025, 06:44 UTC',
    subject: {
      id: 'subject',
      text: 'Unusual sign-in activity detected',
      isRedFlag: false,
      explanation:
        'Banks genuinely send alerts worded exactly like this — the subject line is not the giveaway.',
    },
    bodyIntro:
      "We noticed a sign-in to your account from a device we don't recognize.",
    bodyFlaggedLine: {
      id: 'limit-line',
      text: "As a precaution, we've temporarily limited some features on your account until you verify recent activity.",
      isRedFlag: false,
      explanation:
        'This is standard, measured security language that real banks genuinely use — nothing here is exaggerated or threatening. Flagging every mention of "limited account" trains you to over-flag normal security communication.',
    },
    bodyLinkIntro: 'Verify your recent activity:',
    bodyLink: {
      id: 'link',
      text: 'https://chase-secure-banking.com/verify/activity',
      isRedFlag: true,
      explanation:
        'Despite the calm, reasonable body copy, the domain is still not chase.com — the link is the actual tell in this message, not the wording.',
    },
    bodyOutro: 'Chase Fraud Prevention',
  },

  {
    id: 'MSG-8953-L',
    sender: {
      id: 'sender',
      text: 'IT Operations <it-alerts@corp-vpnupdate.com>',
      isRedFlag: true,
      explanation:
        'This should come from your internal company.org domain, not an external domain like corp-vpnupdate.com.',
    },
    recipient: 'user@company.org',
    date: 'Sep 9, 2025, 17:30 UTC',
    subject: {
      id: 'subject',
      text: 'Mandatory VPN Client Update',
      isRedFlag: false,
      explanation:
        'IT departments do send mandatory update notices — the subject wording is unremarkable.',
    },
    bodyIntro:
      'A critical security patch for the VPN client must be installed on all company devices.',
    bodyFlaggedLine: {
      id: 'deadline-line',
      text: 'This update must be completed by end of day or your VPN access will be revoked and your device flagged for a compliance review.',
      isRedFlag: true,
      explanation:
        'Real patch rollouts are typically pushed silently through device management tools, not enforced by a same-day email deadline with a vague "compliance review" threat.',
    },
    bodyLinkIntro: 'Download the update:',
    bodyLink: {
      id: 'link',
      text: 'https://corp-vpnupdate.com/download/patch-4.2.1.exe',
      isRedFlag: true,
      explanation:
        'Downloading an executable from a non-company domain is exactly how malware gets installed on corporate devices.',
    },
    bodyOutro: 'IT Operations',
  },

  {
    id: 'MSG-8954-M',
    sender: {
      id: 'sender',
      text: 'Benefits Team <benefits@hr-employeeportal-verify.com>',
      isRedFlag: true,
      explanation:
        'HR communications should come from your company.org domain — "hr-employeeportal-verify.com" is an external, unrelated domain.',
    },
    recipient: 'user@company.org',
    date: 'Nov 3, 2025, 09:00 UTC',
    subject: {
      id: 'subject',
      text: '2026 Open Enrollment closes Friday',
      isRedFlag: false,
      explanation:
        'Open enrollment deadline reminders are a completely normal, expected HR email at this time of year.',
    },
    bodyIntro:
      'This is a reminder that annual benefits open enrollment is ending soon.',
    bodyFlaggedLine: {
      id: 'autoenroll-line',
      text: 'Failure to log in and confirm your selections by Friday will result in automatic enrollment in the highest-cost plan available.',
      isRedFlag: true,
      explanation:
        'This specific, punitive consequence ("automatically enrolled in the highest-cost plan") is designed to trigger panic — real HR communications don\'t threaten employees with the most expensive option as a penalty.',
    },
    bodyLinkIntro: 'Confirm your selections:',
    bodyLink: {
      id: 'link',
      text: 'https://hr-employeeportal-verify.com/enroll/confirm',
      isRedFlag: true,
      explanation: "Not your organization's real HR/benefits domain.",
    },
    bodyOutro: 'Benefits Team',
  },

  {
    id: 'MSG-8955-N',
    sender: {
      id: 'sender',
      text: 'Marcus Feld, Accounts Payable <mfeld@vendornarne.com>',
      isRedFlag: true,
      explanation:
        'Look closely: "vendornarne.com" — the "m" in the real vendor domain "vendorname.com" has been replaced with "rn", which renders almost identically in most fonts. This is a homograph attack, one of the hardest typosquats to catch by eye.',
    },
    recipient: 'user@company.org',
    date: 'Jul 1, 2026, 12:09 UTC',
    subject: {
      id: 'subject',
      text: 'Re: Invoice #4471 — Project Nightingale',
      isRedFlag: true,
      explanation:
        'This is "prepending": adding "Re:" to make an email look like it\'s continuing a thread that never actually existed, so it feels like an established, trusted conversation.',
    },
    bodyIntro:
      'Hi, following up on the invoice for Project Nightingale materials shipped last month.',
    bodyFlaggedLine: {
      id: 'bank-line',
      text: 'Please note we have updated our banking details — kindly process this and all future payments to the new account listed below.',
      isRedFlag: true,
      explanation:
        'Unexpected changes to payment/banking details are the single most common trigger in real invoice fraud and vendor email compromise cases — this should always be verified by phone using a known-good number, never the one in the email.',
    },
    bodyLinkIntro: 'View updated payment instructions:',
    bodyLink: {
      id: 'link',
      text: 'https://vendornarne-payments.com/invoice/4471',
      isRedFlag: true,
      explanation:
        'Same lookalike vendor domain pattern as the sender address.',
    },
    bodyOutro: 'Marcus Feld, Accounts Payable',
  },

  {
    id: 'MSG-8956-O',
    sender: {
      id: 'sender',
      text: 'Norton Renewals <billing@norton-renewals-secure.com>',
      isRedFlag: true,
      explanation:
        "Norton's real billing communications come from norton.com or nortonlifelock.com — not a third-party domain like this one.",
    },
    recipient: 'user@company.org',
    date: 'Oct 30, 2025, 15:22 UTC',
    subject: {
      id: 'subject',
      text: 'Your antivirus subscription has expired',
      isRedFlag: false,
      explanation:
        'Subscription expiration notices are a normal, expected type of email.',
    },
    bodyIntro: 'Our records show your device protection plan expired recently.',
    bodyFlaggedLine: {
      id: 'unprotected-line',
      text: "Your device is currently unprotected — renew now to avoid a $499 annual fee and lock in today's discounted rate.",
      isRedFlag: true,
      explanation:
        'Fear ("unprotected device") combined with an inflated, arbitrary price and a fake time-limited discount is a classic tech-support-scam pressure tactic.',
    },
    bodyLinkIntro: 'Renew your protection:',
    bodyLink: {
      id: 'link',
      text: 'https://norton-renewals-secure.com/checkout',
      isRedFlag: true,
      explanation: 'Not an official Norton domain.',
    },
    bodyOutro: 'Norton Billing Team',
  },

  {
    id: 'MSG-8957-P',
    sender: {
      id: 'sender',
      text: 'Talent Acquisition <hr@global-talent-recruiting.net>',
      isRedFlag: true,
      explanation:
        'Legitimate recruiters at real companies email from that company\'s actual domain, not a generic third-party "recruiting" domain unconnected to any specific employer.',
    },
    recipient: 'user@company.org',
    date: 'May 6, 2026, 10:37 UTC',
    subject: {
      id: 'subject',
      text: "Congratulations! You've been selected for a remote position",
      isRedFlag: true,
      explanation:
        'Being "selected" for a job you never applied to, with no interview process, is a well-documented recruitment scam pattern — too good to be true, with nothing to verify it against.',
    },
    bodyIntro:
      'After reviewing candidate profiles, we are pleased to offer you a fully remote position with flexible hours and competitive pay.',
    bodyFlaggedLine: {
      id: 'kit-line',
      text: 'To begin onboarding, please purchase a $200 starter equipment kit from our approved vendor — this will be fully reimbursed in your first paycheck.',
      isRedFlag: true,
      explanation:
        'Asking a new hire to pay money upfront "to be reimbursed later" is a textbook advance-fee scam — no legitimate employer requires this.',
    },
    bodyLinkIntro: 'Begin onboarding:',
    bodyLink: {
      id: 'link',
      text: 'https://global-talent-recruiting.net/onboard/start',
      isRedFlag: true,
      explanation:
        'Generic, unaffiliated domain with no connection to a real employer.',
    },
    bodyOutro: 'Talent Acquisition Team',
  },

  {
    id: 'MSG-8958-Q',
    sender: {
      id: 'sender',
      text: 'Security Team <security@corp-mfa-update.com>',
      isRedFlag: true,
      explanation:
        'MFA-related security requests should come from your company.org domain — this is an external, unrelated domain.',
    },
    recipient: 'user@company.org',
    date: 'Jun 22, 2026, 09:41 UTC',
    subject: {
      id: 'subject',
      text: 'Update your multi-factor authentication method',
      isRedFlag: false,
      explanation:
        'MFA re-enrollment requests are a routine, expected type of IT communication.',
    },
    bodyIntro:
      'As part of a scheduled security upgrade, all employees must re-enroll their authenticator app.',
    bodyFlaggedLine: {
      id: 'qr-line',
      text: 'Scan the QR code below with your phone to re-enroll before your account access is suspended.',
      isRedFlag: true,
      explanation:
        'This is "quishing" — QR codes route to a destination that can\'t be previewed or hovered over before scanning, making them a favored way to bypass link inspection entirely.',
    },
    bodyLinkIntro: 'QR destination (scan or tap):',
    bodyLink: {
      id: 'link',
      text: 'https://bit.ly/3mfa-verify-2026',
      isRedFlag: true,
      explanation:
        'A shortened link on top of a QR code means the real destination is hidden twice over.',
    },
    bodyOutro: 'Security Team',
  },

  // --- Clean scenarios: no red flags anywhere ---
  {
    id: 'MSG-8959-R',
    sender: {
      id: 'sender',
      text: 'IT Operations <no-reply@company.org>',
      isRedFlag: false,
      explanation:
        'This sender domain matches your actual company domain (company.org) exactly.',
    },
    recipient: 'user@company.org',
    date: 'Feb 2, 2026, 09:00 UTC',
    subject: {
      id: 'subject',
      text: 'Your password expires in 7 days',
      isRedFlag: false,
      explanation:
        'A reasonable 7-day advance notice with no threats or artificial deadlines — completely standard IT practice.',
    },
    bodyIntro:
      'This is a routine reminder that your network password will expire in 7 days.',
    bodyFlaggedLine: {
      id: 'reset-line',
      text: 'Please update your password at your convenience before it expires by visiting the employee portal.',
      isRedFlag: false,
      explanation:
        'No urgency, no threats, and a full week of lead time — this reads exactly like a normal IT courtesy reminder.',
    },
    bodyLinkIntro: 'Update your password here:',
    bodyLink: {
      id: 'link',
      text: 'https://portal.company.org/account/password',
      isRedFlag: false,
      explanation:
        'This is a subdomain (portal.company.org) of your actual company domain — not a lookalike.',
    },
    bodyOutro: 'IT Operations',
  },

  {
    id: 'MSG-8960-S',
    sender: {
      id: 'sender',
      text: 'Jordan Reyes <jordan.reyes@company.org>',
      isRedFlag: false,
      explanation: 'A named coworker sending from your real company domain.',
    },
    recipient: 'user@company.org',
    date: 'Mar 16, 2026, 08:05 UTC',
    subject: {
      id: 'subject',
      text: 'Invite: Weekly Security Team Sync — Thurs 10am',
      isRedFlag: false,
      explanation:
        'An ordinary, specific internal meeting invite — nothing pressuring or unusual about it.',
    },
    bodyIntro:
      'Hi team, sending over our recurring Thursday sync. Agenda and notes doc will be shared beforehand as usual.',
    bodyFlaggedLine: {
      id: 'details-line',
      text: 'No prep needed this week — just come ready to discuss the Q2 roadmap updates.',
      isRedFlag: false,
      explanation:
        'A relaxed, low-stakes instruction with no request for credentials, payment, or urgent action.',
    },
    bodyLinkIntro: 'Join the call here:',
    bodyLink: {
      id: 'link',
      text: 'https://meet.company.org/j/48213',
      isRedFlag: false,
      explanation:
        'A subdomain of your real company.org domain — consistent with internal tooling.',
    },
    bodyOutro: 'Thanks, Jordan',
  },

  {
    id: 'MSG-8961-T',
    sender: {
      id: 'sender',
      text: 'Amazon <shipment-confirmation@amazon.com>',
      isRedFlag: false,
      explanation:
        "This is Amazon's actual, legitimate domain — no typosquatting or lookalike tricks.",
    },
    recipient: 'user@company.org',
    date: 'Apr 28, 2026, 18:20 UTC',
    subject: {
      id: 'subject',
      text: 'Your package has shipped',
      isRedFlag: false,
      explanation:
        'A routine shipping confirmation for an order — nothing alarming about the subject.',
    },
    bodyIntro:
      'Good news! Your recent order is on its way and should arrive within the estimated delivery window.',
    bodyFlaggedLine: {
      id: 'tracking-line',
      text: 'You can view real-time tracking updates and delivery instructions anytime from your order history.',
      isRedFlag: false,
      explanation:
        'A neutral, factual statement with no urgency, fees, or unusual requests.',
    },
    bodyLinkIntro: 'Track your package:',
    bodyLink: {
      id: 'link',
      text: 'https://www.amazon.com/gp/your-account/order-history',
      isRedFlag: false,
      explanation: 'The genuine amazon.com domain — safe to click.',
    },
    bodyOutro: 'Thanks for shopping with us, Amazon',
  },
];

export function getScenarioForDate(date: Date): Scenario {
  const epochDay = Math.floor(date.getTime() / 86_400_000);
  const index = epochDay % scenarioPool.length;
  const scenario = scenarioPool[index];

  if (!scenario) {
    throw new Error(
      'Scenario pool is empty — cannot resolve a scenario for today.'
    );
  }

  return scenario;
}
