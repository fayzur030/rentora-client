import { betterAuth } from 'better-auth'
import { mongodbAdapter } from '@better-auth/mongo-adapter'
import { jwt } from 'better-auth/plugins'

import { client, clientPromise, db } from '@/lib/mongodb'

// Ensure MongoDB connection is established
await clientPromise

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },

  user: {
    additionalFields: {
      role: {
        type: ['customer', 'owner', 'admin'],
        required: true,
        defaultValue: 'customer',
        input: false,
      },
    },
  },

  plugins: [jwt()],

  session: {
    cookieCache: {
      enabled: true,
      strategy: 'jwt',
      maxAge: 7 * 24 * 60 * 60,
    },
  },

  database: mongodbAdapter(db, {
    client,
  }),
})
