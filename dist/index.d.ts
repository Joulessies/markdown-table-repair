/**
 * Repairs broken Markdown tables in the provided string.
 * Handles missing pipes, mismatched columns, incomplete separator rows,
 * and partial tables from streaming AI responses.
 *
 * @param input - The Markdown string containing potentially broken tables.
 * @returns The Markdown string with all tables repaired.
 *
 * @example
 * ```ts
 * import { repairTable } from 'markdown-table-repair';
 *
 * const broken = `| Name | Age
 * | Alice | 25
 * | Bob`;
 *
 * const fixed = repairTable(broken);
 * // Returns properly formatted table with all pipes closed
 * ```
 */
export declare function repairTable(input: string): string;

export default repairTable;
