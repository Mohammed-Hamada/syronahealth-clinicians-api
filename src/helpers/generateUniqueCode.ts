const generateUniqueCode = (length: number): Promise<string> => new Promise((resolve) => {
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let code = '';

  for (let i = 0; i < length; i += 1) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  resolve(code);
});

export default generateUniqueCode;
