FROM node:alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /src/app

COPY package.json package-lock.json ./
RUN  npm install --production

FROM node:alpine AS builder
WORKDIR /src/app
COPY --from=deps /src/app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

FROM node:alpine AS runner
WORKDIR /src/app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /src/app/.next ./.next
COPY --from=builder /src/app/node_modules ./node_modules
COPY --from=builder /src/app/package.json ./package.json
COPY --from=builder /src/app/public ./public

USER nextjs

EXPOSE 5173

ENV PORT 5173

CMD ["npm", "start"]
