import { FastifyInstance } from 'fastify'
import { jwtVerify } from '@/http/middlewares/verify-jwt'

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', jwtVerify)
}
