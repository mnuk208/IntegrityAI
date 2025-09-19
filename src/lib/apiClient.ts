import toast from 'react-hot-toast';

const API_BASE = '/api/v1';

const fetchWithRetry = async (url: string, options: RequestInit, retries = 3): Promise<Response> => {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error((await response.json()).error || 'API call failed');
    }
    return response;
  } catch (error) {
    if (retries > 0) {
      toast.error(`Retrying request... (${retries} retries left)`);
      await new Promise((resolve) => setTimeout(resolve, 1000 * (4 - retries)));
      return fetchWithRetry(url, options, retries - 1);
    }
    throw error;
  }
};

export const humanize = async (text: string) => {
  const response = await fetchWithRetry(`${API_BASE}/humanize`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  });
  return response.json();
};

export const checkAI = async (text: string) => {
  const response = await fetchWithRetry(`${API_BASE}/detect`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  });
  return response.json();
};

export const checkGrammar = async (text: string) => {
  const response = await fetchWithRetry(`${API_BASE}/grammar/check`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  });
  return response.json();
};

export const checkPlagiarism = async (text: string) => {
  const response = await fetchWithRetry(`${API_BASE}/plagiarism/check`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  });
  return response.json();
};

export const translateText = async (text: string) => {
  const response = await fetchWithRetry(`${API_BASE}/translate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  });
  return response.json();
};

export interface FeedbackPayload {
  rating: number;
  text?: string;
  videoFile?: File | null;
}

export const sendFeedback = async ({ rating, text, videoFile }: FeedbackPayload) => {
  const formData = new FormData();
  formData.append('rating', String(rating));
  if (text && text.trim().length > 0) {
    formData.append('text', text.trim());
  }
  if (videoFile) {
    formData.append('video', videoFile);
  }

  const response = await fetchWithRetry(`${API_BASE}/feedback`, {
    method: 'POST',
    body: formData,
  });

  return response.json();
};
// Mock data fetching functions
export const getHumanizeData = async () => {
  const response = await fetch('/fixtures/humanize_output.json');
  return response.json();
};
export const getAICheckerData = async () => {
  const response = await fetch('/fixtures/ai_checker_results.json');
  return response.json();
};
export const getGrammarData = async () => {
  const response = await fetch('/fixtures/grammar_results.json');
  return response.json();
};
export const getPlagiarismData = async () => {
  const response = await fetch('/fixtures/plagiarism_results.json');
  return response.json();
};
export const getTranslationData = async () => {
  const response = await fetch('/fixtures/translation_results.json');
  return response.json();
};

// Mock auth API calls
export const login = async (email: string, password: string) => {
  const response = await fetchWithRetry(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  return response.json();
};

export const register = async (email: string, password: string) => {
  const response = await fetchWithRetry(`${API_BASE}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  return response.json();
};

