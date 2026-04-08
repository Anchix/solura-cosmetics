import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import AccessControl "mo:caffeineai-authorization/access-control";
import BlogTypes "../types/blog";
import BlogLib "../lib/blog";

mixin (
  accessControlState : AccessControl.AccessControlState,
  blogPosts : List.List<BlogTypes.BlogPost>,
  nextBlogPostId : { var value : Nat },
) {
  public query func listBlogPosts() : async [BlogTypes.BlogPost] {
    Runtime.trap("not implemented");
  };

  public query func getBlogPost(id : BlogTypes.BlogId) : async ?BlogTypes.BlogPost {
    Runtime.trap("not implemented");
  };

  public query func getBlogPostBySlug(slug : Text) : async ?BlogTypes.BlogPost {
    Runtime.trap("not implemented");
  };

  public shared ({ caller }) func adminCreateBlogPost(input : BlogTypes.BlogInput) : async BlogTypes.BlogPost {
    Runtime.trap("not implemented");
  };

  public shared ({ caller }) func adminUpdateBlogPost(id : BlogTypes.BlogId, input : BlogTypes.BlogInput) : async ?BlogTypes.BlogPost {
    Runtime.trap("not implemented");
  };

  public shared ({ caller }) func adminDeleteBlogPost(id : BlogTypes.BlogId) : async Bool {
    Runtime.trap("not implemented");
  };

  public shared ({ caller }) func adminListAllBlogPosts() : async [BlogTypes.BlogPost] {
    Runtime.trap("not implemented");
  };
};
