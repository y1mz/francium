function generateUUID(length, noDash) {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';

    for (let i = 0; i < length; i++) {
        if (!noDash) {
          if (i != 0 && i % 5 === 0) {
              randomString += "-"
          }
        }
        randomString += characters.charAt(Math.floor(Math.random() * characters.length))
    }

    return randomString.toUpperCase();
}

export { generateUUID }
