import md5 from 'blueimp-md5';

export const generateAvatarUrl = (string) => {
  const hash = md5(string);
  return `http://www.gravatar.com/avatar/${hash}?d=retro`;
}
