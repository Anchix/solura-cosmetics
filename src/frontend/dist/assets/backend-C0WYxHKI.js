import { u as useQuery } from "./useMutation-ybpFZUfc.js";
import { P as ProtocolError, T as TimeoutWaitingForResponseErrorCode, l as utf8ToBytes, E as ExternalError, M as MissingRootKeyErrorCode, C as Certificate, m as lookupResultToBuffer, n as RequestStatusResponseStatus, U as UnknownError, o as RequestStatusDoneNoReplyErrorCode, p as RejectError, q as CertifiedRejectErrorCode, s as UNREACHABLE_ERROR, I as InputError, t as InvalidReadStateRequestErrorCode, v as ReadRequestType, w as Principal, x as IDL, y as MissingCanisterIdErrorCode, H as HttpAgent, z as encode, Q as QueryResponseStatus, A as UncertifiedRejectErrorCode, B as isV3ResponseBody, D as isV2ResponseBody, F as UncertifiedRejectUpdateErrorCode, G as UnexpectedErrorCode, J as decode, K as useInternetIdentity, h as useQueryClient, r as reactExports, N as createActorWithConfig, O as Record, V as Opt, W as Vec, X as Variant, Y as Service, Z as Func, _ as Nat, $ as Text, a0 as Principal$1, a1 as Nat8, a2 as Null, a3 as Bool, a4 as Int } from "./index-BYwbnXHo.js";
const FIVE_MINUTES_IN_MSEC = 5 * 60 * 1e3;
function defaultStrategy() {
  return chain(conditionalDelay(once(), 1e3), backoff(1e3, 1.2), timeout(FIVE_MINUTES_IN_MSEC));
}
function once() {
  let first = true;
  return async () => {
    if (first) {
      first = false;
      return true;
    }
    return false;
  };
}
function conditionalDelay(condition, timeInMsec) {
  return async (canisterId, requestId, status) => {
    if (await condition(canisterId, requestId, status)) {
      return new Promise((resolve) => setTimeout(resolve, timeInMsec));
    }
  };
}
function timeout(timeInMsec) {
  const end = Date.now() + timeInMsec;
  return async (_canisterId, requestId, status) => {
    if (Date.now() > end) {
      throw ProtocolError.fromCode(new TimeoutWaitingForResponseErrorCode(`Request timed out after ${timeInMsec} msec`, requestId, status));
    }
  };
}
function backoff(startingThrottleInMsec, backoffFactor) {
  let currentThrottling = startingThrottleInMsec;
  return () => new Promise((resolve) => setTimeout(() => {
    currentThrottling *= backoffFactor;
    resolve();
  }, currentThrottling));
}
function chain(...strategies) {
  return async (canisterId, requestId, status) => {
    for (const a of strategies) {
      await a(canisterId, requestId, status);
    }
  };
}
const DEFAULT_POLLING_OPTIONS = {
  preSignReadStateRequest: false
};
function hasProperty(value, property) {
  return Object.prototype.hasOwnProperty.call(value, property);
}
function isObjectWithProperty(value, property) {
  return value !== null && typeof value === "object" && hasProperty(value, property);
}
function hasFunction(value, property) {
  return hasProperty(value, property) && typeof value[property] === "function";
}
function isSignedReadStateRequestWithExpiry(value) {
  return isObjectWithProperty(value, "body") && isObjectWithProperty(value.body, "content") && value.body.content.request_type === ReadRequestType.ReadState && isObjectWithProperty(value.body.content, "ingress_expiry") && typeof value.body.content.ingress_expiry === "object" && value.body.content.ingress_expiry !== null && hasFunction(value.body.content.ingress_expiry, "toHash");
}
async function pollForResponse(agent, canisterId, requestId, options = {}) {
  const path = [utf8ToBytes("request_status"), requestId];
  let state;
  let currentRequest;
  const preSignReadStateRequest = options.preSignReadStateRequest ?? false;
  if (preSignReadStateRequest) {
    currentRequest = await constructRequest({
      paths: [path],
      agent,
      pollingOptions: options
    });
    state = await agent.readState(canisterId, { paths: [path] }, void 0, currentRequest);
  } else {
    state = await agent.readState(canisterId, { paths: [path] });
  }
  if (agent.rootKey == null) {
    throw ExternalError.fromCode(new MissingRootKeyErrorCode());
  }
  const cert = await Certificate.create({
    certificate: state.certificate,
    rootKey: agent.rootKey,
    canisterId,
    blsVerify: options.blsVerify,
    agent
  });
  const maybeBuf = lookupResultToBuffer(cert.lookup_path([...path, utf8ToBytes("status")]));
  let status;
  if (typeof maybeBuf === "undefined") {
    status = RequestStatusResponseStatus.Unknown;
  } else {
    status = new TextDecoder().decode(maybeBuf);
  }
  switch (status) {
    case RequestStatusResponseStatus.Replied: {
      return {
        reply: lookupResultToBuffer(cert.lookup_path([...path, "reply"])),
        certificate: cert
      };
    }
    case RequestStatusResponseStatus.Received:
    case RequestStatusResponseStatus.Unknown:
    case RequestStatusResponseStatus.Processing: {
      const strategy = options.strategy ?? defaultStrategy();
      await strategy(canisterId, requestId, status);
      return pollForResponse(agent, canisterId, requestId, {
        ...options,
        // Pass over either the strategy already provided or the new one created above
        strategy,
        request: currentRequest
      });
    }
    case RequestStatusResponseStatus.Rejected: {
      const rejectCode = new Uint8Array(lookupResultToBuffer(cert.lookup_path([...path, "reject_code"])))[0];
      const rejectMessage = new TextDecoder().decode(lookupResultToBuffer(cert.lookup_path([...path, "reject_message"])));
      const errorCodeBuf = lookupResultToBuffer(cert.lookup_path([...path, "error_code"]));
      const errorCode = errorCodeBuf ? new TextDecoder().decode(errorCodeBuf) : void 0;
      throw RejectError.fromCode(new CertifiedRejectErrorCode(requestId, rejectCode, rejectMessage, errorCode));
    }
    case RequestStatusResponseStatus.Done:
      throw UnknownError.fromCode(new RequestStatusDoneNoReplyErrorCode(requestId));
  }
  throw UNREACHABLE_ERROR;
}
async function constructRequest(options) {
  var _a;
  const { paths, agent, pollingOptions } = options;
  if (pollingOptions.request && isSignedReadStateRequestWithExpiry(pollingOptions.request)) {
    return pollingOptions.request;
  }
  const request = await ((_a = agent.createReadStateRequest) == null ? void 0 : _a.call(agent, {
    paths
  }, void 0));
  if (!isSignedReadStateRequestWithExpiry(request)) {
    throw InputError.fromCode(new InvalidReadStateRequestErrorCode(request));
  }
  return request;
}
const metadataSymbol = Symbol.for("ic-agent-metadata");
class Actor {
  /**
   * Get the Agent class this Actor would call, or undefined if the Actor would use
   * the default agent (global.ic.agent).
   * @param actor The actor to get the agent of.
   */
  static agentOf(actor) {
    return actor[metadataSymbol].config.agent;
  }
  /**
   * Get the interface of an actor, in the form of an instance of a Service.
   * @param actor The actor to get the interface of.
   */
  static interfaceOf(actor) {
    return actor[metadataSymbol].service;
  }
  static canisterIdOf(actor) {
    return Principal.from(actor[metadataSymbol].config.canisterId);
  }
  static createActorClass(interfaceFactory, options) {
    const service = interfaceFactory({ IDL });
    class CanisterActor extends Actor {
      constructor(config) {
        if (!config.canisterId) {
          throw InputError.fromCode(new MissingCanisterIdErrorCode(config.canisterId));
        }
        const canisterId = typeof config.canisterId === "string" ? Principal.fromText(config.canisterId) : config.canisterId;
        super({
          config: {
            ...DEFAULT_ACTOR_CONFIG,
            ...config,
            canisterId
          },
          service
        });
        for (const [methodName, func] of service._fields) {
          if (options == null ? void 0 : options.httpDetails) {
            func.annotations.push(ACTOR_METHOD_WITH_HTTP_DETAILS);
          }
          if (options == null ? void 0 : options.certificate) {
            func.annotations.push(ACTOR_METHOD_WITH_CERTIFICATE);
          }
          this[methodName] = _createActorMethod(this, methodName, func, config.blsVerify);
        }
      }
    }
    return CanisterActor;
  }
  /**
   * Creates an actor with the given interface factory and configuration.
   *
   * The [`@icp-sdk/bindgen`](https://js.icp.build/bindgen/) package can be used to generate the interface factory for your canister.
   * @param interfaceFactory - the interface factory for the actor, typically generated by the [`@icp-sdk/bindgen`](https://js.icp.build/bindgen/) package
   * @param configuration - the configuration for the actor
   * @returns an actor with the given interface factory and configuration
   * @example
   * Using the interface factory generated by the [`@icp-sdk/bindgen`](https://js.icp.build/bindgen/) package:
   * ```ts
   * import { Actor, HttpAgent } from '@icp-sdk/core/agent';
   * import { Principal } from '@icp-sdk/core/principal';
   * import { idlFactory } from './api/declarations/hello-world.did';
   *
   * const canisterId = Principal.fromText('rrkah-fqaaa-aaaaa-aaaaq-cai');
   *
   * const agent = await HttpAgent.create({
   *   host: 'https://icp-api.io',
   * });
   *
   * const actor = Actor.createActor(idlFactory, {
   *   agent,
   *   canisterId,
   * });
   *
   * const response = await actor.greet('world');
   * console.log(response);
   * ```
   * @example
   * Using the `createActor` wrapper function generated by the [`@icp-sdk/bindgen`](https://js.icp.build/bindgen/) package:
   * ```ts
   * import { HttpAgent } from '@icp-sdk/core/agent';
   * import { Principal } from '@icp-sdk/core/principal';
   * import { createActor } from './api/hello-world';
   *
   * const canisterId = Principal.fromText('rrkah-fqaaa-aaaaa-aaaaq-cai');
   *
   * const agent = await HttpAgent.create({
   *   host: 'https://icp-api.io',
   * });
   *
   * const actor = createActor(canisterId, {
   *   agent,
   * });
   *
   * const response = await actor.greet('world');
   * console.log(response);
   * ```
   */
  static createActor(interfaceFactory, configuration) {
    if (!configuration.canisterId) {
      throw InputError.fromCode(new MissingCanisterIdErrorCode(configuration.canisterId));
    }
    return new (this.createActorClass(interfaceFactory))(configuration);
  }
  /**
   * Returns an actor with methods that return the http response details along with the result
   * @param interfaceFactory - the interface factory for the actor
   * @param configuration - the configuration for the actor
   * @deprecated - use createActor with actorClassOptions instead
   */
  static createActorWithHttpDetails(interfaceFactory, configuration) {
    return new (this.createActorClass(interfaceFactory, { httpDetails: true }))(configuration);
  }
  /**
   * Returns an actor with methods that return the http response details along with the result
   * @param interfaceFactory - the interface factory for the actor
   * @param configuration - the configuration for the actor
   * @param actorClassOptions - options for the actor class extended details to return with the result
   */
  static createActorWithExtendedDetails(interfaceFactory, configuration, actorClassOptions = {
    httpDetails: true,
    certificate: true
  }) {
    return new (this.createActorClass(interfaceFactory, actorClassOptions))(configuration);
  }
  constructor(metadata) {
    this[metadataSymbol] = Object.freeze(metadata);
  }
}
function decodeReturnValue(types, msg) {
  const returnValues = decode(types, msg);
  switch (returnValues.length) {
    case 0:
      return void 0;
    case 1:
      return returnValues[0];
    default:
      return returnValues;
  }
}
const DEFAULT_ACTOR_CONFIG = {
  pollingOptions: DEFAULT_POLLING_OPTIONS
};
const ACTOR_METHOD_WITH_HTTP_DETAILS = "http-details";
const ACTOR_METHOD_WITH_CERTIFICATE = "certificate";
function _createActorMethod(actor, methodName, func, blsVerify) {
  let caller;
  if (func.annotations.includes("query") || func.annotations.includes("composite_query")) {
    caller = async (options, ...args) => {
      var _a, _b;
      options = {
        ...options,
        ...(_b = (_a = actor[metadataSymbol].config).queryTransform) == null ? void 0 : _b.call(_a, methodName, args, {
          ...actor[metadataSymbol].config,
          ...options
        })
      };
      const agent = options.agent || actor[metadataSymbol].config.agent || new HttpAgent();
      const cid = Principal.from(options.canisterId || actor[metadataSymbol].config.canisterId);
      const arg = encode(func.argTypes, args);
      const result = await agent.query(cid, {
        methodName,
        arg,
        effectiveCanisterId: options.effectiveCanisterId
      });
      const httpDetails = {
        ...result.httpDetails,
        requestDetails: result.requestDetails
      };
      switch (result.status) {
        case QueryResponseStatus.Rejected: {
          const uncertifiedRejectErrorCode = new UncertifiedRejectErrorCode(result.requestId, result.reject_code, result.reject_message, result.error_code, result.signatures);
          uncertifiedRejectErrorCode.callContext = {
            canisterId: cid,
            methodName,
            httpDetails
          };
          throw RejectError.fromCode(uncertifiedRejectErrorCode);
        }
        case QueryResponseStatus.Replied:
          return func.annotations.includes(ACTOR_METHOD_WITH_HTTP_DETAILS) ? {
            httpDetails,
            result: decodeReturnValue(func.retTypes, result.reply.arg)
          } : decodeReturnValue(func.retTypes, result.reply.arg);
      }
    };
  } else {
    caller = async (options, ...args) => {
      var _a, _b;
      options = {
        ...options,
        ...(_b = (_a = actor[metadataSymbol].config).callTransform) == null ? void 0 : _b.call(_a, methodName, args, {
          ...actor[metadataSymbol].config,
          ...options
        })
      };
      const agent = options.agent || actor[metadataSymbol].config.agent || HttpAgent.createSync();
      const { canisterId, effectiveCanisterId, pollingOptions } = {
        ...DEFAULT_ACTOR_CONFIG,
        ...actor[metadataSymbol].config,
        ...options
      };
      const cid = Principal.from(canisterId);
      const ecid = effectiveCanisterId !== void 0 ? Principal.from(effectiveCanisterId) : cid;
      const arg = encode(func.argTypes, args);
      const { requestId, response, requestDetails } = await agent.call(cid, {
        methodName,
        arg,
        effectiveCanisterId: ecid,
        nonce: options.nonce
      });
      let reply;
      let certificate;
      if (isV3ResponseBody(response.body)) {
        if (agent.rootKey == null) {
          throw ExternalError.fromCode(new MissingRootKeyErrorCode());
        }
        const cert = response.body.certificate;
        certificate = await Certificate.create({
          certificate: cert,
          rootKey: agent.rootKey,
          canisterId: ecid,
          blsVerify,
          agent
        });
        const path = [utf8ToBytes("request_status"), requestId];
        const status = new TextDecoder().decode(lookupResultToBuffer(certificate.lookup_path([...path, "status"])));
        switch (status) {
          case "replied":
            reply = lookupResultToBuffer(certificate.lookup_path([...path, "reply"]));
            break;
          case "rejected": {
            const rejectCode = new Uint8Array(lookupResultToBuffer(certificate.lookup_path([...path, "reject_code"])))[0];
            const rejectMessage = new TextDecoder().decode(lookupResultToBuffer(certificate.lookup_path([...path, "reject_message"])));
            const error_code_buf = lookupResultToBuffer(certificate.lookup_path([...path, "error_code"]));
            const error_code = error_code_buf ? new TextDecoder().decode(error_code_buf) : void 0;
            const certifiedRejectErrorCode = new CertifiedRejectErrorCode(requestId, rejectCode, rejectMessage, error_code);
            certifiedRejectErrorCode.callContext = {
              canisterId: cid,
              methodName,
              httpDetails: response
            };
            throw RejectError.fromCode(certifiedRejectErrorCode);
          }
        }
      } else if (isV2ResponseBody(response.body)) {
        const { reject_code, reject_message, error_code } = response.body;
        const errorCode = new UncertifiedRejectUpdateErrorCode(requestId, reject_code, reject_message, error_code);
        errorCode.callContext = {
          canisterId: cid,
          methodName,
          httpDetails: response
        };
        throw RejectError.fromCode(errorCode);
      }
      if (response.status === 202) {
        const pollOptions = {
          ...pollingOptions,
          blsVerify
        };
        const response2 = await pollForResponse(agent, ecid, requestId, pollOptions);
        certificate = response2.certificate;
        reply = response2.reply;
      }
      const shouldIncludeHttpDetails = func.annotations.includes(ACTOR_METHOD_WITH_HTTP_DETAILS);
      const shouldIncludeCertificate = func.annotations.includes(ACTOR_METHOD_WITH_CERTIFICATE);
      const httpDetails = { ...response, requestDetails };
      if (reply !== void 0) {
        if (shouldIncludeHttpDetails && shouldIncludeCertificate) {
          return {
            httpDetails,
            certificate,
            result: decodeReturnValue(func.retTypes, reply)
          };
        } else if (shouldIncludeCertificate) {
          return {
            certificate,
            result: decodeReturnValue(func.retTypes, reply)
          };
        } else if (shouldIncludeHttpDetails) {
          return {
            httpDetails,
            result: decodeReturnValue(func.retTypes, reply)
          };
        }
        return decodeReturnValue(func.retTypes, reply);
      } else {
        const errorCode = new UnexpectedErrorCode(`Call was returned undefined. We cannot determine if the call was successful or not. Return types: [${func.retTypes.map((t) => t.display()).join(",")}].`);
        errorCode.callContext = {
          canisterId: cid,
          methodName,
          httpDetails
        };
        throw UnknownError.fromCode(errorCode);
      }
    };
  }
  const handler = (...args) => caller({}, ...args);
  handler.withOptions = (options) => (...args) => caller(options, ...args);
  return handler;
}
function hasAccessControl(actor) {
  return typeof actor === "object" && actor !== null && "_initializeAccessControl" in actor;
}
const ACTOR_QUERY_KEY = "actor";
function useActor(createActor2) {
  const { identity } = useInternetIdentity();
  const queryClient = useQueryClient();
  const actorQuery = useQuery({
    queryKey: [ACTOR_QUERY_KEY, identity == null ? void 0 : identity.getPrincipal().toString()],
    queryFn: async () => {
      const isAuthenticated = !!identity;
      if (!isAuthenticated) {
        return await createActorWithConfig(createActor2);
      }
      const actorOptions = {
        agentOptions: {
          identity
        }
      };
      const actor = await createActorWithConfig(createActor2, actorOptions);
      if (hasAccessControl(actor)) {
        await actor._initializeAccessControl();
      }
      return actor;
    },
    // Only refetch when identity changes
    staleTime: Number.POSITIVE_INFINITY,
    // This will cause the actor to be recreated when the identity changes
    enabled: true
  });
  reactExports.useEffect(() => {
    if (actorQuery.data) {
      queryClient.invalidateQueries({
        predicate: (query) => {
          return !query.queryKey.includes(ACTOR_QUERY_KEY);
        }
      });
      queryClient.refetchQueries({
        predicate: (query) => {
          return !query.queryKey.includes(ACTOR_QUERY_KEY);
        }
      });
    }
  }, [actorQuery.data, queryClient]);
  return {
    actor: actorQuery.data || null,
    isFetching: actorQuery.isFetching
  };
}
const _ImmutableObjectStorageCreateCertificateResult = Record({
  "method": Text,
  "blob_hash": Text
});
const _ImmutableObjectStorageRefillInformation = Record({
  "proposed_top_up_amount": Opt(Nat)
});
const _ImmutableObjectStorageRefillResult = Record({
  "success": Opt(Bool),
  "topped_up_amount": Opt(Nat)
});
const Address = Record({
  "tag": Text,
  "city": Text,
  "line1": Text,
  "line2": Text,
  "state": Text,
  "pincode": Text
});
const ExternalBlob = Vec(Nat8);
const Banner = Record({
  "id": Nat,
  "name": Text,
  "createdAt": Int,
  "image": ExternalBlob
});
const BlogStatus$1 = Variant({
  "published": Null,
  "draft": Null
});
const BlogInput = Record({
  "status": BlogStatus$1,
  "title": Text,
  "content": Text,
  "slug": Text,
  "author": Text,
  "coverImage": Opt(ExternalBlob),
  "excerpt": Text,
  "category": Text
});
const BlogId = Nat;
const BlogPost = Record({
  "id": BlogId,
  "status": BlogStatus$1,
  "title": Text,
  "content": Text,
  "createdAt": Int,
  "slug": Text,
  "author": Text,
  "coverImage": Opt(ExternalBlob),
  "updatedAt": Int,
  "excerpt": Text,
  "category": Text
});
const ProductStatus = Variant({
  "active": Null,
  "inactive": Null
});
const ProductCategory = Variant({
  "Skincare": Null,
  "Haircare": Null,
  "Makeup": Null
});
const ProductInput = Record({
  "status": ProductStatus,
  "name": Text,
  "description": Text,
  "stock": Nat,
  "isBestseller": Bool,
  "category": ProductCategory,
  "isNew": Bool,
  "price": Nat,
  "image1": Opt(ExternalBlob),
  "image2": Opt(ExternalBlob),
  "image3": Opt(ExternalBlob),
  "image4": Opt(ExternalBlob),
  "image5": Opt(ExternalBlob),
  "image6": Opt(ExternalBlob)
});
const Product = Record({
  "id": Nat,
  "status": ProductStatus,
  "name": Text,
  "createdAt": Int,
  "description": Text,
  "stock": Nat,
  "isBestseller": Bool,
  "category": ProductCategory,
  "isNew": Bool,
  "price": Nat,
  "image1": Opt(ExternalBlob),
  "image2": Opt(ExternalBlob),
  "image3": Opt(ExternalBlob),
  "image4": Opt(ExternalBlob),
  "image5": Opt(ExternalBlob),
  "image6": Opt(ExternalBlob)
});
const ProductId = Nat;
const DailyAnalytics = Record({
  "revenue": Nat,
  "date": Int,
  "orderCount": Nat
});
const PaymentStatus$1 = Variant({
  "Failed": Null,
  "Refunded": Null,
  "Paid": Null,
  "Pending": Null
});
const PaymentMethod$1 = Variant({
  "COD": Null,
  "Razorpay": Null
});
const CustomerInfo = Record({
  "city": Text,
  "name": Text,
  "email": Text,
  "state": Text,
  "addressLine1": Text,
  "addressLine2": Text,
  "phone": Text,
  "pincode": Text
});
const OrderStatus$1 = Variant({
  "Delivered": Null,
  "Cancelled": Null,
  "Shipped": Null,
  "Pending": Null
});
const OrderItem = Record({
  "name": Text,
  "productId": Nat,
  "quantity": Nat,
  "price": Nat
});
const Order = Record({
  "id": Nat,
  "paymentStatus": PaymentStatus$1,
  "paymentMethod": PaymentMethod$1,
  "codSurcharge": Nat,
  "customer": CustomerInfo,
  "orderStatus": OrderStatus$1,
  "userId": Opt(Principal$1),
  "createdAt": Int,
  "gstAmount": Nat,
  "razorpayOrderId": Opt(Text),
  "totalAmount": Nat,
  "items": Vec(OrderItem),
  "subtotal": Nat
});
const OrderId = Nat;
const UserRole = Variant({
  "admin": Null,
  "user": Null,
  "guest": Null
});
const OrderInput = Record({
  "paymentMethod": PaymentMethod$1,
  "customer": CustomerInfo,
  "razorpayOrderId": Opt(Text),
  "items": Vec(OrderItem)
});
const ReviewInput = Record({
  "text": Text,
  "productId": Nat,
  "rating": Nat,
  "image1": Opt(ExternalBlob),
  "image2": Opt(ExternalBlob),
  "image3": Opt(ExternalBlob)
});
const Review = Record({
  "id": Nat,
  "userId": Principal$1,
  "createdAt": Int,
  "text": Text,
  "productId": Nat,
  "rating": Nat,
  "image1": Opt(ExternalBlob),
  "image2": Opt(ExternalBlob),
  "image3": Opt(ExternalBlob)
});
const ReviewId = Nat;
const UserProfile = Record({
  "name": Text,
  "email": Text,
  "addresses": Vec(Address),
  "phone": Text
});
const InvoiceData = Record({
  "paymentStatus": PaymentStatus$1,
  "paymentMethod": PaymentMethod$1,
  "codSurcharge": Nat,
  "customer": CustomerInfo,
  "gstNumber": Text,
  "orderDate": Int,
  "gstAmount": Nat,
  "orderId": Nat,
  "totalAmount": Nat,
  "companyName": Text,
  "items": Vec(OrderItem),
  "companyAddress": Text,
  "subtotal": Nat
});
const ProductRating = Record({
  "productId": Nat,
  "averageRating": Nat,
  "reviewCount": Nat
});
Service({
  "_immutableObjectStorageBlobsAreLive": Func(
    [Vec(Vec(Nat8))],
    [Vec(Bool)],
    ["query"]
  ),
  "_immutableObjectStorageBlobsToDelete": Func(
    [],
    [Vec(Vec(Nat8))],
    ["query"]
  ),
  "_immutableObjectStorageConfirmBlobDeletion": Func(
    [Vec(Vec(Nat8))],
    [],
    []
  ),
  "_immutableObjectStorageCreateCertificate": Func(
    [Text],
    [_ImmutableObjectStorageCreateCertificateResult],
    []
  ),
  "_immutableObjectStorageRefillCashier": Func(
    [Opt(_ImmutableObjectStorageRefillInformation)],
    [_ImmutableObjectStorageRefillResult],
    []
  ),
  "_immutableObjectStorageUpdateGatewayPrincipals": Func([], [], []),
  "_initializeAccessControl": Func([], [], []),
  "addAddress": Func([Address], [Bool], []),
  "adminAddBanner": Func([Text, ExternalBlob], [Banner], []),
  "adminCreateBlogPost": Func([BlogInput], [BlogPost], []),
  "adminCreateProduct": Func([ProductInput], [Product], []),
  "adminDeleteBanner": Func([Nat], [Bool], []),
  "adminDeleteBlogPost": Func([BlogId], [Bool], []),
  "adminDeleteProduct": Func([ProductId], [Bool], []),
  "adminGetAnalytics": Func([], [Vec(DailyAnalytics)], ["query"]),
  "adminListAllBlogPosts": Func([], [Vec(BlogPost)], []),
  "adminListAllOrders": Func([], [Vec(Order)], ["query"]),
  "adminUpdateBlogPost": Func(
    [BlogId, BlogInput],
    [Opt(BlogPost)],
    []
  ),
  "adminUpdateOrderStatus": Func([OrderId, OrderStatus$1], [Bool], []),
  "adminUpdateProduct": Func([ProductId, ProductInput], [Bool], []),
  "assignCallerUserRole": Func([Principal$1, UserRole], [], []),
  "chatbotQuery": Func([Text], [Text], []),
  "createOrder": Func([OrderInput], [Order], []),
  "createReview": Func([ReviewInput], [Review], []),
  "deleteReview": Func([ReviewId], [Bool], []),
  "getBestsellers": Func([], [Vec(Product)], ["query"]),
  "getBlogPost": Func([BlogId], [Opt(BlogPost)], ["query"]),
  "getBlogPostBySlug": Func([Text], [Opt(BlogPost)], ["query"]),
  "getCallerUserProfile": Func([], [Opt(UserProfile)], ["query"]),
  "getCallerUserRole": Func([], [UserRole], ["query"]),
  "getInvoice": Func([OrderId], [Opt(InvoiceData)], ["query"]),
  "getNewArrivals": Func([], [Vec(Product)], ["query"]),
  "getOrder": Func([OrderId], [Opt(Order)], ["query"]),
  "getProduct": Func([ProductId], [Opt(Product)], ["query"]),
  "getProductRating": Func([ProductId], [ProductRating], ["query"]),
  "getProductsByCategory": Func(
    [ProductCategory],
    [Vec(Product)],
    ["query"]
  ),
  "getUserProfile": Func(
    [Principal$1],
    [Opt(UserProfile)],
    ["query"]
  ),
  "isCallerAdmin": Func([], [Bool], ["query"]),
  "listActiveProducts": Func([], [Vec(Product)], ["query"]),
  "listBanners": Func([], [Vec(Banner)], ["query"]),
  "listBlogPosts": Func([], [Vec(BlogPost)], ["query"]),
  "listMyOrders": Func([], [Vec(Order)], ["query"]),
  "listProducts": Func([], [Vec(Product)], ["query"]),
  "listReviewsByProduct": Func([ProductId], [Vec(Review)], ["query"]),
  "lookupPincode": Func([Text], [Text], []),
  "removeAddress": Func([Nat], [Bool], []),
  "saveCallerUserProfile": Func([UserProfile], [], []),
  "transform": Func(
    [
      Record({
        "context": Vec(Nat8),
        "response": Record({
          "status": Nat,
          "body": Vec(Nat8),
          "headers": Vec(
            Record({ "value": Text, "name": Text })
          )
        })
      })
    ],
    [
      Record({
        "status": Nat,
        "body": Vec(Nat8),
        "headers": Vec(
          Record({ "value": Text, "name": Text })
        )
      })
    ],
    ["query"]
  ),
  "updatePaymentStatus": Func(
    [OrderId, PaymentStatus$1, Opt(Text)],
    [Bool],
    []
  )
});
const idlFactory = ({ IDL: IDL2 }) => {
  const _ImmutableObjectStorageCreateCertificateResult2 = IDL2.Record({
    "method": IDL2.Text,
    "blob_hash": IDL2.Text
  });
  const _ImmutableObjectStorageRefillInformation2 = IDL2.Record({
    "proposed_top_up_amount": IDL2.Opt(IDL2.Nat)
  });
  const _ImmutableObjectStorageRefillResult2 = IDL2.Record({
    "success": IDL2.Opt(IDL2.Bool),
    "topped_up_amount": IDL2.Opt(IDL2.Nat)
  });
  const Address2 = IDL2.Record({
    "tag": IDL2.Text,
    "city": IDL2.Text,
    "line1": IDL2.Text,
    "line2": IDL2.Text,
    "state": IDL2.Text,
    "pincode": IDL2.Text
  });
  const ExternalBlob2 = IDL2.Vec(IDL2.Nat8);
  const Banner2 = IDL2.Record({
    "id": IDL2.Nat,
    "name": IDL2.Text,
    "createdAt": IDL2.Int,
    "image": ExternalBlob2
  });
  const BlogStatus2 = IDL2.Variant({
    "published": IDL2.Null,
    "draft": IDL2.Null
  });
  const BlogInput2 = IDL2.Record({
    "status": BlogStatus2,
    "title": IDL2.Text,
    "content": IDL2.Text,
    "slug": IDL2.Text,
    "author": IDL2.Text,
    "coverImage": IDL2.Opt(ExternalBlob2),
    "excerpt": IDL2.Text,
    "category": IDL2.Text
  });
  const BlogId2 = IDL2.Nat;
  const BlogPost2 = IDL2.Record({
    "id": BlogId2,
    "status": BlogStatus2,
    "title": IDL2.Text,
    "content": IDL2.Text,
    "createdAt": IDL2.Int,
    "slug": IDL2.Text,
    "author": IDL2.Text,
    "coverImage": IDL2.Opt(ExternalBlob2),
    "updatedAt": IDL2.Int,
    "excerpt": IDL2.Text,
    "category": IDL2.Text
  });
  const ProductStatus2 = IDL2.Variant({
    "active": IDL2.Null,
    "inactive": IDL2.Null
  });
  const ProductCategory2 = IDL2.Variant({
    "Skincare": IDL2.Null,
    "Haircare": IDL2.Null,
    "Makeup": IDL2.Null
  });
  const ProductInput2 = IDL2.Record({
    "status": ProductStatus2,
    "name": IDL2.Text,
    "description": IDL2.Text,
    "stock": IDL2.Nat,
    "isBestseller": IDL2.Bool,
    "category": ProductCategory2,
    "isNew": IDL2.Bool,
    "price": IDL2.Nat,
    "image1": IDL2.Opt(ExternalBlob2),
    "image2": IDL2.Opt(ExternalBlob2),
    "image3": IDL2.Opt(ExternalBlob2),
    "image4": IDL2.Opt(ExternalBlob2),
    "image5": IDL2.Opt(ExternalBlob2),
    "image6": IDL2.Opt(ExternalBlob2)
  });
  const Product2 = IDL2.Record({
    "id": IDL2.Nat,
    "status": ProductStatus2,
    "name": IDL2.Text,
    "createdAt": IDL2.Int,
    "description": IDL2.Text,
    "stock": IDL2.Nat,
    "isBestseller": IDL2.Bool,
    "category": ProductCategory2,
    "isNew": IDL2.Bool,
    "price": IDL2.Nat,
    "image1": IDL2.Opt(ExternalBlob2),
    "image2": IDL2.Opt(ExternalBlob2),
    "image3": IDL2.Opt(ExternalBlob2),
    "image4": IDL2.Opt(ExternalBlob2),
    "image5": IDL2.Opt(ExternalBlob2),
    "image6": IDL2.Opt(ExternalBlob2)
  });
  const ProductId2 = IDL2.Nat;
  const DailyAnalytics2 = IDL2.Record({
    "revenue": IDL2.Nat,
    "date": IDL2.Int,
    "orderCount": IDL2.Nat
  });
  const PaymentStatus2 = IDL2.Variant({
    "Failed": IDL2.Null,
    "Refunded": IDL2.Null,
    "Paid": IDL2.Null,
    "Pending": IDL2.Null
  });
  const PaymentMethod2 = IDL2.Variant({
    "COD": IDL2.Null,
    "Razorpay": IDL2.Null
  });
  const CustomerInfo2 = IDL2.Record({
    "city": IDL2.Text,
    "name": IDL2.Text,
    "email": IDL2.Text,
    "state": IDL2.Text,
    "addressLine1": IDL2.Text,
    "addressLine2": IDL2.Text,
    "phone": IDL2.Text,
    "pincode": IDL2.Text
  });
  const OrderStatus2 = IDL2.Variant({
    "Delivered": IDL2.Null,
    "Cancelled": IDL2.Null,
    "Shipped": IDL2.Null,
    "Pending": IDL2.Null
  });
  const OrderItem2 = IDL2.Record({
    "name": IDL2.Text,
    "productId": IDL2.Nat,
    "quantity": IDL2.Nat,
    "price": IDL2.Nat
  });
  const Order2 = IDL2.Record({
    "id": IDL2.Nat,
    "paymentStatus": PaymentStatus2,
    "paymentMethod": PaymentMethod2,
    "codSurcharge": IDL2.Nat,
    "customer": CustomerInfo2,
    "orderStatus": OrderStatus2,
    "userId": IDL2.Opt(IDL2.Principal),
    "createdAt": IDL2.Int,
    "gstAmount": IDL2.Nat,
    "razorpayOrderId": IDL2.Opt(IDL2.Text),
    "totalAmount": IDL2.Nat,
    "items": IDL2.Vec(OrderItem2),
    "subtotal": IDL2.Nat
  });
  const OrderId2 = IDL2.Nat;
  const UserRole2 = IDL2.Variant({
    "admin": IDL2.Null,
    "user": IDL2.Null,
    "guest": IDL2.Null
  });
  const OrderInput2 = IDL2.Record({
    "paymentMethod": PaymentMethod2,
    "customer": CustomerInfo2,
    "razorpayOrderId": IDL2.Opt(IDL2.Text),
    "items": IDL2.Vec(OrderItem2)
  });
  const ReviewInput2 = IDL2.Record({
    "text": IDL2.Text,
    "productId": IDL2.Nat,
    "rating": IDL2.Nat,
    "image1": IDL2.Opt(ExternalBlob2),
    "image2": IDL2.Opt(ExternalBlob2),
    "image3": IDL2.Opt(ExternalBlob2)
  });
  const Review2 = IDL2.Record({
    "id": IDL2.Nat,
    "userId": IDL2.Principal,
    "createdAt": IDL2.Int,
    "text": IDL2.Text,
    "productId": IDL2.Nat,
    "rating": IDL2.Nat,
    "image1": IDL2.Opt(ExternalBlob2),
    "image2": IDL2.Opt(ExternalBlob2),
    "image3": IDL2.Opt(ExternalBlob2)
  });
  const ReviewId2 = IDL2.Nat;
  const UserProfile2 = IDL2.Record({
    "name": IDL2.Text,
    "email": IDL2.Text,
    "addresses": IDL2.Vec(Address2),
    "phone": IDL2.Text
  });
  const InvoiceData2 = IDL2.Record({
    "paymentStatus": PaymentStatus2,
    "paymentMethod": PaymentMethod2,
    "codSurcharge": IDL2.Nat,
    "customer": CustomerInfo2,
    "gstNumber": IDL2.Text,
    "orderDate": IDL2.Int,
    "gstAmount": IDL2.Nat,
    "orderId": IDL2.Nat,
    "totalAmount": IDL2.Nat,
    "companyName": IDL2.Text,
    "items": IDL2.Vec(OrderItem2),
    "companyAddress": IDL2.Text,
    "subtotal": IDL2.Nat
  });
  const ProductRating2 = IDL2.Record({
    "productId": IDL2.Nat,
    "averageRating": IDL2.Nat,
    "reviewCount": IDL2.Nat
  });
  return IDL2.Service({
    "_immutableObjectStorageBlobsAreLive": IDL2.Func(
      [IDL2.Vec(IDL2.Vec(IDL2.Nat8))],
      [IDL2.Vec(IDL2.Bool)],
      ["query"]
    ),
    "_immutableObjectStorageBlobsToDelete": IDL2.Func(
      [],
      [IDL2.Vec(IDL2.Vec(IDL2.Nat8))],
      ["query"]
    ),
    "_immutableObjectStorageConfirmBlobDeletion": IDL2.Func(
      [IDL2.Vec(IDL2.Vec(IDL2.Nat8))],
      [],
      []
    ),
    "_immutableObjectStorageCreateCertificate": IDL2.Func(
      [IDL2.Text],
      [_ImmutableObjectStorageCreateCertificateResult2],
      []
    ),
    "_immutableObjectStorageRefillCashier": IDL2.Func(
      [IDL2.Opt(_ImmutableObjectStorageRefillInformation2)],
      [_ImmutableObjectStorageRefillResult2],
      []
    ),
    "_immutableObjectStorageUpdateGatewayPrincipals": IDL2.Func([], [], []),
    "_initializeAccessControl": IDL2.Func([], [], []),
    "addAddress": IDL2.Func([Address2], [IDL2.Bool], []),
    "adminAddBanner": IDL2.Func([IDL2.Text, ExternalBlob2], [Banner2], []),
    "adminCreateBlogPost": IDL2.Func([BlogInput2], [BlogPost2], []),
    "adminCreateProduct": IDL2.Func([ProductInput2], [Product2], []),
    "adminDeleteBanner": IDL2.Func([IDL2.Nat], [IDL2.Bool], []),
    "adminDeleteBlogPost": IDL2.Func([BlogId2], [IDL2.Bool], []),
    "adminDeleteProduct": IDL2.Func([ProductId2], [IDL2.Bool], []),
    "adminGetAnalytics": IDL2.Func([], [IDL2.Vec(DailyAnalytics2)], ["query"]),
    "adminListAllBlogPosts": IDL2.Func([], [IDL2.Vec(BlogPost2)], []),
    "adminListAllOrders": IDL2.Func([], [IDL2.Vec(Order2)], ["query"]),
    "adminUpdateBlogPost": IDL2.Func(
      [BlogId2, BlogInput2],
      [IDL2.Opt(BlogPost2)],
      []
    ),
    "adminUpdateOrderStatus": IDL2.Func([OrderId2, OrderStatus2], [IDL2.Bool], []),
    "adminUpdateProduct": IDL2.Func([ProductId2, ProductInput2], [IDL2.Bool], []),
    "assignCallerUserRole": IDL2.Func([IDL2.Principal, UserRole2], [], []),
    "chatbotQuery": IDL2.Func([IDL2.Text], [IDL2.Text], []),
    "createOrder": IDL2.Func([OrderInput2], [Order2], []),
    "createReview": IDL2.Func([ReviewInput2], [Review2], []),
    "deleteReview": IDL2.Func([ReviewId2], [IDL2.Bool], []),
    "getBestsellers": IDL2.Func([], [IDL2.Vec(Product2)], ["query"]),
    "getBlogPost": IDL2.Func([BlogId2], [IDL2.Opt(BlogPost2)], ["query"]),
    "getBlogPostBySlug": IDL2.Func([IDL2.Text], [IDL2.Opt(BlogPost2)], ["query"]),
    "getCallerUserProfile": IDL2.Func([], [IDL2.Opt(UserProfile2)], ["query"]),
    "getCallerUserRole": IDL2.Func([], [UserRole2], ["query"]),
    "getInvoice": IDL2.Func([OrderId2], [IDL2.Opt(InvoiceData2)], ["query"]),
    "getNewArrivals": IDL2.Func([], [IDL2.Vec(Product2)], ["query"]),
    "getOrder": IDL2.Func([OrderId2], [IDL2.Opt(Order2)], ["query"]),
    "getProduct": IDL2.Func([ProductId2], [IDL2.Opt(Product2)], ["query"]),
    "getProductRating": IDL2.Func([ProductId2], [ProductRating2], ["query"]),
    "getProductsByCategory": IDL2.Func(
      [ProductCategory2],
      [IDL2.Vec(Product2)],
      ["query"]
    ),
    "getUserProfile": IDL2.Func(
      [IDL2.Principal],
      [IDL2.Opt(UserProfile2)],
      ["query"]
    ),
    "isCallerAdmin": IDL2.Func([], [IDL2.Bool], ["query"]),
    "listActiveProducts": IDL2.Func([], [IDL2.Vec(Product2)], ["query"]),
    "listBanners": IDL2.Func([], [IDL2.Vec(Banner2)], ["query"]),
    "listBlogPosts": IDL2.Func([], [IDL2.Vec(BlogPost2)], ["query"]),
    "listMyOrders": IDL2.Func([], [IDL2.Vec(Order2)], ["query"]),
    "listProducts": IDL2.Func([], [IDL2.Vec(Product2)], ["query"]),
    "listReviewsByProduct": IDL2.Func(
      [ProductId2],
      [IDL2.Vec(Review2)],
      ["query"]
    ),
    "lookupPincode": IDL2.Func([IDL2.Text], [IDL2.Text], []),
    "removeAddress": IDL2.Func([IDL2.Nat], [IDL2.Bool], []),
    "saveCallerUserProfile": IDL2.Func([UserProfile2], [], []),
    "transform": IDL2.Func(
      [
        IDL2.Record({
          "context": IDL2.Vec(IDL2.Nat8),
          "response": IDL2.Record({
            "status": IDL2.Nat,
            "body": IDL2.Vec(IDL2.Nat8),
            "headers": IDL2.Vec(
              IDL2.Record({ "value": IDL2.Text, "name": IDL2.Text })
            )
          })
        })
      ],
      [
        IDL2.Record({
          "status": IDL2.Nat,
          "body": IDL2.Vec(IDL2.Nat8),
          "headers": IDL2.Vec(
            IDL2.Record({ "value": IDL2.Text, "name": IDL2.Text })
          )
        })
      ],
      ["query"]
    ),
    "updatePaymentStatus": IDL2.Func(
      [OrderId2, PaymentStatus2, IDL2.Opt(IDL2.Text)],
      [IDL2.Bool],
      []
    )
  });
};
function candid_some(value) {
  return [
    value
  ];
}
function candid_none() {
  return [];
}
function record_opt_to_undefined(arg) {
  return arg == null ? void 0 : arg;
}
var BlogStatus = /* @__PURE__ */ ((BlogStatus2) => {
  BlogStatus2["published"] = "published";
  BlogStatus2["draft"] = "draft";
  return BlogStatus2;
})(BlogStatus || {});
var OrderStatus = /* @__PURE__ */ ((OrderStatus2) => {
  OrderStatus2["Delivered"] = "Delivered";
  OrderStatus2["Cancelled"] = "Cancelled";
  OrderStatus2["Shipped"] = "Shipped";
  OrderStatus2["Pending"] = "Pending";
  return OrderStatus2;
})(OrderStatus || {});
var PaymentMethod = /* @__PURE__ */ ((PaymentMethod2) => {
  PaymentMethod2["COD"] = "COD";
  PaymentMethod2["Razorpay"] = "Razorpay";
  return PaymentMethod2;
})(PaymentMethod || {});
var PaymentStatus = /* @__PURE__ */ ((PaymentStatus2) => {
  PaymentStatus2["Failed"] = "Failed";
  PaymentStatus2["Refunded"] = "Refunded";
  PaymentStatus2["Paid"] = "Paid";
  PaymentStatus2["Pending"] = "Pending";
  return PaymentStatus2;
})(PaymentStatus || {});
class Backend {
  constructor(actor, _uploadFile, _downloadFile, processError) {
    this.actor = actor;
    this._uploadFile = _uploadFile;
    this._downloadFile = _downloadFile;
    this.processError = processError;
  }
  async _immutableObjectStorageBlobsAreLive(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor._immutableObjectStorageBlobsAreLive(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor._immutableObjectStorageBlobsAreLive(arg0);
      return result;
    }
  }
  async _immutableObjectStorageBlobsToDelete() {
    if (this.processError) {
      try {
        const result = await this.actor._immutableObjectStorageBlobsToDelete();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor._immutableObjectStorageBlobsToDelete();
      return result;
    }
  }
  async _immutableObjectStorageConfirmBlobDeletion(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor._immutableObjectStorageConfirmBlobDeletion(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor._immutableObjectStorageConfirmBlobDeletion(arg0);
      return result;
    }
  }
  async _immutableObjectStorageCreateCertificate(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor._immutableObjectStorageCreateCertificate(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor._immutableObjectStorageCreateCertificate(arg0);
      return result;
    }
  }
  async _immutableObjectStorageRefillCashier(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor._immutableObjectStorageRefillCashier(to_candid_opt_n1(this._uploadFile, this._downloadFile, arg0));
        return from_candid__ImmutableObjectStorageRefillResult_n4(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor._immutableObjectStorageRefillCashier(to_candid_opt_n1(this._uploadFile, this._downloadFile, arg0));
      return from_candid__ImmutableObjectStorageRefillResult_n4(this._uploadFile, this._downloadFile, result);
    }
  }
  async _immutableObjectStorageUpdateGatewayPrincipals() {
    if (this.processError) {
      try {
        const result = await this.actor._immutableObjectStorageUpdateGatewayPrincipals();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor._immutableObjectStorageUpdateGatewayPrincipals();
      return result;
    }
  }
  async _initializeAccessControl() {
    if (this.processError) {
      try {
        const result = await this.actor._initializeAccessControl();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor._initializeAccessControl();
      return result;
    }
  }
  async addAddress(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.addAddress(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.addAddress(arg0);
      return result;
    }
  }
  async adminAddBanner(arg0, arg1) {
    if (this.processError) {
      try {
        const result = await this.actor.adminAddBanner(arg0, await to_candid_ExternalBlob_n8(this._uploadFile, this._downloadFile, arg1));
        return from_candid_Banner_n9(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.adminAddBanner(arg0, await to_candid_ExternalBlob_n8(this._uploadFile, this._downloadFile, arg1));
      return from_candid_Banner_n9(this._uploadFile, this._downloadFile, result);
    }
  }
  async adminCreateBlogPost(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.adminCreateBlogPost(await to_candid_BlogInput_n12(this._uploadFile, this._downloadFile, arg0));
        return from_candid_BlogPost_n16(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.adminCreateBlogPost(await to_candid_BlogInput_n12(this._uploadFile, this._downloadFile, arg0));
      return from_candid_BlogPost_n16(this._uploadFile, this._downloadFile, result);
    }
  }
  async adminCreateProduct(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.adminCreateProduct(await to_candid_ProductInput_n21(this._uploadFile, this._downloadFile, arg0));
        return from_candid_Product_n27(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.adminCreateProduct(await to_candid_ProductInput_n21(this._uploadFile, this._downloadFile, arg0));
      return from_candid_Product_n27(this._uploadFile, this._downloadFile, result);
    }
  }
  async adminDeleteBanner(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.adminDeleteBanner(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.adminDeleteBanner(arg0);
      return result;
    }
  }
  async adminDeleteBlogPost(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.adminDeleteBlogPost(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.adminDeleteBlogPost(arg0);
      return result;
    }
  }
  async adminDeleteProduct(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.adminDeleteProduct(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.adminDeleteProduct(arg0);
      return result;
    }
  }
  async adminGetAnalytics() {
    if (this.processError) {
      try {
        const result = await this.actor.adminGetAnalytics();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.adminGetAnalytics();
      return result;
    }
  }
  async adminListAllBlogPosts() {
    if (this.processError) {
      try {
        const result = await this.actor.adminListAllBlogPosts();
        return from_candid_vec_n33(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.adminListAllBlogPosts();
      return from_candid_vec_n33(this._uploadFile, this._downloadFile, result);
    }
  }
  async adminListAllOrders() {
    if (this.processError) {
      try {
        const result = await this.actor.adminListAllOrders();
        return from_candid_vec_n34(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.adminListAllOrders();
      return from_candid_vec_n34(this._uploadFile, this._downloadFile, result);
    }
  }
  async adminUpdateBlogPost(arg0, arg1) {
    if (this.processError) {
      try {
        const result = await this.actor.adminUpdateBlogPost(arg0, await to_candid_BlogInput_n12(this._uploadFile, this._downloadFile, arg1));
        return from_candid_opt_n45(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.adminUpdateBlogPost(arg0, await to_candid_BlogInput_n12(this._uploadFile, this._downloadFile, arg1));
      return from_candid_opt_n45(this._uploadFile, this._downloadFile, result);
    }
  }
  async adminUpdateOrderStatus(arg0, arg1) {
    if (this.processError) {
      try {
        const result = await this.actor.adminUpdateOrderStatus(arg0, to_candid_OrderStatus_n46(this._uploadFile, this._downloadFile, arg1));
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.adminUpdateOrderStatus(arg0, to_candid_OrderStatus_n46(this._uploadFile, this._downloadFile, arg1));
      return result;
    }
  }
  async adminUpdateProduct(arg0, arg1) {
    if (this.processError) {
      try {
        const result = await this.actor.adminUpdateProduct(arg0, await to_candid_ProductInput_n21(this._uploadFile, this._downloadFile, arg1));
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.adminUpdateProduct(arg0, await to_candid_ProductInput_n21(this._uploadFile, this._downloadFile, arg1));
      return result;
    }
  }
  async assignCallerUserRole(arg0, arg1) {
    if (this.processError) {
      try {
        const result = await this.actor.assignCallerUserRole(arg0, to_candid_UserRole_n48(this._uploadFile, this._downloadFile, arg1));
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.assignCallerUserRole(arg0, to_candid_UserRole_n48(this._uploadFile, this._downloadFile, arg1));
      return result;
    }
  }
  async chatbotQuery(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.chatbotQuery(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.chatbotQuery(arg0);
      return result;
    }
  }
  async createOrder(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.createOrder(to_candid_OrderInput_n50(this._uploadFile, this._downloadFile, arg0));
        return from_candid_Order_n35(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.createOrder(to_candid_OrderInput_n50(this._uploadFile, this._downloadFile, arg0));
      return from_candid_Order_n35(this._uploadFile, this._downloadFile, result);
    }
  }
  async createReview(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.createReview(await to_candid_ReviewInput_n54(this._uploadFile, this._downloadFile, arg0));
        return from_candid_Review_n56(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.createReview(await to_candid_ReviewInput_n54(this._uploadFile, this._downloadFile, arg0));
      return from_candid_Review_n56(this._uploadFile, this._downloadFile, result);
    }
  }
  async deleteReview(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.deleteReview(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.deleteReview(arg0);
      return result;
    }
  }
  async getBestsellers() {
    if (this.processError) {
      try {
        const result = await this.actor.getBestsellers();
        return from_candid_vec_n58(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getBestsellers();
      return from_candid_vec_n58(this._uploadFile, this._downloadFile, result);
    }
  }
  async getBlogPost(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.getBlogPost(arg0);
        return from_candid_opt_n45(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getBlogPost(arg0);
      return from_candid_opt_n45(this._uploadFile, this._downloadFile, result);
    }
  }
  async getBlogPostBySlug(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.getBlogPostBySlug(arg0);
        return from_candid_opt_n45(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getBlogPostBySlug(arg0);
      return from_candid_opt_n45(this._uploadFile, this._downloadFile, result);
    }
  }
  async getCallerUserProfile() {
    if (this.processError) {
      try {
        const result = await this.actor.getCallerUserProfile();
        return from_candid_opt_n59(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getCallerUserProfile();
      return from_candid_opt_n59(this._uploadFile, this._downloadFile, result);
    }
  }
  async getCallerUserRole() {
    if (this.processError) {
      try {
        const result = await this.actor.getCallerUserRole();
        return from_candid_UserRole_n60(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getCallerUserRole();
      return from_candid_UserRole_n60(this._uploadFile, this._downloadFile, result);
    }
  }
  async getInvoice(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.getInvoice(arg0);
        return from_candid_opt_n62(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getInvoice(arg0);
      return from_candid_opt_n62(this._uploadFile, this._downloadFile, result);
    }
  }
  async getNewArrivals() {
    if (this.processError) {
      try {
        const result = await this.actor.getNewArrivals();
        return from_candid_vec_n58(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getNewArrivals();
      return from_candid_vec_n58(this._uploadFile, this._downloadFile, result);
    }
  }
  async getOrder(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.getOrder(arg0);
        return from_candid_opt_n65(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getOrder(arg0);
      return from_candid_opt_n65(this._uploadFile, this._downloadFile, result);
    }
  }
  async getProduct(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.getProduct(arg0);
        return from_candid_opt_n66(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getProduct(arg0);
      return from_candid_opt_n66(this._uploadFile, this._downloadFile, result);
    }
  }
  async getProductRating(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.getProductRating(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getProductRating(arg0);
      return result;
    }
  }
  async getProductsByCategory(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.getProductsByCategory(to_candid_ProductCategory_n25(this._uploadFile, this._downloadFile, arg0));
        return from_candid_vec_n58(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getProductsByCategory(to_candid_ProductCategory_n25(this._uploadFile, this._downloadFile, arg0));
      return from_candid_vec_n58(this._uploadFile, this._downloadFile, result);
    }
  }
  async getUserProfile(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.getUserProfile(arg0);
        return from_candid_opt_n59(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getUserProfile(arg0);
      return from_candid_opt_n59(this._uploadFile, this._downloadFile, result);
    }
  }
  async isCallerAdmin() {
    if (this.processError) {
      try {
        const result = await this.actor.isCallerAdmin();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.isCallerAdmin();
      return result;
    }
  }
  async listActiveProducts() {
    if (this.processError) {
      try {
        const result = await this.actor.listActiveProducts();
        return from_candid_vec_n58(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.listActiveProducts();
      return from_candid_vec_n58(this._uploadFile, this._downloadFile, result);
    }
  }
  async listBanners() {
    if (this.processError) {
      try {
        const result = await this.actor.listBanners();
        return from_candid_vec_n67(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.listBanners();
      return from_candid_vec_n67(this._uploadFile, this._downloadFile, result);
    }
  }
  async listBlogPosts() {
    if (this.processError) {
      try {
        const result = await this.actor.listBlogPosts();
        return from_candid_vec_n33(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.listBlogPosts();
      return from_candid_vec_n33(this._uploadFile, this._downloadFile, result);
    }
  }
  async listMyOrders() {
    if (this.processError) {
      try {
        const result = await this.actor.listMyOrders();
        return from_candid_vec_n34(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.listMyOrders();
      return from_candid_vec_n34(this._uploadFile, this._downloadFile, result);
    }
  }
  async listProducts() {
    if (this.processError) {
      try {
        const result = await this.actor.listProducts();
        return from_candid_vec_n58(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.listProducts();
      return from_candid_vec_n58(this._uploadFile, this._downloadFile, result);
    }
  }
  async listReviewsByProduct(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.listReviewsByProduct(arg0);
        return from_candid_vec_n68(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.listReviewsByProduct(arg0);
      return from_candid_vec_n68(this._uploadFile, this._downloadFile, result);
    }
  }
  async lookupPincode(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.lookupPincode(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.lookupPincode(arg0);
      return result;
    }
  }
  async removeAddress(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.removeAddress(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.removeAddress(arg0);
      return result;
    }
  }
  async saveCallerUserProfile(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.saveCallerUserProfile(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.saveCallerUserProfile(arg0);
      return result;
    }
  }
  async transform(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.transform(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.transform(arg0);
      return result;
    }
  }
  async updatePaymentStatus(arg0, arg1, arg2) {
    if (this.processError) {
      try {
        const result = await this.actor.updatePaymentStatus(arg0, to_candid_PaymentStatus_n69(this._uploadFile, this._downloadFile, arg1), to_candid_opt_n71(this._uploadFile, this._downloadFile, arg2));
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.updatePaymentStatus(arg0, to_candid_PaymentStatus_n69(this._uploadFile, this._downloadFile, arg1), to_candid_opt_n71(this._uploadFile, this._downloadFile, arg2));
      return result;
    }
  }
}
async function from_candid_Banner_n9(_uploadFile, _downloadFile, value) {
  return await from_candid_record_n10(_uploadFile, _downloadFile, value);
}
async function from_candid_BlogPost_n16(_uploadFile, _downloadFile, value) {
  return await from_candid_record_n17(_uploadFile, _downloadFile, value);
}
function from_candid_BlogStatus_n18(_uploadFile, _downloadFile, value) {
  return from_candid_variant_n19(_uploadFile, _downloadFile, value);
}
async function from_candid_ExternalBlob_n11(_uploadFile, _downloadFile, value) {
  return await _downloadFile(value);
}
function from_candid_InvoiceData_n63(_uploadFile, _downloadFile, value) {
  return from_candid_record_n64(_uploadFile, _downloadFile, value);
}
function from_candid_OrderStatus_n41(_uploadFile, _downloadFile, value) {
  return from_candid_variant_n42(_uploadFile, _downloadFile, value);
}
function from_candid_Order_n35(_uploadFile, _downloadFile, value) {
  return from_candid_record_n36(_uploadFile, _downloadFile, value);
}
function from_candid_PaymentMethod_n39(_uploadFile, _downloadFile, value) {
  return from_candid_variant_n40(_uploadFile, _downloadFile, value);
}
function from_candid_PaymentStatus_n37(_uploadFile, _downloadFile, value) {
  return from_candid_variant_n38(_uploadFile, _downloadFile, value);
}
function from_candid_ProductCategory_n31(_uploadFile, _downloadFile, value) {
  return from_candid_variant_n32(_uploadFile, _downloadFile, value);
}
function from_candid_ProductStatus_n29(_uploadFile, _downloadFile, value) {
  return from_candid_variant_n30(_uploadFile, _downloadFile, value);
}
async function from_candid_Product_n27(_uploadFile, _downloadFile, value) {
  return await from_candid_record_n28(_uploadFile, _downloadFile, value);
}
async function from_candid_Review_n56(_uploadFile, _downloadFile, value) {
  return await from_candid_record_n57(_uploadFile, _downloadFile, value);
}
function from_candid_UserRole_n60(_uploadFile, _downloadFile, value) {
  return from_candid_variant_n61(_uploadFile, _downloadFile, value);
}
function from_candid__ImmutableObjectStorageRefillResult_n4(_uploadFile, _downloadFile, value) {
  return from_candid_record_n5(_uploadFile, _downloadFile, value);
}
async function from_candid_opt_n20(_uploadFile, _downloadFile, value) {
  return value.length === 0 ? null : await from_candid_ExternalBlob_n11(_uploadFile, _downloadFile, value[0]);
}
function from_candid_opt_n43(_uploadFile, _downloadFile, value) {
  return value.length === 0 ? null : value[0];
}
function from_candid_opt_n44(_uploadFile, _downloadFile, value) {
  return value.length === 0 ? null : value[0];
}
async function from_candid_opt_n45(_uploadFile, _downloadFile, value) {
  return value.length === 0 ? null : await from_candid_BlogPost_n16(_uploadFile, _downloadFile, value[0]);
}
function from_candid_opt_n59(_uploadFile, _downloadFile, value) {
  return value.length === 0 ? null : value[0];
}
function from_candid_opt_n6(_uploadFile, _downloadFile, value) {
  return value.length === 0 ? null : value[0];
}
function from_candid_opt_n62(_uploadFile, _downloadFile, value) {
  return value.length === 0 ? null : from_candid_InvoiceData_n63(_uploadFile, _downloadFile, value[0]);
}
function from_candid_opt_n65(_uploadFile, _downloadFile, value) {
  return value.length === 0 ? null : from_candid_Order_n35(_uploadFile, _downloadFile, value[0]);
}
async function from_candid_opt_n66(_uploadFile, _downloadFile, value) {
  return value.length === 0 ? null : await from_candid_Product_n27(_uploadFile, _downloadFile, value[0]);
}
function from_candid_opt_n7(_uploadFile, _downloadFile, value) {
  return value.length === 0 ? null : value[0];
}
async function from_candid_record_n10(_uploadFile, _downloadFile, value) {
  return {
    id: value.id,
    name: value.name,
    createdAt: value.createdAt,
    image: await from_candid_ExternalBlob_n11(_uploadFile, _downloadFile, value.image)
  };
}
async function from_candid_record_n17(_uploadFile, _downloadFile, value) {
  return {
    id: value.id,
    status: from_candid_BlogStatus_n18(_uploadFile, _downloadFile, value.status),
    title: value.title,
    content: value.content,
    createdAt: value.createdAt,
    slug: value.slug,
    author: value.author,
    coverImage: record_opt_to_undefined(await from_candid_opt_n20(_uploadFile, _downloadFile, value.coverImage)),
    updatedAt: value.updatedAt,
    excerpt: value.excerpt,
    category: value.category
  };
}
async function from_candid_record_n28(_uploadFile, _downloadFile, value) {
  return {
    id: value.id,
    status: from_candid_ProductStatus_n29(_uploadFile, _downloadFile, value.status),
    name: value.name,
    createdAt: value.createdAt,
    description: value.description,
    stock: value.stock,
    isBestseller: value.isBestseller,
    category: from_candid_ProductCategory_n31(_uploadFile, _downloadFile, value.category),
    isNew: value.isNew,
    price: value.price,
    image1: record_opt_to_undefined(await from_candid_opt_n20(_uploadFile, _downloadFile, value.image1)),
    image2: record_opt_to_undefined(await from_candid_opt_n20(_uploadFile, _downloadFile, value.image2)),
    image3: record_opt_to_undefined(await from_candid_opt_n20(_uploadFile, _downloadFile, value.image3)),
    image4: record_opt_to_undefined(await from_candid_opt_n20(_uploadFile, _downloadFile, value.image4)),
    image5: record_opt_to_undefined(await from_candid_opt_n20(_uploadFile, _downloadFile, value.image5)),
    image6: record_opt_to_undefined(await from_candid_opt_n20(_uploadFile, _downloadFile, value.image6))
  };
}
function from_candid_record_n36(_uploadFile, _downloadFile, value) {
  return {
    id: value.id,
    paymentStatus: from_candid_PaymentStatus_n37(_uploadFile, _downloadFile, value.paymentStatus),
    paymentMethod: from_candid_PaymentMethod_n39(_uploadFile, _downloadFile, value.paymentMethod),
    codSurcharge: value.codSurcharge,
    customer: value.customer,
    orderStatus: from_candid_OrderStatus_n41(_uploadFile, _downloadFile, value.orderStatus),
    userId: record_opt_to_undefined(from_candid_opt_n43(_uploadFile, _downloadFile, value.userId)),
    createdAt: value.createdAt,
    gstAmount: value.gstAmount,
    razorpayOrderId: record_opt_to_undefined(from_candid_opt_n44(_uploadFile, _downloadFile, value.razorpayOrderId)),
    totalAmount: value.totalAmount,
    items: value.items,
    subtotal: value.subtotal
  };
}
function from_candid_record_n5(_uploadFile, _downloadFile, value) {
  return {
    success: record_opt_to_undefined(from_candid_opt_n6(_uploadFile, _downloadFile, value.success)),
    topped_up_amount: record_opt_to_undefined(from_candid_opt_n7(_uploadFile, _downloadFile, value.topped_up_amount))
  };
}
async function from_candid_record_n57(_uploadFile, _downloadFile, value) {
  return {
    id: value.id,
    userId: value.userId,
    createdAt: value.createdAt,
    text: value.text,
    productId: value.productId,
    rating: value.rating,
    image1: record_opt_to_undefined(await from_candid_opt_n20(_uploadFile, _downloadFile, value.image1)),
    image2: record_opt_to_undefined(await from_candid_opt_n20(_uploadFile, _downloadFile, value.image2)),
    image3: record_opt_to_undefined(await from_candid_opt_n20(_uploadFile, _downloadFile, value.image3))
  };
}
function from_candid_record_n64(_uploadFile, _downloadFile, value) {
  return {
    paymentStatus: from_candid_PaymentStatus_n37(_uploadFile, _downloadFile, value.paymentStatus),
    paymentMethod: from_candid_PaymentMethod_n39(_uploadFile, _downloadFile, value.paymentMethod),
    codSurcharge: value.codSurcharge,
    customer: value.customer,
    gstNumber: value.gstNumber,
    orderDate: value.orderDate,
    gstAmount: value.gstAmount,
    orderId: value.orderId,
    totalAmount: value.totalAmount,
    companyName: value.companyName,
    items: value.items,
    companyAddress: value.companyAddress,
    subtotal: value.subtotal
  };
}
function from_candid_variant_n19(_uploadFile, _downloadFile, value) {
  return "published" in value ? "published" : "draft" in value ? "draft" : value;
}
function from_candid_variant_n30(_uploadFile, _downloadFile, value) {
  return "active" in value ? "active" : "inactive" in value ? "inactive" : value;
}
function from_candid_variant_n32(_uploadFile, _downloadFile, value) {
  return "Skincare" in value ? "Skincare" : "Haircare" in value ? "Haircare" : "Makeup" in value ? "Makeup" : value;
}
function from_candid_variant_n38(_uploadFile, _downloadFile, value) {
  return "Failed" in value ? "Failed" : "Refunded" in value ? "Refunded" : "Paid" in value ? "Paid" : "Pending" in value ? "Pending" : value;
}
function from_candid_variant_n40(_uploadFile, _downloadFile, value) {
  return "COD" in value ? "COD" : "Razorpay" in value ? "Razorpay" : value;
}
function from_candid_variant_n42(_uploadFile, _downloadFile, value) {
  return "Delivered" in value ? "Delivered" : "Cancelled" in value ? "Cancelled" : "Shipped" in value ? "Shipped" : "Pending" in value ? "Pending" : value;
}
function from_candid_variant_n61(_uploadFile, _downloadFile, value) {
  return "admin" in value ? "admin" : "user" in value ? "user" : "guest" in value ? "guest" : value;
}
async function from_candid_vec_n33(_uploadFile, _downloadFile, value) {
  return await Promise.all(value.map(async (x) => await from_candid_BlogPost_n16(_uploadFile, _downloadFile, x)));
}
function from_candid_vec_n34(_uploadFile, _downloadFile, value) {
  return value.map((x) => from_candid_Order_n35(_uploadFile, _downloadFile, x));
}
async function from_candid_vec_n58(_uploadFile, _downloadFile, value) {
  return await Promise.all(value.map(async (x) => await from_candid_Product_n27(_uploadFile, _downloadFile, x)));
}
async function from_candid_vec_n67(_uploadFile, _downloadFile, value) {
  return await Promise.all(value.map(async (x) => await from_candid_Banner_n9(_uploadFile, _downloadFile, x)));
}
async function from_candid_vec_n68(_uploadFile, _downloadFile, value) {
  return await Promise.all(value.map(async (x) => await from_candid_Review_n56(_uploadFile, _downloadFile, x)));
}
async function to_candid_BlogInput_n12(_uploadFile, _downloadFile, value) {
  return await to_candid_record_n13(_uploadFile, _downloadFile, value);
}
function to_candid_BlogStatus_n14(_uploadFile, _downloadFile, value) {
  return to_candid_variant_n15(_uploadFile, _downloadFile, value);
}
async function to_candid_ExternalBlob_n8(_uploadFile, _downloadFile, value) {
  return await _uploadFile(value);
}
function to_candid_OrderInput_n50(_uploadFile, _downloadFile, value) {
  return to_candid_record_n51(_uploadFile, _downloadFile, value);
}
function to_candid_OrderStatus_n46(_uploadFile, _downloadFile, value) {
  return to_candid_variant_n47(_uploadFile, _downloadFile, value);
}
function to_candid_PaymentMethod_n52(_uploadFile, _downloadFile, value) {
  return to_candid_variant_n53(_uploadFile, _downloadFile, value);
}
function to_candid_PaymentStatus_n69(_uploadFile, _downloadFile, value) {
  return to_candid_variant_n70(_uploadFile, _downloadFile, value);
}
function to_candid_ProductCategory_n25(_uploadFile, _downloadFile, value) {
  return to_candid_variant_n26(_uploadFile, _downloadFile, value);
}
async function to_candid_ProductInput_n21(_uploadFile, _downloadFile, value) {
  return await to_candid_record_n22(_uploadFile, _downloadFile, value);
}
function to_candid_ProductStatus_n23(_uploadFile, _downloadFile, value) {
  return to_candid_variant_n24(_uploadFile, _downloadFile, value);
}
async function to_candid_ReviewInput_n54(_uploadFile, _downloadFile, value) {
  return await to_candid_record_n55(_uploadFile, _downloadFile, value);
}
function to_candid_UserRole_n48(_uploadFile, _downloadFile, value) {
  return to_candid_variant_n49(_uploadFile, _downloadFile, value);
}
function to_candid__ImmutableObjectStorageRefillInformation_n2(_uploadFile, _downloadFile, value) {
  return to_candid_record_n3(_uploadFile, _downloadFile, value);
}
function to_candid_opt_n1(_uploadFile, _downloadFile, value) {
  return value === null ? candid_none() : candid_some(to_candid__ImmutableObjectStorageRefillInformation_n2(_uploadFile, _downloadFile, value));
}
function to_candid_opt_n71(_uploadFile, _downloadFile, value) {
  return value === null ? candid_none() : candid_some(value);
}
async function to_candid_record_n13(_uploadFile, _downloadFile, value) {
  return {
    status: to_candid_BlogStatus_n14(_uploadFile, _downloadFile, value.status),
    title: value.title,
    content: value.content,
    slug: value.slug,
    author: value.author,
    coverImage: value.coverImage ? candid_some(await to_candid_ExternalBlob_n8(_uploadFile, _downloadFile, value.coverImage)) : candid_none(),
    excerpt: value.excerpt,
    category: value.category
  };
}
async function to_candid_record_n22(_uploadFile, _downloadFile, value) {
  return {
    status: to_candid_ProductStatus_n23(_uploadFile, _downloadFile, value.status),
    name: value.name,
    description: value.description,
    stock: value.stock,
    isBestseller: value.isBestseller,
    category: to_candid_ProductCategory_n25(_uploadFile, _downloadFile, value.category),
    isNew: value.isNew,
    price: value.price,
    image1: value.image1 ? candid_some(await to_candid_ExternalBlob_n8(_uploadFile, _downloadFile, value.image1)) : candid_none(),
    image2: value.image2 ? candid_some(await to_candid_ExternalBlob_n8(_uploadFile, _downloadFile, value.image2)) : candid_none(),
    image3: value.image3 ? candid_some(await to_candid_ExternalBlob_n8(_uploadFile, _downloadFile, value.image3)) : candid_none(),
    image4: value.image4 ? candid_some(await to_candid_ExternalBlob_n8(_uploadFile, _downloadFile, value.image4)) : candid_none(),
    image5: value.image5 ? candid_some(await to_candid_ExternalBlob_n8(_uploadFile, _downloadFile, value.image5)) : candid_none(),
    image6: value.image6 ? candid_some(await to_candid_ExternalBlob_n8(_uploadFile, _downloadFile, value.image6)) : candid_none()
  };
}
function to_candid_record_n3(_uploadFile, _downloadFile, value) {
  return {
    proposed_top_up_amount: value.proposed_top_up_amount ? candid_some(value.proposed_top_up_amount) : candid_none()
  };
}
function to_candid_record_n51(_uploadFile, _downloadFile, value) {
  return {
    paymentMethod: to_candid_PaymentMethod_n52(_uploadFile, _downloadFile, value.paymentMethod),
    customer: value.customer,
    razorpayOrderId: value.razorpayOrderId ? candid_some(value.razorpayOrderId) : candid_none(),
    items: value.items
  };
}
async function to_candid_record_n55(_uploadFile, _downloadFile, value) {
  return {
    text: value.text,
    productId: value.productId,
    rating: value.rating,
    image1: value.image1 ? candid_some(await to_candid_ExternalBlob_n8(_uploadFile, _downloadFile, value.image1)) : candid_none(),
    image2: value.image2 ? candid_some(await to_candid_ExternalBlob_n8(_uploadFile, _downloadFile, value.image2)) : candid_none(),
    image3: value.image3 ? candid_some(await to_candid_ExternalBlob_n8(_uploadFile, _downloadFile, value.image3)) : candid_none()
  };
}
function to_candid_variant_n15(_uploadFile, _downloadFile, value) {
  return value == "published" ? {
    published: null
  } : value == "draft" ? {
    draft: null
  } : value;
}
function to_candid_variant_n24(_uploadFile, _downloadFile, value) {
  return value == "active" ? {
    active: null
  } : value == "inactive" ? {
    inactive: null
  } : value;
}
function to_candid_variant_n26(_uploadFile, _downloadFile, value) {
  return value == "Skincare" ? {
    Skincare: null
  } : value == "Haircare" ? {
    Haircare: null
  } : value == "Makeup" ? {
    Makeup: null
  } : value;
}
function to_candid_variant_n47(_uploadFile, _downloadFile, value) {
  return value == "Delivered" ? {
    Delivered: null
  } : value == "Cancelled" ? {
    Cancelled: null
  } : value == "Shipped" ? {
    Shipped: null
  } : value == "Pending" ? {
    Pending: null
  } : value;
}
function to_candid_variant_n49(_uploadFile, _downloadFile, value) {
  return value == "admin" ? {
    admin: null
  } : value == "user" ? {
    user: null
  } : value == "guest" ? {
    guest: null
  } : value;
}
function to_candid_variant_n53(_uploadFile, _downloadFile, value) {
  return value == "COD" ? {
    COD: null
  } : value == "Razorpay" ? {
    Razorpay: null
  } : value;
}
function to_candid_variant_n70(_uploadFile, _downloadFile, value) {
  return value == "Failed" ? {
    Failed: null
  } : value == "Refunded" ? {
    Refunded: null
  } : value == "Paid" ? {
    Paid: null
  } : value == "Pending" ? {
    Pending: null
  } : value;
}
function createActor(canisterId, _uploadFile, _downloadFile, options = {}) {
  const agent = options.agent || HttpAgent.createSync({
    ...options.agentOptions
  });
  if (options.agent && options.agentOptions) {
    console.warn("Detected both agent and agentOptions passed to createActor. Ignoring agentOptions and proceeding with the provided agent.");
  }
  const actor = Actor.createActor(idlFactory, {
    agent,
    canisterId,
    ...options.actorOptions
  });
  return new Backend(actor, _uploadFile, _downloadFile, options.processError);
}
export {
  BlogStatus as B,
  OrderStatus as O,
  PaymentMethod as P,
  PaymentStatus as a,
  createActor as c,
  useActor as u
};
