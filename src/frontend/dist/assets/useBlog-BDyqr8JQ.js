import { h as useSharedActor, k as useQuery, l as useQueryClient, B as BlogStatus } from "./index-DBS95maA.js";
import { u as useAuthStore } from "./sheet-Bi-Q7ojW.js";
import { u as useMutation } from "./useMutation-C725G2l4.js";
function mapBlogPost(post) {
  return {
    id: post.id,
    title: post.title,
    content: post.content,
    excerpt: post.excerpt,
    author: post.author,
    category: post.category,
    coverImage: post.coverImage ?? void 0,
    status: post.status === BlogStatus.published ? "published" : "draft",
    createdAt: post.createdAt,
    updatedAt: post.updatedAt,
    slug: post.slug
  };
}
function toBlogInput(input) {
  return {
    title: input.title,
    content: input.content,
    excerpt: input.excerpt,
    author: input.author,
    category: input.category,
    status: input.status === "published" ? BlogStatus.published : BlogStatus.draft,
    slug: input.slug,
    coverImage: input.coverImage ?? void 0
  };
}
function useListBlogPosts() {
  const { actor, isFetching } = useSharedActor();
  return useQuery({
    queryKey: ["blog", "published"],
    queryFn: async () => {
      if (!actor) return [];
      const posts = await actor.listBlogPosts();
      return posts.map(mapBlogPost);
    },
    enabled: !!actor && !isFetching
  });
}
function useGetBlogPost(id) {
  const { actor, isFetching } = useSharedActor();
  return useQuery({
    queryKey: ["blog", "post", id.toString()],
    queryFn: async () => {
      if (!actor) return null;
      const post = await actor.getBlogPost(id);
      return post ? mapBlogPost(post) : null;
    },
    enabled: !!actor && !isFetching && id > 0n
  });
}
function useAdminListAllBlogPosts() {
  const { actor, isFetching } = useSharedActor();
  const { adminToken } = useAuthStore();
  return useQuery({
    queryKey: ["admin", "blog"],
    queryFn: async () => {
      if (!actor || !adminToken) return [];
      const result = await actor.adminListAllBlogPosts(adminToken);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok.map(mapBlogPost);
    },
    enabled: !!actor && !isFetching && !!adminToken
  });
}
function useAdminCreateBlogPost() {
  const { actor } = useSharedActor();
  const { adminToken } = useAuthStore();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input) => {
      if (!actor) throw new Error("Actor not ready");
      if (!adminToken)
        throw new Error("Not authenticated as admin. Please log in again.");
      const result = await actor.adminCreateBlogPost(
        adminToken,
        toBlogInput(input)
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
    }
  });
}
function useAdminUpdateBlogPost() {
  const { actor } = useSharedActor();
  const { adminToken } = useAuthStore();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, input }) => {
      if (!actor) throw new Error("Actor not ready");
      if (!adminToken)
        throw new Error("Not authenticated as admin. Please log in again.");
      const result = await actor.adminUpdateBlogPost(
        adminToken,
        id,
        toBlogInput(input)
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
    }
  });
}
function useAdminDeleteBlogPost() {
  const { actor } = useSharedActor();
  const { adminToken } = useAuthStore();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
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
    }
  });
}
export {
  useAdminCreateBlogPost as a,
  useAdminUpdateBlogPost as b,
  useAdminDeleteBlogPost as c,
  useListBlogPosts as d,
  useGetBlogPost as e,
  useAdminListAllBlogPosts as u
};
