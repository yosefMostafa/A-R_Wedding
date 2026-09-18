export type ShareResult = 'shared' | 'copied' | 'unsupported';

export async function shareInvitation(title: string, text: string, url: string): Promise<ShareResult> {
  if (typeof navigator === 'undefined') return 'unsupported';
  if (navigator.share) {
    try {
      await navigator.share({ title, text, url });
    } catch {
      /* user dismissed the share sheet */
    }
    return 'shared';
  }
  if (navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(url);
      return 'copied';
    } catch {
      return 'unsupported';
    }
  }
  return 'unsupported';
}
