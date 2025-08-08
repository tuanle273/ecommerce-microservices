# Dependencies stage - this stage installs and caches dependencies
FROM node:18-alpine AS deps

WORKDIR /app

# Copy only package files to leverage Docker cache
COPY package.json ./

# Use npm instead of yarn for faster installation in Docker
RUN npm install --no-audit --prefer-offline

# Builder stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Add missing shadcn components if they don't exist
RUN npx shadcn@latest add button card table skeleton form input label --yes || true

# Build application
RUN npm run build

# Production stage - smaller image for production
FROM node:18-alpine AS runner

WORKDIR /app

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy only necessary files for production
COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Switch to non-root user
USER nextjs

EXPOSE 3000

# Healthcheck to verify the service is running
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 CMD wget --no-verbose --tries=1 --spider http://localhost:3000/ || exit 1

# Start the application
CMD ["node", "server.js"]
