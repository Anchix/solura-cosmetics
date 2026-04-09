import List "mo:core/List";
import BlogTypes "../types/blog";

module {
  public func createPost(
    posts : List.List<BlogTypes.BlogPost>,
    nextId : Nat,
    input : BlogTypes.BlogInput,
    now : Int,
  ) : BlogTypes.BlogPost {
    let post : BlogTypes.BlogPost = {
      id = nextId;
      title = input.title;
      content = input.content;
      excerpt = input.excerpt;
      author = input.author;
      category = input.category;
      coverImage = input.coverImage;
      status = input.status;
      slug = input.slug;
      createdAt = now;
      updatedAt = now;
    };
    posts.add(post);
    post
  };

  public func updatePost(
    posts : List.List<BlogTypes.BlogPost>,
    id : BlogTypes.BlogId,
    input : BlogTypes.BlogInput,
    now : Int,
  ) : ?BlogTypes.BlogPost {
    let existing = posts.find(func(p) { p.id == id });
    switch (existing) {
      case null { null };
      case (?_) {
        var updated : ?BlogTypes.BlogPost = null;
        posts.mapInPlace(func(p) {
          if (p.id == id) {
            let u : BlogTypes.BlogPost = {
              p with
              title = input.title;
              content = input.content;
              excerpt = input.excerpt;
              author = input.author;
              category = input.category;
              coverImage = input.coverImage;
              status = input.status;
              slug = input.slug;
              updatedAt = now;
            };
            updated := ?u;
            u
          } else { p }
        });
        updated
      };
    };
  };

  public func deletePost(
    posts : List.List<BlogTypes.BlogPost>,
    id : BlogTypes.BlogId,
  ) : Bool {
    let existing = posts.find(func(p) { p.id == id });
    switch (existing) {
      case null { false };
      case (?_) {
        let filtered = posts.filter(func(p) { p.id != id });
        posts.clear();
        posts.append(filtered);
        true
      };
    };
  };

  public func getPost(
    posts : List.List<BlogTypes.BlogPost>,
    id : BlogTypes.BlogId,
  ) : ?BlogTypes.BlogPost {
    posts.find(func(p) { p.id == id });
  };

  public func getPostBySlug(
    posts : List.List<BlogTypes.BlogPost>,
    slug : Text,
  ) : ?BlogTypes.BlogPost {
    posts.find(func(p) { p.slug == slug });
  };

  public func listPosts(
    posts : List.List<BlogTypes.BlogPost>,
    statusFilter : ?BlogTypes.BlogStatus,
  ) : [BlogTypes.BlogPost] {
    switch (statusFilter) {
      case null { posts.toArray() };
      case (?s) {
        posts.filter(func(p) { p.status == s }).toArray()
      };
    };
  };
};
