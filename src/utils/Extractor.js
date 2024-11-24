import { jwtDecode } from 'jwt-decode';

class Extractor {
  /**
   * Decodes a JWT token.
   * @param {string} token - The JWT token to decode.
   * @returns {Object} The decoded token payload.
   * @throws Will throw an error if the token is invalid or undefined.
   */
  static decodeToken(token) {
    if (!token) {
      throw new Error('Token is required for decoding.');
    }
    try {
      return jwtDecode(token);
    } catch (error) {
      console.error('[TokenUtils] Failed to decode token:', error);
      throw new Error('Invalid token.');
    }
  }

  /**
   * Extracts the user ID from the token.
   * @param {string} token - The JWT token.
   * @returns {string|null} The extracted user ID or null if not found.
   */
  static extractId(token) {
    if (token) {
        const decodedToken = this.decodeToken(token);
        return decodedToken.userId
    }
    return null;
  }

  /**
   * Extracts roles from the token.
   * @param {string} token - The JWT token.
   * @returns {Array<string>} The extracted roles or an empty array if not found.
   */
  static extractRoles(token) {
    const decodedToken = this.decodeToken(token);
    return decodedToken.roles || [];
  }

  /**
   * Extracts a specific claim from the token.
   * @param {string} token - The JWT token.
   * @param {string} claim - The claim key to extract.
   * @returns {*} The value of the claim or undefined if not found.
   */
  static extractClaim(token, claim) {
    const decodedToken = this.decodeToken(token);
    return decodedToken[claim];
  }
}

export default Extractor;
