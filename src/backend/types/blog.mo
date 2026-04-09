module {
  public type BlogId = Nat;

  public type BlogStatus = {
    #draft;
    #published;
  };

  public type BlogPost = {
    id : BlogId;
    title : Text;
    content : Text;
    excerpt : Text;
    author : Text;
    category : Text;
    coverImage : ?Text;
    status : BlogStatus;
    createdAt : Int;
    updatedAt : Int;
    slug : Text;
  };

  public type BlogInput = {
    title : Text;
    content : Text;
    excerpt : Text;
    author : Text;
    category : Text;
    coverImage : ?Text;
    status : BlogStatus;
    slug : Text;
  };
};
