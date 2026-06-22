import { useEffect, useState } from "react";
import { sanityClient } from "./client";

// Cache à deux niveaux, partagé entre toutes les pages :
//  1. mémoire (Map) : navigation aller-retour instantanée pendant la session ;
//  2. sessionStorage : survit à un rechargement complet de page (même onglet).
// Stratégie stale-while-revalidate : on affiche le cache immédiatement et on
// revalide en arrière-plan. Évite le spinner et un refetch à chaque visite.
const memory = new Map<string, unknown>();
const STORAGE_PREFIX = "sanity-cache:";

const keyOf = (query: string, params: Record<string, unknown>) =>
  `${query}|${JSON.stringify(params ?? {})}`;

function readCache(key: string): { hit: boolean; value: unknown } {
  if (memory.has(key)) return { hit: true, value: memory.get(key) };
  if (typeof window === "undefined") return { hit: false, value: undefined };
  try {
    const raw = window.sessionStorage.getItem(STORAGE_PREFIX + key);
    if (raw === null) return { hit: false, value: undefined };
    const value = JSON.parse(raw);
    memory.set(key, value); // réhydrate le cache mémoire
    return { hit: true, value };
  } catch {
    return { hit: false, value: undefined };
  }
}

function writeCache(key: string, value: unknown) {
  memory.set(key, value);
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
  } catch {
    // Quota dépassé ou stockage indisponible : on garde au moins le cache mémoire.
  }
}

/**
 * Retourne `undefined` pendant le premier chargement (sans cache), puis la
 * donnée résolue. En cas d'absence de client ou d'erreur réseau, retourne
 * `emptyValue`.
 */
export function useSanityQuery<T>(
  query: string,
  params: Record<string, unknown> = {},
  emptyValue: T
): T | undefined {
  const key = keyOf(query, params);
  const [data, setData] = useState<T | undefined>(() => {
    const { hit, value } = readCache(key);
    return hit ? (value as T) : undefined;
  });

  useEffect(() => {
    if (!sanityClient) {
      setData(emptyValue);
      return;
    }
    let mounted = true;
    // Affiche immédiatement le cache (ou le loader) à chaque changement de clé.
    const { hit, value } = readCache(key);
    setData(hit ? (value as T) : undefined);
    sanityClient
      .fetch<T>(query, params)
      .then((res) => {
        writeCache(key, res);
        if (mounted) setData(res);
      })
      .catch(() => {
        if (mounted && !readCache(key).hit) setData(emptyValue);
      });
    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return data;
}
