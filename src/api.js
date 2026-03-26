const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8787';

async function api(path, options = {}) {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Request failed');
  }
  return data;
}

export const createSession = () => api('/api/session', { method: 'POST' });
export const getMembership = (sessionId) => api(`/api/membership/${sessionId}`);
export const getEntitlement = (sessionId) => api(`/api/entitlement/${sessionId}`);
export const createOrder = (payload) => api('/api/orders', {
  method: 'POST',
  body: JSON.stringify(payload)
});
export const getOrder = (orderId) => api(`/api/orders/${orderId}`);
export const runQuery = (payload) => api('/api/query', {
  method: 'POST',
  body: JSON.stringify(payload)
});