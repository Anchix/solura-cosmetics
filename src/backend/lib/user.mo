import Map "mo:core/Map";
import Array "mo:core/Array";
import UserTypes "../types/user";

module {
  public func getProfile(
    profiles : Map.Map<Principal, UserTypes.UserProfile>,
    userId : Principal,
  ) : ?UserTypes.UserProfile {
    profiles.get(userId);
  };

  public func saveProfile(
    profiles : Map.Map<Principal, UserTypes.UserProfile>,
    userId : Principal,
    profile : UserTypes.UserProfile,
  ) : () {
    profiles.add(userId, profile);
  };

  public func addAddress(
    profiles : Map.Map<Principal, UserTypes.UserProfile>,
    userId : Principal,
    address : UserTypes.Address,
  ) : Bool {
    switch (profiles.get(userId)) {
      case null { false };
      case (?profile) {
        let updatedAddresses = profile.addresses.concat([address]);
        profiles.add(userId, { profile with addresses = updatedAddresses });
        true
      };
    };
  };

  public func removeAddress(
    profiles : Map.Map<Principal, UserTypes.UserProfile>,
    userId : Principal,
    index : Nat,
  ) : Bool {
    switch (profiles.get(userId)) {
      case null { false };
      case (?profile) {
        let size = profile.addresses.size();
        if (index >= size) { return false };
        // Build new array excluding the element at `index`
        let updatedAddresses = Array.tabulate(
          size - 1,
          func(i : Nat) : UserTypes.Address {
            if (i < index) { profile.addresses[i] }
            else { profile.addresses[i + 1] }
          },
        );
        profiles.add(userId, { profile with addresses = updatedAddresses });
        true
      };
    };
  };
};
