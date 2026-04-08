import { c as createLucideIcon } from "./authStore-bVvk2SIb.js";
import { u as useActor, B as BlogStatus, c as createActor } from "./backend-C0WYxHKI.js";
import { h as useQueryClient } from "./index-BYwbnXHo.js";
import { u as useQuery, a as useMutation } from "./useMutation-ybpFZUfc.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }]
];
const Calendar = createLucideIcon("calendar", __iconNode);
function mapBlogPost(post) {
  return {
    id: post.id,
    title: post.title,
    content: post.content,
    excerpt: post.excerpt,
    author: post.author,
    category: post.category,
    coverImage: post.coverImage ? post.coverImage.getDirectURL() : void 0,
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
    coverImage: input.coverImage ? void 0 : void 0
    // URL-based images handled separately
  };
}
function useListBlogPosts() {
  const { actor, isFetching } = useActor(createActor);
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
  const { actor, isFetching } = useActor(createActor);
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
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["admin", "blog"],
    queryFn: async () => {
      if (!actor) return [];
      const posts = await actor.adminListAllBlogPosts();
      return posts.map(mapBlogPost);
    },
    enabled: !!actor && !isFetching
  });
}
function useAdminCreateBlogPost() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input) => {
      if (!actor) throw new Error("Actor not ready");
      const post = await actor.adminCreateBlogPost(toBlogInput(input));
      return mapBlogPost(post);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blog"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "blog"] });
    }
  });
}
function useAdminUpdateBlogPost() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, input }) => {
      if (!actor) throw new Error("Actor not ready");
      const post = await actor.adminUpdateBlogPost(id, toBlogInput(input));
      return post ? mapBlogPost(post) : null;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blog"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "blog"] });
    }
  });
}
function useAdminDeleteBlogPost() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.adminDeleteBlogPost(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blog"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "blog"] });
    }
  });
}
export {
  Calendar as C,
  useAdminCreateBlogPost as a,
  useAdminUpdateBlogPost as b,
  useAdminDeleteBlogPost as c,
  useListBlogPosts as d,
  useGetBlogPost as e,
  useAdminListAllBlogPosts as u
};
