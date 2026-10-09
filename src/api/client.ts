export function getBase(): string {
  const saved = localStorage.getItem('raid-api-base');
  const configured = import.meta.env.VITE_API_BASE_URL as string | undefined;
  const fallback = ['localhost', '127.0.0.1'].includes(location.hostname)
    ? 'http://localhost:8080'
    : '';
  return (saved ?? configured ?? fallback).trim().replace(/\/+$/, '');
}

export async function api<T>(path: string, method = 'GET', body?: unknown): Promise<T> {
  const base = getBase();
  if (!base) throw new Error('연결 설정에서 백엔드 주소를 입력해 주세요.');

  let response: Response;
  try {
    response = await fetch(base + path, {
      method,
      headers: body === undefined ? {} : { 'Content-Type': 'application/json' },
      body: body === undefined ? undefined : JSON.stringify(body),
      signal: AbortSignal.timeout(12000),
    });
  } catch {
    throw new Error('서버에 연결할 수 없습니다. 백엔드 실행 상태와 연결 주소를 확인해 주세요.');
  }

  if (!response.ok) {
    const data = await response.json().catch(() => null);
    throw new Error(data?.message ?? `요청을 처리하지 못했습니다. (${response.status})`);
  }
  if (response.status === 204 || response.headers.get('content-length') === '0') {
    return undefined as T;
  }
  const text = await response.text();
  return (text ? JSON.parse(text) : undefined) as T;
}