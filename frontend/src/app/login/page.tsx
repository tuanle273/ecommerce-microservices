'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { signIn } from 'next-auth/react';

export default function LoginPage() {
  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-10rem)]">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
          <CardDescription>
            Sign in to your account to continue
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-600 mb-4">
            Click the button below to sign in with Keycloak
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button onClick={() => signIn('keycloak', { callbackUrl: '/' })}>
            Sign In with Keycloak
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
