import { createMcpHandler, McpServer } from '@modelcontextprotocol/server';
import { registerSearchTool, registerSourceTools } from 'fumadocs-core/mcp';
import { createFromSource } from 'fumadocs-core/search/server';
import { docsLlms, source } from '@/lib/source';

const search = createFromSource(source, { language: 'english' });

const handler = createMcpHandler(() => {
  const mcp = new McpServer(
    { name: 'slopos-docs', version: '1.0.0' },
    // The tools never change, and a stream to watch them would hold a
    // serverless function open.
    { capabilities: { tools: { listChanged: false } } },
  );

  registerSourceTools(mcp, source, docsLlms);
  registerSearchTool(mcp, search);

  return mcp;
});

export function GET(request: Request) {
  return handler.fetch(request);
}

export function POST(request: Request) {
  return handler.fetch(request);
}

export function DELETE(request: Request) {
  return handler.fetch(request);
}
