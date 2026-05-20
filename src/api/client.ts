/**
 * Typed API client for EdGro Tech backend.
 * All requests go through this module — never fetch() directly in components.
 */

const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8080";

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

async function request<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const url = `${BASE_URL}/api/v1${path}`;
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  const json = await res.json().catch(() => null);

  if (!res.ok) {
    const message = json?.message ?? `Request failed (${res.status})`;
    throw new ApiError(res.status, message);
  }

  return json as T;
}

// ── Envelope type ─────────────────────────────────────────────
interface ApiEnvelope<T> {
  success: boolean;
  message?: string;
  data: T;
}

async function get<T>(path: string): Promise<T> {
  const envelope = await request<ApiEnvelope<T>>(path);
  return envelope.data;
}

async function post<TBody, TResponse>(
  path: string,
  body: TBody,
): Promise<ApiEnvelope<TResponse>> {
  return request<ApiEnvelope<TResponse>>(path, {
    method: "POST",
    body: JSON.stringify(body),
  });
}

// ── Universities ──────────────────────────────────────────────
export interface UniversityDto {
  id: number;
  slug: string;
  name: string;
  shortName: string;
  city: string;
  naacGrade: string;
  hue: number;
  primaryImage: string;
  heroImage: string;
  thumbnailImage: string;
  logo?: string;
  established: number;
  programs: number;
  feesMin: number;
  feesMax: number;
  feesRange: string;
  placement: string;
  alumni: string;
  tag?: "Recommended" | "Premium" | "Popular" | "BestROI";
  highlights: string[];
}

export interface UniversityFilters {
  cities: string[];
  naacGrades: string[];
}

export const universitiesApi = {
  list: (params?: { search?: string; naac?: string }) => {
    const qs = new URLSearchParams();
    if (params?.search) qs.set("search", params.search);
    if (params?.naac) qs.set("naac", params.naac);
    const query = qs.toString();
    return get<UniversityDto[]>(`/universities${query ? `?${query}` : ""}`);
  },
  get: (slug: string) => get<UniversityDto>(`/universities/${slug}`),
  filters: () => get<UniversityFilters>("/universities/filters"),
};

// ── Programs ──────────────────────────────────────────────────
export interface ProgramDto {
  id: number;
  slug: string;
  name: string;
  category: "Undergraduate" | "Postgraduate" | "Certification";
  tag: string;
  description: string;
  feesMin: number;
  feesMax: number;
  feesRange: string;
  duration: string;
  universityCount: number;
  eligibility: string;
  outcomes: string[];
  specializations: string[];
}

export const programsApi = {
  list: (params?: { search?: string; category?: string }) => {
    const qs = new URLSearchParams();
    if (params?.search) qs.set("search", params.search);
    if (params?.category) qs.set("category", params.category);
    const query = qs.toString();
    return get<ProgramDto[]>(`/programs${query ? `?${query}` : ""}`);
  },
  get: (slug: string) => get<ProgramDto>(`/programs/${slug}`),
};

// ── Testimonials ──────────────────────────────────────────────
export interface TestimonialDto {
  id: number;
  name: string;
  role: string;
  university: string;
  program: string;
  content: string;
  rating: number;
  avatarUrl?: string;
}

export const testimonialsApi = {
  list: () => get<TestimonialDto[]>("/testimonials"),
};

// ── Lead submission ───────────────────────────────────────────
export interface LeadRequest {
  name: string;
  phone: string;
  courseInterest?: string;
  email?: string;
  city?: string;
  state?: string;
  preferredUniversity?: string;
  source?: string;
}

export const leadsApi = {
  submit: (data: LeadRequest) =>
    post<LeadRequest, null>("/leads", { ...data, source: "website" }),
};

// ── Contact form ──────────────────────────────────────────────
export interface ContactRequest {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}

export const contactApi = {
  submit: (data: ContactRequest) => post<ContactRequest, null>("/contact", data),
};
