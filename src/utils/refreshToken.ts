export const handleTokenExpired = (exp:any, callback:any) => {
  let expiredTimer;
  window.clearTimeout(expiredTimer);
  const currentTime = Date.now();
  const timeLeft = exp - currentTime;
  expiredTimer = window.setTimeout(callback, timeLeft);
};
