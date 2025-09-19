import { http, HttpResponse } from 'msw';

const fetchJson = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}`);
  }
  return response.json();
};

export const handlers = [
  // Humanize endpoint
  http.post('/api/v1/humanize', async () => {
    try {
      const data = await fetchJson('/fixtures/humanize_output.json');
      return HttpResponse.json(data);
    } catch (error) {
      return HttpResponse.json({ error: 'Failed to load mock data' }, { status: 500 });
    }
  }),

  // Detect Text endpoint
  http.post('/api/v1/detect', async () => {
    try {
      const data = await fetchJson('/fixtures/ai_checker_results.json');
      return HttpResponse.json(data);
    } catch (error) {
      return HttpResponse.json({ error: 'Failed to load mock data' }, { status: 500 });
    }
  }),

  // Grammar endpoint
  http.post('/api/v1/grammar/check', async () => {
    try {
      const data = await fetchJson('/fixtures/grammar_results.json');
      return HttpResponse.json(data);
    } catch (error) {
      return HttpResponse.json({ error: 'Failed to load mock data' }, { status: 500 });
    }
  }),

  // Plagiarism endpoint
  http.post('/api/v1/plagiarism/check', async () => {
    try {
      const data = await fetchJson('/fixtures/plagiarism_results.json');
      return HttpResponse.json(data);
    } catch (error) {
      return HttpResponse.json({ error: 'Failed to load mock data' }, { status: 500 });
    }
  }),

  // Translator endpoint
  http.post('/api/v1/translate', async () => {
    try {
      const data = await fetchJson('/fixtures/translation_results.json');
      return HttpResponse.json(data);
    } catch (error) {
      return HttpResponse.json({ error: 'Failed to load mock data' }, { status: 500 });
    }
  }),

  // Workspace chat endpoint
  http.post('/api/v1/chat/respond', async () => {
    try {
      const data = await fetchJson('/fixtures/chat_assistant.json');
      return HttpResponse.json({ messages: data });
    } catch (error) {
      return HttpResponse.json({ error: 'Failed to load mock data' }, { status: 500 });
    }
  }),

  // Loyalty overview endpoint
  http.get('/api/v1/loyalty/summary', () => {
    return HttpResponse.json({
      currentPoints: 3420,
      nextTier: 'Elite',
      threshold: 5000,
      referrals: 6,
      bonus: 320,
    });
  }),

  // Auth endpoints (mocked)
  http.post('/api/v1/auth/login', () => {
    return HttpResponse.json({ message: 'Login successful', token: 'mock-token' });
  }),
  http.post('/api/v1/auth/register', () => {
    return HttpResponse.json({ message: 'Registration successful' });
  }),
  http.post('/api/v1/auth/verify-email', () => {
    return HttpResponse.json({ message: 'Email verified' });
  }),
  http.post('/api/v1/auth/forgot-password', () => {
    return HttpResponse.json({ message: 'Password reset link sent' });
  }),
  http.post('/api/v1/auth/reset-password', () => {
    return HttpResponse.json({ message: 'Password reset successful' });
  }),
  http.post('/api/v1/auth/2fa', () => {
    return HttpResponse.json({ message: '2FA enabled' });
  }),
  http.post('/api/v1/auth/magic-link', () => {
    return HttpResponse.json({ message: 'Magic link sent' });
  }),

  // History endpoint
  http.get('/api/v1/history', () => {
    const historyData = [
      { id: '1', tool: 'Humanize', date: '2023-01-10', status: 'completed' },
      { id: '2', tool: 'Detect Text', date: '2023-01-09', status: 'completed' },
      { id: '3', tool: 'Grammar', date: '2023-01-08', status: 'completed' },
      { id: '4', tool: 'Translator', date: '2023-01-07', status: 'completed' },
    ];
    return HttpResponse.json(historyData);
  }),
];