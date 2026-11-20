export function resolveClientDeviceLabel(): string {
  if (typeof window === 'undefined' || !navigator.userAgent) {
    return 'Thiết bị hiện tại';
  }

  const ua = navigator.userAgent;

  let browser = 'Trình duyệt';
  if (ua.includes('Edg/')) {
    browser = 'Edge';
  } else if (ua.includes('OPR/') || ua.includes('Opera')) {
    browser = 'Opera';
  } else if (ua.includes('Chrome/') && !ua.includes('Chromium')) {
    browser = 'Chrome';
  } else if (ua.includes('Firefox/')) {
    browser = 'Firefox';
  } else if (ua.includes('Safari/') && !ua.includes('Chrome/')) {
    browser = 'Safari';
  }

  let os = '';
  if (ua.includes('iPhone')) {
    os = 'iOS';
  } else if (ua.includes('iPad')) {
    os = 'iPadOS';
  } else if (ua.includes('Android')) {
    os = 'Android';
  } else if (ua.includes('Macintosh') || ua.includes('Mac OS X')) {
    os = 'macOS';
  } else if (ua.includes('Windows')) {
    os = 'Windows';
  } else if (ua.includes('Linux')) {
    os = 'Linux';
  }

  if (browser && os) {
    return `${browser} trên ${os}`;
  }
  return browser || os || 'Thiết bị này';
}
