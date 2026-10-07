export interface NewsletterSubscriber {
  id: string;
  email: string;
  subscribedAt: string;
  interests: string[];
  status: 'active' | 'unsubscribed';
}

const STORAGE_KEY = 'isoko_newsletter_subscribers';

const DEFAULT_SUBSCRIBERS: NewsletterSubscriber[] = [
  {
    id: 'sub-1',
    email: 'keza.diane@gmail.com',
    subscribedAt: '2026-10-01T10:30:00Z',
    interests: ['Comedy', 'Interviews'],
    status: 'active',
  },
  {
    id: 'sub-2',
    email: 'patrick.bruxelles@yahoo.fr',
    subscribedAt: '2026-10-03T15:20:00Z',
    interests: ['Music', 'Live TV Alerts'],
    status: 'active',
  },
  {
    id: 'sub-3',
    email: 'eric.musanze@outlook.com',
    subscribedAt: '2026-10-05T09:12:00Z',
    interests: ['Amakuru Mashya', 'Comedy'],
    status: 'active',
  },
];

/**
 * Retrieve subscribers from mock localStorage state
 */
export function getNewsletterSubscribers(): NewsletterSubscriber[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_SUBSCRIBERS));
      return DEFAULT_SUBSCRIBERS;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.warn('Error reading newsletter subscribers:', e);
    return DEFAULT_SUBSCRIBERS;
  }
}

/**
 * Subscribe a new email to ISOKO TV Newsletter in mock state
 */
export function subscribeNewsletter(
  email: string,
  interests: string[] = ['All Updates']
): { success: boolean; message: string; subscriber?: NewsletterSubscriber } {
  const cleanEmail = email.trim().toLowerCase();

  // Basic email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(cleanEmail)) {
    return {
      success: false,
      message: 'Nyamuneka shyiramo email yemewe (Please enter a valid email address).',
    };
  }

  const subscribers = getNewsletterSubscribers();
  const existing = subscribers.find((s) => s.email === cleanEmail);

  if (existing) {
    if (existing.status === 'active') {
      return {
        success: false,
        message: 'Iyi email isanzwe yariyandikishije muri ISOKO TV Newsletter (Already subscribed)!',
      };
    } else {
      // Reactivate
      existing.status = 'active';
      existing.subscribedAt = new Date().toISOString();
      if (interests.length) existing.interests = interests;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(subscribers));
      return {
        success: true,
        message: 'Wongeye kwiyandikisha neza muri ISOKO TV Newsletter!',
        subscriber: existing,
      };
    }
  }

  const newSubscriber: NewsletterSubscriber = {
    id: `sub-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    email: cleanEmail,
    subscribedAt: new Date().toISOString(),
    interests: interests.length ? interests : ['All Updates'],
    status: 'active',
  };

  const updated = [newSubscriber, ...subscribers];
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.warn('Could not save to localStorage:', e);
  }

  return {
    success: true,
    message: 'Murakoze! Wiyandikishije neza muri ISOKO TV Newsletter. Ubutumwa buzajya buza muri email yawe.',
    subscriber: newSubscriber,
  };
}

/**
 * Remove/unsubscribe
 */
export function unsubscribeNewsletter(email: string): boolean {
  const subscribers = getNewsletterSubscribers();
  const cleanEmail = email.trim().toLowerCase();
  const filtered = subscribers.filter((s) => s.email !== cleanEmail);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return true;
  } catch {
    return false;
  }
}
