import List "mo:core/List";
import Runtime "mo:core/Runtime";
import BlogTypes "../types/blog";

module {
  public func createPost(
    _posts : List.List<BlogTypes.BlogPost>,
    _nextId : Nat,
    _input : BlogTypes.BlogInput,
    _now : Int,
  ) : BlogTypes.BlogPost {
    Runtime.trap("not implemented");
  };

  public func updatePost(
    _posts : List.List<BlogTypes.BlogPost>,
    _id : BlogTypes.BlogId,
    _input : BlogTypes.BlogInput,
    _now : Int,
  ) : ?BlogTypes.BlogPost {
    Runtime.trap("not implemented");
  };

  public func deletePost(
    _posts : List.List<BlogTypes.BlogPost>,
    _id : BlogTypes.BlogId,
  ) : Bool {
    Runtime.trap("not implemented");
  };

  public func getPost(
    _posts : List.List<BlogTypes.BlogPost>,
    _id : BlogTypes.BlogId,
  ) : ?BlogTypes.BlogPost {
    Runtime.trap("not implemented");
  };

  public func getPostBySlug(
    _posts : List.List<BlogTypes.BlogPost>,
    _slug : Text,
  ) : ?BlogTypes.BlogPost {
    Runtime.trap("not implemented");
  };

  public func listPosts(
    _posts : List.List<BlogTypes.BlogPost>,
    _statusFilter : ?BlogTypes.BlogStatus,
  ) : [BlogTypes.BlogPost] {
    Runtime.trap("not implemented");
  };
};
