'use client';

import { signIn } from 'next-auth/react';

export default function SignInLink() {
  return (
    <button onClick={() => signIn('google')}>
      Login with google
    </button>
  );
}
