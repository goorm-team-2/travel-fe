// src/utils/asset.ts
const BACKEND_ORIGIN = 'http://localhost:8081';

export function resolveBackendImageUrl(path?: string) {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  return `${BACKEND_ORIGIN}${path.startsWith('/') ? '' : '/'}${path}`;
}

export function formatPriceKRW(value: unknown) {
  const n =
    typeof value === 'number'
      ? value
      : typeof value === 'string'
        ? Number(value.replace(/[^\d.-]/g, ''))
        : Number(value ?? 0);

  if (!Number.isFinite(n) || n <= 0) return '';
  return `₩${Math.round(n).toLocaleString('ko-KR')}`;
}
