export function constructURLSearchParams({
  oldSearchParams,
  newSearchParamKey,
  newSearchParamValue
}: {
  oldSearchParams: string;
  newSearchParamKey: string;
  newSearchParamValue: string;
}): string {
  const params = new URLSearchParams(oldSearchParams);
  params.set(newSearchParamKey, newSearchParamValue);
  return params.toString();
}
