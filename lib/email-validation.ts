const PUBLIC_EMAIL_DOMAINS = [
  "gmail.com",
  "yahoo.com",
  "hotmail.com",
  "outlook.com",
  "live.com",
  "icloud.com",
  "aol.com",
  "mail.com",
  "protonmail.com",
  "yandex.com",
  "zoho.com",
  "gmx.com",
]

export function isBusinessEmail(email: string): boolean {
  const domain = email.toLowerCase().split("@")[1]

  if (!domain) {
    return false
  }

  return !PUBLIC_EMAIL_DOMAINS.includes(domain)
}

export function getEmailValidationError(email: string): string | null {
  if (!email || !email.includes("@")) {
    return "Please enter a valid email address"
  }

  if (!isBusinessEmail(email)) {
    return "Please use a business email address. Personal email providers (Gmail, Yahoo, Hotmail, etc.) are not allowed."
  }

  return null
}
