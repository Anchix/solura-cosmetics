import Runtime "mo:core/Runtime";
import Text "mo:core/Text";
import Blob "mo:core/Blob";
import AccessControl "mo:caffeineai-authorization/access-control";

mixin (
  accessControlState : AccessControl.AccessControlState,
) {
  // Types for IC management canister HTTP request
  type HttpHeader = { name : Text; value : Text };
  type HttpRequestResult = {
    status : Nat;
    headers : [HttpHeader];
    body : Blob;
  };
  type TransformArgs = {
    response : HttpRequestResult;
    context : Blob;
  };
  type HttpRequestArgs = {
    url : Text;
    max_response_bytes : ?Nat64;
    method : { #get; #post; #head };
    headers : [HttpHeader];
    body : ?Blob;
    transform : ?{
      function : shared query TransformArgs -> async HttpRequestResult;
      context : Blob;
    };
    is_replicated : ?Bool;
  };

  let IC = actor "aaaaa-aa" : actor {
    http_request : HttpRequestArgs -> async HttpRequestResult;
  };

  public query func transform(input : { context : Blob; response : { status : Nat; headers : [{ name : Text; value : Text }]; body : Blob } }) : async { status : Nat; headers : [{ name : Text; value : Text }]; body : Blob } {
    // Strip response headers to ensure idempotency across replicas
    { status = input.response.status; headers = []; body = input.response.body }
  };

  public shared func chatbotQuery(userMessage : Text) : async Text {
    let systemPrompt = "You are a helpful customer support assistant for Solura Cosmetics, a beauty brand based in Karur, Tamil Nadu, India. " #
      "Solura Cosmetics offers skincare, makeup, and haircare products with the tagline 'Reveal Your Natural Glow'. " #
      "Our address is 184 South Manthai Street, Pallapatti, Karur, Tamil Nadu 639205. " #
      "For support, contact contact@soluracosmo.com. " #
      "Answer customer questions about products, orders, shipping, returns, and general beauty advice. " #
      "Be friendly, concise, and helpful.";

    let requestBody = "{\"model\":\"gpt-3.5-turbo\",\"messages\":[{\"role\":\"system\",\"content\":\"" # escapeJson(systemPrompt) # "\"},{\"role\":\"user\",\"content\":\"" # escapeJson(userMessage) # "\"}],\"max_tokens\":500}";

    try {
      let response = await (with cycles = 230_949_972_000) IC.http_request({
        url = "https://api.openai.com/v1/chat/completions";
        max_response_bytes = ?10_000;
        method = #post;
        headers = [
          { name = "Authorization"; value = "Bearer OPENAI_API_KEY_PLACEHOLDER" },
          { name = "Content-Type"; value = "application/json" },
        ];
        body = ?(requestBody.encodeUtf8());
        transform = ?{
          function = transform;
          context = Blob.fromArray([]);
        };
        is_replicated = null;
      });
      switch (response.body.decodeUtf8()) {
        case (?text) { text };
        case null { getFallbackResponse(userMessage) };
      }
    } catch (_) {
      getFallbackResponse(userMessage)
    };
  };

  public shared func lookupPincode(pincode : Text) : async Text {
    if (pincode.size() != 6) {
      return "{\"error\":\"Invalid pincode. Please enter a 6-digit pincode.\"}";
    };
    try {
      let url = "https://api.postalpincode.in/pincode/" # pincode;
      let response = await (with cycles = 230_949_972_000) IC.http_request({
        url = url;
        max_response_bytes = ?5_000;
        method = #get;
        headers = [];
        body = null;
        transform = ?{
          function = transform;
          context = Blob.fromArray([]);
        };
        is_replicated = null;
      });
      switch (response.body.decodeUtf8()) {
        case (?text) { text };
        case null { "{\"error\":\"Could not parse pincode response.\"}" };
      }
    } catch (_) {
      "{\"error\":\"Could not fetch pincode details. Please enter your city and state manually.\"}"
    };
  };

  // Helper: escape text for JSON string embedding
  private func escapeJson(text : Text) : Text {
    var result = "";
    for (c in text.toIter()) {
      if (c == '\"') { result #= "\\\"" }
      else if (c == '\\') { result #= "\\\\" }
      else if (c == '\n') { result #= "\\n" }
      else if (c == '\r') { result #= "\\r" }
      else if (c == '\t') { result #= "\\t" }
      else { result #= Text.fromChar(c) };
    };
    result
  };

  // Fallback responses when API is unavailable or key not configured
  private func getFallbackResponse(userMessage : Text) : Text {
    let msg = userMessage.toLower();
    if (msg.contains(#text "order")) {
      "Thank you for reaching out about your order! For order-related queries, please contact us at contact@soluracosmo.com or check your order history in your account. We typically process orders within 1-2 business days."
    } else if (msg.contains(#text "return") or msg.contains(#text "refund")) {
      "We have a hassle-free return policy. If you're not satisfied with your purchase, please contact us at contact@soluracosmo.com within 7 days of delivery. Please keep the original packaging for easy returns."
    } else if (msg.contains(#text "shipping") or msg.contains(#text "delivery")) {
      "We deliver across India! Standard delivery takes 5-7 business days. Cash on Delivery is available with a small surcharge."
    } else if (msg.contains(#text "product") or msg.contains(#text "skin") or msg.contains(#text "hair") or msg.contains(#text "makeup")) {
      "Solura Cosmetics offers a wide range of skincare, makeup, and haircare products crafted to help you Reveal Your Natural Glow. Browse our collections to find the perfect product for you!"
    } else if (msg.contains(#text "price") or msg.contains(#text "cost")) {
      "Our products are priced affordably to make quality beauty accessible to everyone. Check the product listings for current prices. We also run seasonal offers!"
    } else {
      "Thank you for contacting Solura Cosmetics! We're here to help you Reveal Your Natural Glow. For specific queries, please email us at contact@soluracosmo.com. Our team will be happy to assist you!"
    }
  };
};
