import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
    NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
    PORT: z.coerce.number().default(3333),
    BASE_URL_TMDB: z.string(),
    API_KEY_TMDB: z.string(),

})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
    console.error('❌ Invalid enviroments variables', _env.error.format())

    throw new Error('Invalid enviroments variables.')
}

export const env = _env.data