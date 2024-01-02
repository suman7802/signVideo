export default function otpExpireDuration() {
  const expirationTime = new Date();
  expirationTime.setMinutes(expirationTime.getMinutes() + 60 * 3); // 3 minutes
  return expirationTime;
}
