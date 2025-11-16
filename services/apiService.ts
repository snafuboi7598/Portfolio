const API_BASE_URL = 'http://localhost:8080/api'; // unused for now

interface Lead {
  name: string;
  email: string;
  phone: string;
}

// In-memory mock store
let leads: Lead[] = [];
let likeCount = 0;

/**
 * Saves a lead locally (mock).
 */
export const saveLead = async (lead: Lead): Promise<void> => {
  console.log(`[Mock API] Capturing lead for: ${lead.email}`);

  // Check for duplicate (same email in same day)
  const duplicate = leads.find(l => l.email === lead.email);
  if (duplicate) {
    throw new Error('Duplicate lead detected for today.');
  }

  leads.push(lead);
  console.log('[Mock API] Lead captured successfully:', lead);
};

/**
 * Fetches the current like count (mock).
 */
export const getLikes = async (): Promise<number> => {
  console.log('[Mock API] Returning like count:', likeCount);
  return likeCount;
};

/**
 * Updates the like count (mock).
 */
export const updateLikes = async (liked: boolean): Promise<number> => {
  likeCount = liked ? likeCount + 1 : likeCount - 1;
  console.log(`[Mock API] Like count updated. New count: ${likeCount}`);
  return likeCount;
};