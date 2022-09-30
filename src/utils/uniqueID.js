export function uniqueID() {
  const now = new Date().getTime();
  const nowToString = now.toString(26);
  const random = () => Math.random().toString(11).slice(3);
  const firstRandomNumber = random();

  const hash = `${nowToString}-${firstRandomNumber}`;

  return hash;
}
