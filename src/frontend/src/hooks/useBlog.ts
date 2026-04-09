import { BlogStatus as BackendBlogStatus } from "@/backend";
import type {
  BlogInput as BackendBlogInput,
  BlogPost as BackendBlogPost,
} from "@/backend";
import { useSharedActor } from "@/context/ActorContext";
import { useAuthStore } from "@/store/authStore";
import type { BlogInput, BlogPost } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// ─── Data mapping ─────────────────────────────────────────────────────────────

function mapBlogPost(post: BackendBlogPost): BlogPost {
  return {
    id: post.id,
    title: post.title,
    content: post.content,
    excerpt: post.excerpt,
    author: post.author,
    category: post.category,
    coverImage: post.coverImage ?? undefined,
    status: post.status === BackendBlogStatus.published ? "published" : "draft",
    createdAt: post.createdAt,
    updatedAt: post.updatedAt,
    slug: post.slug,
  };
}

function toBlogInput(input: BlogInput): BackendBlogInput {
  return {
    title: input.title,
    content: input.content,
    excerpt: input.excerpt,
    author: input.author,
    category: input.category,
    status:
      input.status === "published"
        ? BackendBlogStatus.published
        : BackendBlogStatus.draft,
    slug: input.slug,
    coverImage: input.coverImage ?? undefined,
  };
}

// ─── Public hooks ─────────────────────────────────────────────────────────────

export function useListBlogPosts() {
  const { actor, isFetching } = useSharedActor();
  return useQuery<BlogPost[]>({
    queryKey: ["blog", "published"],
    queryFn: async () => {
      if (!actor) return [];
      const posts = await actor.listBlogPosts();
      return posts.map(mapBlogPost);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetBlogPost(id: bigint) {
  const { actor, isFetching } = useSharedActor();
  return useQuery<BlogPost | null>({
    queryKey: ["blog", "post", id.toString()],
    queryFn: async () => {
      if (!actor) return null;
      const post = await actor.getBlogPost(id);
      return post ? mapBlogPost(post) : null;
    },
    enabled: !!actor && !isFetching && id > 0n,
  });
}

// ─── Admin hooks ──────────────────────────────────────────────────────────────

export function useAdminListAllBlogPosts() {
  const { actor, isFetching } = useSharedActor();
  const { adminToken } = useAuthStore();
  return useQuery<BlogPost[]>({
    queryKey: ["admin", "blog"],
    queryFn: async () => {
      if (!actor || !adminToken) return [];
      const result = await actor.adminListAllBlogPosts(adminToken);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok.map(mapBlogPost);
    },
    enabled: !!actor && !isFetching && !!adminToken,
  });
}

export function useAdminCreateBlogPost() {
  const { actor } = useSharedActor();
  const { adminToken } = useAuthStore();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: BlogInput) => {
      if (!actor) throw new Error("Actor not ready");
      if (!adminToken)
        throw new Error("Not authenticated as admin. Please log in again.");
      const result = await actor.adminCreateBlogPost(
        adminToken,
        toBlogInput(input),
      );
      if (result.__kind__ === "err") throw new Error(result.err);
      return mapBlogPost(result.ok);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blog"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "blog"] });
    },
    onError: (err) => {
      console.error("Create blog post failed:", err);
    },
  });
}

export function useAdminUpdateBlogPost() {
  const { actor } = useSharedActor();
  const { adminToken } = useAuthStore();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, input }: { id: bigint; input: BlogInput }) => {
      if (!actor) throw new Error("Actor not ready");
      if (!adminToken)
        throw new Error("Not authenticated as admin. Please log in again.");
      const result = await actor.adminUpdateBlogPost(
        adminToken,
        id,
        toBlogInput(input),
      );
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok ? mapBlogPost(result.ok) : null;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blog"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "blog"] });
    },
    onError: (err) => {
      console.error("Update blog post failed:", err);
    },
  });
}

export function useAdminDeleteBlogPost() {
  const { actor } = useSharedActor();
  const { adminToken } = useAuthStore();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Actor not ready");
      if (!adminToken)
        throw new Error("Not authenticated as admin. Please log in again.");
      const result = await actor.adminDeleteBlogPost(adminToken, id);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blog"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "blog"] });
    },
    onError: (err) => {
      console.error("Delete blog post failed:", err);
    },
  });
}
