import NextAuth from 'next-auth';
import KeycloakProvider from 'next-auth/providers/keycloak';

const handler = NextAuth({
  providers: [
    KeycloakProvider({
      clientId: process.env.KEYCLOAK_CLIENT_ID || 'spring-cloud-client',
      clientSecret: process.env.KEYCLOAK_CLIENT_SECRET || '',
      issuer: process.env.KEYCLOAK_ISSUER || 'http://localhost:8080/realms/spring-boot-microservices-realm',
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.accessToken = token.accessToken;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
});

export { handler as GET, handler as POST };
