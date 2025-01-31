import jwt from 'jsonwebtoken';
import { logger } from '../config/logger';

const JWT_SECRET = process.env.JWT_SECRET || 'your-default-secret-key'; 
const JWT_EXPIRES_IN =  '24h';

export function signToken(userId: string, email: string, name: string): string {
    try {
        const token = jwt.sign(
            {
                userId,
                email,
                name
            },
            JWT_SECRET,
            {
                expiresIn: JWT_EXPIRES_IN
            }
        );
        return token;
    } catch (error) {
        logger.error('Error generating JWT token:', error);
        throw new Error('Failed to generate authentication token');
    }
}

export function verifyToken(token: string): jwt.JwtPayload {
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        return decoded as jwt.JwtPayload;
    } catch (error) {
        logger.error('Error verifying JWT token:', error);
        throw new Error('Invalid or expired token');
    }
}