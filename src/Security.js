function gcd(a, b) {
    while (b !== 0) {
      let temp = b;
      b = a % b;
      a = temp;
    }
    return a;
  }
  
  function extendedGCD(a, b) {
    if (a === 0) {
      return { gcd: b, x: 0, y: 1 };
    }
  
    const { gcd, x: x1, y: y1 } = extendedGCD(b % a, a);
    const x = y1 - Math.floor(b / a) * x1;
    const y = x1;
  
    return { gcd, x, y };
  }
  
  function modInverse(a, m) {
    const { x } = extendedGCD(a, m);
    return (x % m + m) % m;
  }
  
  function generateRSAKeys(p, q) {
    const N = p * q;
    const phi_N = (p - 1) * (q - 1);
  
    // Elegir un entero e coprimo con phi_N
    const e = 65537; // El valor comúnmente utilizado
  
    // Calcular el inverso multiplicativo de e módulo phi_N
    const d = modInverse(e, phi_N);
  
    return { publicKey: { e, N }, privateKey: { d, N } };
  }
  
  function encryptMessage(publicKey, message) {
    const { e, N } = publicKey;
    const messageString = String(message);
    const ciphertext = Array.from(messageString).map((char) => {
      const charCode = BigInt(char.charCodeAt(0));
      const encryptedCharCode = charCode ** BigInt(e) % BigInt(N);
      return encryptedCharCode.toString();
    });
    return ciphertext;
  }
  
  function modPow(base, exponent, modulus) {
    let result = 1;
    base = base % modulus;
  
    while (exponent > 0) {
      if (exponent % 2 === 1) {
        result = (result * base) % modulus;
      }
      exponent = exponent >> 1;
      base = (base * base) % modulus;
    }
  
    return result;
  }

  function decryptMessage(privateKey, ciphertext) {
    const { d, N } = privateKey;
    let ciphertextArray;
  
    if (typeof ciphertext === 'string') {
      ciphertextArray = ciphertext.split(',').map(Number); // Convertir cada elemento a Number
    } else {
      ciphertextArray = ciphertext.map(Number); // Asegurar que todos los elementos ya sean Number
    }
  
    const plaintext = ciphertextArray
      .map((char) => String.fromCharCode(modPow(char, d, N)))
      .join("");
    return plaintext;
  }
  
  
  

    module.exports = {  
        gcd,
        extendedGCD,
        modInverse,
        generateRSAKeys,
        encryptMessage,
        decryptMessage,
        modPow
    }
  