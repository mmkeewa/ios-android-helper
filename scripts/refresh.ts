/**
 * Checks every URL in sources.yaml against a hash cache, returns drift report.
 * Reusable from a Next.js API route, a CLI, or a GitHub Action.
 *
 * Usage as a library:
 *   import { runRefresh } from 'ios-android-helper/scripts/refresh';
 *   const report = await runRefresh({ rootDir: './content/ios-android' });
 *
 * Usage as a CLI:
 *   npx tsx scripts/refresh.ts
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';

export interface RefreshResult {
  url: string;
  status: 'unchanged' | 'changed' | 'new' | 'error';
  error?: string;
}

export interface RefreshReport {
  checked: number;
  changed: number;
  results: RefreshResult[];
}

function extractUrls(yaml: string): string[] {
  return yaml
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l.startsWith('- http'))
    .map((l) => l.slice(2).trim());
}

export async function runRefresh(opts: { rootDir: string }): Promise<RefreshReport> {
  const sourcesPath = path.join(opts.rootDir, 'sources.yaml');
  const cachePath = path.join(opts.rootDir, '.cache', 'hashes.json');

  const yaml = await fs.readFile(sourcesPath, 'utf8');
  const urls = extractUrls(yaml);

  let cache: Record<string, { hash: string; checkedAt: string }> = {};
  try {
    cache = JSON.parse(await fs.readFile(cachePath, 'utf8'));
  } catch {
    /* first run */
  }

  const results: RefreshResult[] = [];

  for (const url of urls) {
    try {
      const res = await fetch(url, { headers: { 'user-agent': 'ios-android-helper-refresh' } });
      if (!res.ok) {
        results.push({ url, status: 'error', error: `HTTP ${res.status}` });
        continue;
      }
      const text = await res.text();
      const hash = crypto.createHash('sha256').update(text).digest('hex');
      const prev = cache[url];
      const status = !prev ? 'new' : prev.hash === hash ? 'unchanged' : 'changed';
      cache[url] = { hash, checkedAt: new Date().toISOString() };
      results.push({ url, status });
    } catch (e) {
      results.push({ url, status: 'error', error: (e as Error).message });
    }
  }

  await fs.mkdir(path.dirname(cachePath), { recursive: true });
  await fs.writeFile(cachePath, JSON.stringify(cache, null, 2));

  return {
    checked: results.length,
    changed: results.filter((r) => r.status === 'changed').length,
    results,
  };
}

// CLI entrypoint
if (import.meta.url === `file://${process.argv[1]}`) {
  const rootDir = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
  runRefresh({ rootDir })
    .then((report) => {
      console.log(JSON.stringify(report, null, 2));
      process.exit(report.results.some((r) => r.status === 'error') ? 1 : 0);
    })
    .catch((e) => {
      console.error(e);
      process.exit(1);
    });
}
