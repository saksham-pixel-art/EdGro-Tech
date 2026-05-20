/**
 * React Query hooks for all API data.
 * Components import from here — never call the API client directly.
 */

import { useQuery } from "@tanstack/react-query";
import {
  universitiesApi,
  programsApi,
  testimonialsApi,
  type UniversityDto,
} from "./client";

// ── Query keys ────────────────────────────────────────────────
export const queryKeys = {
  universities: {
    all: ["universities"] as const,
    list: (params?: { search?: string; naac?: string }) =>
      ["universities", "list", params] as const,
    detail: (slug: string) => ["universities", "detail", slug] as const,
    filters: ["universities", "filters"] as const,
  },
  programs: {
    all: ["programs"] as const,
    list: (params?: { search?: string; category?: string }) =>
      ["programs", "list", params] as const,
    detail: (slug: string) => ["programs", "detail", slug] as const,
  },
  testimonials: {
    all: ["testimonials"] as const,
  },
};

// ── Universities ──────────────────────────────────────────────
export function useUniversities(params?: { search?: string; naac?: string }) {
  return useQuery({
    queryKey: queryKeys.universities.list(params),
    queryFn: () => universitiesApi.list(params),
    staleTime: 5 * 60 * 1000, // 5 min
  });
}

export function useUniversity(slug: string) {
  return useQuery({
    queryKey: queryKeys.universities.detail(slug),
    queryFn: () => universitiesApi.get(slug),
    staleTime: 5 * 60 * 1000,
    enabled: !!slug,
  });
}

export function useUniversityFilters() {
  return useQuery({
    queryKey: queryKeys.universities.filters,
    queryFn: () => universitiesApi.filters(),
    staleTime: 10 * 60 * 1000,
  });
}

// ── Programs ──────────────────────────────────────────────────
export function usePrograms(params?: { search?: string; category?: string }) {
  return useQuery({
    queryKey: queryKeys.programs.list(params),
    queryFn: () => programsApi.list(params),
    staleTime: 5 * 60 * 1000,
  });
}

export function useProgram(slug: string) {
  return useQuery({
    queryKey: queryKeys.programs.detail(slug),
    queryFn: () => programsApi.get(slug),
    staleTime: 5 * 60 * 1000,
    enabled: !!slug,
  });
}

// ── Testimonials ──────────────────────────────────────────────
export function useTestimonials() {
  return useQuery({
    queryKey: queryKeys.testimonials.all,
    queryFn: () => testimonialsApi.list(),
    staleTime: 10 * 60 * 1000,
  });
}

// ── Helpers ───────────────────────────────────────────────────

/** Map backend UniversityDto to the shape the Compare page expects */
export function toUniversityCompareShape(u: UniversityDto) {
  return {
    slug: u.slug,
    name: u.name,
    short: u.shortName,
    city: u.city,
    naac: u.naacGrade,
    hue: u.hue,
    image: u.primaryImage,
    established: u.established,
    programs: u.programs,
    feesRange: u.feesRange,
    placement: u.placement,
    alumni: u.alumni,
    highlights: u.highlights,
    tag: u.tag,
  };
}
