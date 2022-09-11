import { expressjwt, GetVerificationKey } from 'express-jwt';
import jwks from 'jwks-rsa';
import { authVars } from '../../config';

const jwtCheck = expressjwt({
  secret: jwks.expressJwtSecret({
    cache: false,
    rateLimit: true,
    jwksUri: `https://${authVars.AUTH0_DOMAIN}/.well-known/jwks.json`,
  }) as GetVerificationKey,
  algorithms: ['RS256'],
  issuer: `https://${authVars.AUTH0_DOMAIN}/`,
  audience: authVars.AUTH0_AUDIENCE,
});

export default jwtCheck;
