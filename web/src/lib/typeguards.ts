export type HttpFetchErrorLike = {
  status?: string | number;
  code?: string | 'ECONNREFUSED' | 'ECONNABORTED' | 'ECONNRESET';
};

export const isHttpFetchErrorLike = (
  fetchError: unknown
): fetchError is HttpFetchErrorLike => {
  if (!fetchError || typeof fetchError !== 'object') {
    return false;
  }
  return (
    ('status' in fetchError && typeof fetchError.status === 'string') ||
    ('code' in fetchError && typeof fetchError.code === 'string')
  );
};

export type UrlRelativePath = `/${string}`;

export const isUrlRelativePath = (v: string): v is UrlRelativePath => {
  return typeof (v as unknown) === 'string' && v.startsWith('/');
};
