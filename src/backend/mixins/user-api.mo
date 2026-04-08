import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import UserTypes "../types/user";
import UserLib "../lib/user";

mixin (
  accessControlState : AccessControl.AccessControlState,
  userProfiles : Map.Map<Principal, UserTypes.UserProfile>,
) {
  public query ({ caller }) func getCallerUserProfile() : async ?UserTypes.UserProfile {
    UserLib.getProfile(userProfiles, caller);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserTypes.UserProfile) : async () {
    UserLib.saveProfile(userProfiles, caller, profile);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserTypes.UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    UserLib.getProfile(userProfiles, user);
  };

  public shared ({ caller }) func addAddress(address : UserTypes.Address) : async Bool {
    UserLib.addAddress(userProfiles, caller, address);
  };

  public shared ({ caller }) func removeAddress(index : Nat) : async Bool {
    UserLib.removeAddress(userProfiles, caller, index);
  };
};
