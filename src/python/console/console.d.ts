import type { Item } from "$lib/components/console/HeadlessConsole.svelte";
import type { PyProxy } from "pyodide/ffi";

export class Result<T> {
  status: "complete" | "incomplete" | "syntax-error";
  future: Promise<T>;
  formatted_error?: string;
  async get_repr(): Promise<string | undefined>;
}

class EnhancedConsole {
  stdout_callback(out: string);
  stderr_callback(err: string);
}

export class ConsoleAPI extends PyProxy {
  complete(source: string): [string[], number];
  console: EnhancedConsole;
  get_items(): Item[];
  push(line: string): Result<any>;
  pop(): void;
}
