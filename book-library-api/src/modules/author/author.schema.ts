import { z } from 'zod';

export const createAuthorSchema = z.object({
  name: z.string().min(1, 'Name is required'),
});

export type CreateAuthorInput = z.infer<typeof createAuthorSchema>;