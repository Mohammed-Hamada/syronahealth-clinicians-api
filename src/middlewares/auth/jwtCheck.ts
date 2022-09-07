import { expressjwt, GetVerificationKey } from 'express-jwt';
import jwks from 'jwks-rsa';
import { authVars } from '../../config';

const jwtCheck = expressjwt({
  secret: jwks.expressJwtSecret({
    cache: false,
    rateLimit: true,
    jwksUri: authVars.JWKS_URI,
  }) as GetVerificationKey,
  algorithms: ['RS256'],
  issuer: authVars.ISSUER,
  audience: 'http://localhost:4000',
});

export default jwtCheck;
