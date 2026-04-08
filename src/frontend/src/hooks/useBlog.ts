import { BlogStatus as BackendBlogStatus, createActor } from "@/backend";
import type {
  BlogInput as BackendBlogInput,
  BlogPost as BackendBlogPost,
} from "@/backend";
import type { BlogInput, BlogPost } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
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
    coverImage: post.coverImage ? post.coverImage.getDirectURL() : undefined,
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
    coverImage: input.coverImage ? undefined : undefined, // URL-based images handled separately
  };
}

// ─── Public hooks ─────────────────────────────────────────────────────────────

export function useListBlogPosts() {
  const { actor, isFetching } = useActor(createActor);
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
  const { actor, isFetching } = useActor(createActor);
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
  const { actor, isFetching } = useActor(createActor);
  return useQuery<BlogPost[]>({
    queryKey: ["admin", "blog"],
    queryFn: async () => {
      if (!actor) return [];
      const posts = await actor.adminListAllBlogPosts();
      return posts.map(mapBlogPost);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAdminCreateBlogPost() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: BlogInput) => {
      if (!actor) throw new Error("Actor not ready");
      const post = await actor.adminCreateBlogPost(toBlogInput(input));
      return mapBlogPost(post);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blog"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "blog"] });
    },
  });
}

export function useAdminUpdateBlogPost() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, input }: { id: bigint; input: BlogInput }) => {
      if (!actor) throw new Error("Actor not ready");
      const post = await actor.adminUpdateBlogPost(id, toBlogInput(input));
      return post ? mapBlogPost(post) : null;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blog"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "blog"] });
    },
  });
}

export function useAdminDeleteBlogPost() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.adminDeleteBlogPost(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blog"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "blog"] });
    },
  });
}
