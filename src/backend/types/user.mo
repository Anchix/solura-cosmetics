module {
  public type Address = {
    tag : Text;
    line1 : Text;
    line2 : Text;
    city : Text;
    state : Text;
    pincode : Text;
  };

  public type UserProfile = {
    name : Text;
    email : Text;
    phone : Text;
    addresses : [Address];
  };
};
