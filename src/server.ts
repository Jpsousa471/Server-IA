import { fastifyCors } from '@fastify/cors';
import fastifyMultipart from '@fastify/multipart';
import { fastify } from 'fastify';
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod';
import { createQuestionRoute } from './db/http/routes/create-question.ts';
import { createRoomRoute } from './db/http/routes/create-rooms.ts';
import { getRoomsQuestions } from './db/http/routes/get-room-questions.ts';
import { getRoomsRoute } from './db/http/routes/get-rooms.ts';
import { uploadAudioRoute } from './db/http/routes/upload-audio.ts';
import { env } from './env.ts';

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors, {
  origin: '*',
});

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.get('/health', () => {
  return 'OK AAAAAAAAAA';
});

app.register(fastifyMultipart);

app.register(getRoomsRoute);
app.register(createRoomRoute);
app.register(getRoomsQuestions);
app.register(createQuestionRoute);
app.register(uploadAudioRoute);

app.listen({ port: env.PORT });
