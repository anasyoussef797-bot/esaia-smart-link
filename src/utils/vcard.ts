/**
 * ESAIA - Enterprise vCard (.vcf) Generator & Exporter
 * Compliant with RFC 6350 (vCard 3.0 / 4.0 specifications).
 * Ensures correct UTF-8 encoding for international & Arabic names,
 * structured contact data, work/cell phones, social links, and physical addresses.
 */

export interface VCardContactData {
  firstName?: string;
  lastName?: string;
  fullName: string;
  jobTitle?: string;
  company?: string;
  department?: string;
  phone?: string;
  workPhone?: string;
  email?: string;
  workEmail?: string;
  website?: string;
  address?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  bio?: string;
  photoUrl?: string;
  whatsapp?: string;
  linkedin?: string;
  twitter?: string;
}

/**
 * Escapes characters for vCard syntax (semicolons, commas, backslashes, newlines)
 */
function escapeVCardValue(value: string): string {
  if (!value) return '';
  return value
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\n/g, '\\n');
}

/**
 * Generates an RFC 6350 compliant vCard string
 */
export function generateVCardString(contact: VCardContactData): string {
  const lines: string[] = [];

  lines.push('BEGIN:VCARD');
  lines.push('VERSION:3.0');

  // Names
  const fullName = contact.fullName.trim();
  let lastName = contact.lastName || '';
  let firstName = contact.firstName || '';

  if (!lastName && !firstName) {
    const parts = fullName.split(' ');
    if (parts.length > 1) {
      firstName = parts.slice(0, -1).join(' ');
      lastName = parts[parts.length - 1];
    } else {
      firstName = fullName;
      lastName = '';
    }
  }

  lines.push(`N;CHARSET=UTF-8:${escapeVCardValue(lastName)};${escapeVCardValue(firstName)};;;`);
  lines.push(`FN;CHARSET=UTF-8:${escapeVCardValue(fullName)}`);

  // Organization & Title
  if (contact.company) {
    lines.push(`ORG;CHARSET=UTF-8:${escapeVCardValue(contact.company)}${contact.department ? ';' + escapeVCardValue(contact.department) : ''}`);
  }
  if (contact.jobTitle) {
    lines.push(`TITLE;CHARSET=UTF-8:${escapeVCardValue(contact.jobTitle)}`);
  }

  // Telephones
  if (contact.phone) {
    const cleanPhone = contact.phone.replace(/[\s()-]/g, '');
    lines.push(`TEL;TYPE=CELL,VOICE,pref:${cleanPhone}`);
  }
  if (contact.workPhone) {
    const cleanWorkPhone = contact.workPhone.replace(/[\s()-]/g, '');
    lines.push(`TEL;TYPE=WORK,VOICE:${cleanWorkPhone}`);
  }

  // Emails
  if (contact.email) {
    lines.push(`EMAIL;TYPE=INTERNET,pref:${contact.email.trim()}`);
  }
  if (contact.workEmail) {
    lines.push(`EMAIL;TYPE=WORK,INTERNET:${contact.workEmail.trim()}`);
  }

  // Websites & Socials
  if (contact.website) {
    lines.push(`URL;TYPE=WORK:${contact.website.trim()}`);
  }
  if (contact.linkedin) {
    lines.push(`X-SOCIALPROFILE;TYPE=linkedin:${contact.linkedin.trim()}`);
  }
  if (contact.twitter) {
    lines.push(`X-SOCIALPROFILE;TYPE=twitter:${contact.twitter.trim()}`);
  }

  // Physical Address
  if (contact.address || contact.city || contact.country) {
    lines.push(
      `ADR;TYPE=WORK;CHARSET=UTF-8:;;${escapeVCardValue(contact.address || '')};${escapeVCardValue(contact.city || '')};${escapeVCardValue(contact.state || '')};${escapeVCardValue(contact.postalCode || '')};${escapeVCardValue(contact.country || '')}`
    );
  }

  // Bio / Notes
  if (contact.bio) {
    lines.push(`NOTE;CHARSET=UTF-8:${escapeVCardValue(contact.bio)}`);
  }

  // Photo URL
  if (contact.photoUrl && contact.photoUrl.startsWith('http')) {
    lines.push(`PHOTO;VALUE=URI:${contact.photoUrl}`);
  }

  lines.push(`REV:${new Date().toISOString().replace(/[-:.]/g, '')}`);
  lines.push('END:VCARD');

  return lines.join('\r\n');
}

/**
 * Initiates an immediate client-side .vcf file download
 */
export function downloadVCard(contact: VCardContactData, filename?: string): void {
  const vcardText = generateVCardString(contact);
  const blob = new Blob([vcardText], { type: 'text/vcard;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const safeFilename = (filename || contact.fullName.replace(/[^a-zA-Z0-9_-]/g, '_')) + '.vcf';

  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', safeFilename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
