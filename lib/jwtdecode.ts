import jwtDecode from 'jsonwebtoken';

/**
 * Interface for the payload structure of the JWT token.
 */
interface JwtPayload {
  email: string;
  firstName: string;
  userID: string; // The userID field from the payload
}

/**
 * Interface for the decoded token structure.
 */
interface DecodedToken {
  userId: string | null;
  firstname: string | null;
  useremail: string | null;
}


export const decodeToken = (token: string): DecodedToken | null => {
  try {
    const decoded = jwtDecode.decode(token) as JwtPayload | null;

    const userId = decoded?.userID || null;
    const firstname = decoded?.firstName || null;
    const useremail = decoded?.email || null;


    // Return the user details as an object
    return { userId, firstname, useremail };
  } catch (error) {
    console.error('Invalid token:', error);
    return null;
  }
};
