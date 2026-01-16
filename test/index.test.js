import { describe, it, expect } from 'vitest';
import { repairTable } from '../src/index.js';

describe('repairTable', () => {
    it('should return empty string for non-string input', () => {
        expect(repairTable(null)).toBe('');
        expect(repairTable(undefined)).toBe('');
        expect(repairTable(123)).toBe('');
    });

    it('should return input unchanged if no tables present', () => {
        const input = 'Hello world\nNo tables here';
        expect(repairTable(input)).toBe(input);
    });

    it('should add missing closing pipes', () => {
        const input = '| Name | Age\n| Alice | 25';
        const output = repairTable(input);
        expect(output).toContain('| Name | Age |');
        expect(output).toContain('| Alice | 25 |');
    });

    it('should add missing separator row', () => {
        const input = '| Header1 | Header2\n| Cell1 | Cell2';
        const output = repairTable(input);
        expect(output).toContain('| --- | --- |');
    });

    it('should normalize column counts', () => {
        const input = '| A | B | C\n|---\n| 1';
        const output = repairTable(input);
        const lines = output.split('\n');

        // All rows should have same number of pipes
        const pipeCount = (lines[0].match(/\|/g) || []).length;
        lines.forEach(line => {
            expect((line.match(/\|/g) || []).length).toBe(pipeCount);
        });
    });

    it('should handle incomplete separator row', () => {
        const input = '| Feature | Status\n|---\n| Test | ✅';
        const output = repairTable(input);
        expect(output).toContain('| --- | --- |');
    });

    it('should preserve non-table content', () => {
        const input = '# Title\n\n| A | B\n| 1 | 2\n\nParagraph here.';
        const output = repairTable(input);
        expect(output).toContain('# Title');
        expect(output).toContain('Paragraph here.');
    });

    it('should handle tables with alignment markers', () => {
        const input = '| Left | Center | Right\n|:---|:---:|---:|\n| A | B | C';
        const output = repairTable(input);
        expect(output).toContain('| Left | Center | Right |');
    });

    it('should handle streaming partial table', () => {
        const input = '| Name | Age\n| Alice';
        const output = repairTable(input);
        expect(output).toContain('| --- |');
        expect(output).toContain('| Alice |');
    });

    it('should handle multiple tables', () => {
        const input = '| A | B\n| 1 | 2\n\nText\n\n| X | Y\n| 3 | 4';
        const output = repairTable(input);
        expect(output).toContain('| A | B |');
        expect(output).toContain('| X | Y |');
    });
});
