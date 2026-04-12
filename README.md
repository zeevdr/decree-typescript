# OpenDecree TypeScript SDK

[![CI](https://github.com/zeevdr/decree-typescript/actions/workflows/ci.yml/badge.svg)](https://github.com/zeevdr/decree-typescript/actions/workflows/ci.yml)
[![npm](https://img.shields.io/npm/v/@opendecree/sdk)](https://www.npmjs.com/package/@opendecree/sdk)
[![Node](https://img.shields.io/node/v/@opendecree/sdk)](https://www.npmjs.com/package/@opendecree/sdk)
[![License](https://img.shields.io/github/license/zeevdr/decree-typescript)](LICENSE)

TypeScript SDK for [OpenDecree](https://github.com/zeevdr/decree) — schema-driven configuration management.

## Install

```bash
npm install @opendecree/sdk
```

## Quick Start

```typescript
import { ConfigClient } from '@opendecree/sdk';

const client = new ConfigClient('localhost:9090', { subject: 'myapp' });
try {
  // Get config values (default: string)
  const fee = await client.get('tenant-id', 'payments.fee');

  // Typed gets via runtime converters
  const retries = await client.get('tenant-id', 'payments.retries', Number);
  const enabled = await client.get('tenant-id', 'payments.enabled', Boolean);

  // Set values
  await client.set('tenant-id', 'payments.fee', '0.5%');
} finally {
  client.close();
}
```

## Watch for Changes

```typescript
import { ConfigClient } from '@opendecree/sdk';

const client = new ConfigClient('localhost:9090', { subject: 'myapp' });
const watcher = client.watch('tenant-id');

const fee = watcher.field('payments.fee', Number, { default: 0.01 });
const enabled = watcher.field('payments.enabled', Boolean, { default: false });

await watcher.start();

fee.on('change', (oldVal, newVal) => {
  console.log(`Fee changed: ${oldVal} → ${newVal}`);
});

// Or async iteration
for await (const change of fee) {
  console.log(change);
}
```

## Requirements

- Node.js 20+
- A running OpenDecree server (v0.3.0+)

## License

Apache License 2.0 — see [LICENSE](LICENSE).
