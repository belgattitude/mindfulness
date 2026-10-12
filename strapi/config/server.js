export default ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS'),
  },
  // Built-in MCP server at /mcp (set MCP_ENABLED=true), authenticated with an admin API token (Bearer)
  mcp: {
    enabled: env.bool('MCP_ENABLED', false),
  },
  logger: {
    updates: {
      enabled: false,
    },
  },
});
