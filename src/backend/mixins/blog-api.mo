import List "mo:core/List";
import Time "mo:core/Time";
import BlogTypes "../types/blog";
import BlogLib "../lib/blog";

mixin (
  adminSession : { var token : ?Text },
  blogPosts : List.List<BlogTypes.BlogPost>,
  nextBlogPostId : { var value : Nat },
) {
  private func verifyBlogAdminToken(token : Text) : Bool {
    switch (adminSession.token) {
      case (?t) { t == token };
      case null { false };
    };
  };

  public query func listBlogPosts() : async [BlogTypes.BlogPost] {
    BlogLib.listPosts(blogPosts, ?#published);
  };

  public query func getBlogPost(id : BlogTypes.BlogId) : async ?BlogTypes.BlogPost {
    BlogLib.getPost(blogPosts, id);
  };

  public query func getBlogPostBySlug(slug : Text) : async ?BlogTypes.BlogPost {
    BlogLib.getPostBySlug(blogPosts, slug);
  };

  public func adminCreateBlogPost(token : Text, input : BlogTypes.BlogInput) : async { #ok : BlogTypes.BlogPost; #err : Text } {
    if (not verifyBlogAdminToken(token)) {
      return #err("Unauthorized: Invalid or expired admin session");
    };
    let id = nextBlogPostId.value;
    nextBlogPostId.value += 1;
    #ok(BlogLib.createPost(blogPosts, id, input, Time.now()))
  };

  public func adminUpdateBlogPost(token : Text, id : BlogTypes.BlogId, input : BlogTypes.BlogInput) : async { #ok : ?BlogTypes.BlogPost; #err : Text } {
    if (not verifyBlogAdminToken(token)) {
      return #err("Unauthorized: Invalid or expired admin session");
    };
    #ok(BlogLib.updatePost(blogPosts, id, input, Time.now()))
  };

  public func adminDeleteBlogPost(token : Text, id : BlogTypes.BlogId) : async { #ok : Bool; #err : Text } {
    if (not verifyBlogAdminToken(token)) {
      return #err("Unauthorized: Invalid or expired admin session");
    };
    #ok(BlogLib.deletePost(blogPosts, id))
  };

  public func adminListAllBlogPosts(token : Text) : async { #ok : [BlogTypes.BlogPost]; #err : Text } {
    if (not verifyBlogAdminToken(token)) {
      return #err("Unauthorized: Invalid or expired admin session");
    };
    #ok(BlogLib.listPosts(blogPosts, null))
  };
};
