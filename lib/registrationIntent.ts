/**
 * Utility functions for handling user registration intent
 * Helps preserve the selected plan throughout the OAuth flow
 */

export interface RegistrationIntent {
  plan: string;
  source: string;
  timestamp: number;
  isNewRegistration: boolean;
}

export function storeRegistrationIntent(plan: string, source: string = 'pricing') {
  if (typeof window === 'undefined') return;
  
  const intent: RegistrationIntent = {
    plan,
    source,
    timestamp: Date.now(),
    isNewRegistration: true
  };
  
  localStorage.setItem('registration_intent', JSON.stringify(intent));
  console.log('Stored registration intent:', intent);
}

export function getRegistrationIntent(): RegistrationIntent | null {
  if (typeof window === 'undefined') return null;
  
  try {
    const stored = localStorage.getItem('registration_intent');
    if (!stored) return null;
    
    const intent = JSON.parse(stored) as RegistrationIntent;
    
    // Check if intent is expired (older than 1 hour)
    if (Date.now() - intent.timestamp > 60 * 60 * 1000) {
      localStorage.removeItem('registration_intent');
      return null;
    }
    
    return intent;
  } catch (error) {
    console.error('Error retrieving registration intent:', error);
    return null;
  }
}

export function clearRegistrationIntent() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('registration_intent');
  console.log('Cleared registration intent');
}

export function hasValidRegistrationIntent(): boolean {
  return getRegistrationIntent() !== null;
}
