/// <reference types="astro/client" />

interface UserContext {
  uid: string;
  email: string;
  name: string;
  photoUrl: string;
  role: string;
}

declare namespace App {
  interface Locals {
    user: UserContext | null;
    runtime: any;
  }
}
