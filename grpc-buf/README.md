## Using protobuf-es To Generate Code Necessary To Work With Protocol Buffers

When using with [gRPC](https://grpc.io/), code will need to be generated to work with protocol buffers (protobufs). This example uses [protobuf-es](https://github.com/bufbuild/protobuf-es) to generate the code.

After cloning this repository, change into `grpc-buf`.

## Getting Started

Install the packages with the following command:
```
$ npm install
```

A `.proto` file will need to be created first to define the structure of the data. An example has been created in `proto/candy.proto`.

After a `.proto` file has been created, the code can be generated. The following script has been added to the `package.json` to generate the code for any `.proto` file in `/proto`:
```
$ npm run protoc
```

This will create a `_pb.ts` file in `/src/gen` with the generated code.
