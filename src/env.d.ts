/// <reference types="astro/client" />

declare namespace App {
  interface Locals {
    user: import("@/types").UserContext | null;
    runtime: any;
  }
}
