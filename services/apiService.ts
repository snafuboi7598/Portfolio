// This service now makes calls to the Spring Boot backend.
// Ensure the backend is running on http://localhost:8080

const API_BASE_URL = 'http://localhost:8080/api';

interface Lead {
    name: string;
    email: string;
    phone: string;
}

/**
 * Saves a lead (name, email, phone) to the backend.
 * The backend handles duplicate checks (one entry per email per day).
 * @param lead The user's contact information.
 */
export const saveLead = async (lead: Lead): Promise<void> => {
    console.log(`[API Service] Attempting to capture lead for: ${lead.email}`);

    const response = await fetch(`${API_BASE_URL}/leads`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(lead),
    });

    if (response.status === 409) { // Conflict - duplicate
        const errorMessage = await response.text();
        throw new Error(errorMessage);
    }
    
    if (!response.ok) {
        throw new Error('An unexpected error occurred. Please try again.');
    }

    const responseData = await response.json();
    console.log('[API Service] Lead captured successfully:', responseData);
};


/**
 * Fetches the current like count from the backend.
 */
export const getLikes = async (): Promise<number> => {
    try {
        const response = await fetch(`${API_BASE_URL}/likes`);
        if (!response.ok) {
            return 0;
        }
        const data = await response.json();
        return data.count || 0;
    } catch (error) {
        console.error('[API Service] Failed to fetch likes:', error);
        return 0; // Return a default value on error
    }
};


/**
 * Sends a request to increment or decrement the like count on the backend.
 * @param liked A boolean indicating whether the action is a like (true) or unlike (false).
 */
export const updateLikes = async (liked: boolean): Promise<number> => {
    const action = liked ? 'increment' : 'decrement';
    console.log(`[API Service] ${action}ing like count.`);
    
    try {
        const response = await fetch(`${API_BASE_URL}/likes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ action }),
        });

        if (!response.ok) {
            throw new Error('Failed to update likes.');
        }

        const data = await response.json();
        console.log(`[API Service] Like count updated. New count: ${data.count}`);
        return data.count;

    } catch (error) {
        console.error(`[API Service] Error ${action}ing likes:`, error);
        // In case of an error, we might want to revert the UI state, but for now, we'll just log it.
        // Returning a specific value like -1 could signal an error to the component.
        throw error;
    }
};
