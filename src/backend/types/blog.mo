import Storage "mo:caffeineai-object-storage/Storage";

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
    coverImage : ?Storage.ExternalBlob;
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
    coverImage : ?Storage.ExternalBlob;
    status : BlogStatus;
    slug : Text;
  };
};
