/* eslint-disable */
import * as _m0 from "protobufjs/minimal";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

export const protobufPackage = "candy";

export interface CandyRequest {
  name: string;
  quantity: number;
  price: number;
}

export interface CandyResponse {
  message: string;
}

function createBaseCandyRequest(): CandyRequest {
  return { name: "", quantity: 0, price: 0 };
}

export const CandyRequest = {
  encode(message: CandyRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.quantity !== 0) {
      writer.uint32(16).int32(message.quantity);
    }
    if (message.price !== 0) {
      writer.uint32(29).float(message.price);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CandyRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCandyRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.name = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.quantity = reader.int32();
          continue;
        case 3:
          if (tag !== 29) {
            break;
          }

          message.price = reader.float();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CandyRequest {
    return {
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      quantity: isSet(object.quantity) ? globalThis.Number(object.quantity) : 0,
      price: isSet(object.price) ? globalThis.Number(object.price) : 0,
    };
  },

  toJSON(message: CandyRequest): unknown {
    const obj: any = {};
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.quantity !== 0) {
      obj.quantity = Math.round(message.quantity);
    }
    if (message.price !== 0) {
      obj.price = message.price;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CandyRequest>, I>>(base?: I): CandyRequest {
    return CandyRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CandyRequest>, I>>(object: I): CandyRequest {
    const message = createBaseCandyRequest();
    message.name = object.name ?? "";
    message.quantity = object.quantity ?? 0;
    message.price = object.price ?? 0;
    return message;
  },
};

function createBaseCandyResponse(): CandyResponse {
  return { message: "" };
}

export const CandyResponse = {
  encode(message: CandyResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.message !== "") {
      writer.uint32(10).string(message.message);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CandyResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCandyResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.message = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CandyResponse {
    return { message: isSet(object.message) ? globalThis.String(object.message) : "" };
  },

  toJSON(message: CandyResponse): unknown {
    const obj: any = {};
    if (message.message !== "") {
      obj.message = message.message;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CandyResponse>, I>>(base?: I): CandyResponse {
    return CandyResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CandyResponse>, I>>(object: I): CandyResponse {
    const message = createBaseCandyResponse();
    message.message = object.message ?? "";
    return message;
  },
};

export interface CandyService {
  GetCandy(request: Observable<CandyRequest>): Observable<CandyResponse>;
}

export const CandyServiceServiceName = "candy.CandyService";
export class CandyServiceClientImpl implements CandyService {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || CandyServiceServiceName;
    this.rpc = rpc;
    this.GetCandy = this.GetCandy.bind(this);
  }
  GetCandy(request: Observable<CandyRequest>): Observable<CandyResponse> {
    const data = request.pipe(map((request) => CandyRequest.encode(request).finish()));
    const result = this.rpc.bidirectionalStreamingRequest(this.service, "GetCandy", data);
    return result.pipe(map((data) => CandyResponse.decode(_m0.Reader.create(data))));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
  clientStreamingRequest(service: string, method: string, data: Observable<Uint8Array>): Promise<Uint8Array>;
  serverStreamingRequest(service: string, method: string, data: Uint8Array): Observable<Uint8Array>;
  bidirectionalStreamingRequest(service: string, method: string, data: Observable<Uint8Array>): Observable<Uint8Array>;
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
