"use client"

// The api.ts file is the front-end entrypoint to tRPC.

/**
 * This is the client-side entrypoint for your tRPC API. It is used to create the `api` object which
 * contains the Next.js App-wrapper, as well as your type-safe React Query hooks.
 *
 * We also create a few inference helpers for input and output types.
 */
import { type AppRouter } from "@/server/api/root"
import {
  createTRPCReact,
  type inferReactQueryProcedureOptions,
} from "@trpc/react-query"
import { type inferRouterInputs, type inferRouterOutputs } from "@trpc/server"

export const getBaseUrl = () => {
  if (typeof window !== "undefined") return "" // browser should use relative url
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}` // SSR should use vercel url
  return `http://localhost:${process.env.PORT ?? 3000}` // dev SSR should use localhost
}

/** A set of type-safe react-query hooks for your tRPC API. */

export const api = createTRPCReact<AppRouter>()

/**
 * Inference helper for inputs.
 *
 * @example type HelloInput = RouterInputs['example']['hello']
 */
export type RouterInputs = inferRouterInputs<AppRouter>

/**
 * Inference helper for outputs.
 *
 * @example type HelloOutput = RouterOutputs['example']['hello']
 */
export type RouterOutputs = inferRouterOutputs<AppRouter>

/**
 * Infer React Query options
 *
 * @example type ExampleHelloOptions = ReactQueryOptions['example']['hello']
 *
 * */
export type ReactQueryOptions = inferReactQueryProcedureOptions<AppRouter>
