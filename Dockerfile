ARG PACKAGES_IMAGE
FROM ${PACKAGES_IMAGE:-npm_packages} AS BUILDER

FROM node:14-alpine
WORKDIR /app
COPY --from=BUILDER /app/node_modules /app/node_modules/
COPY / /app/
RUN chmod +x entrypoint.production.sh
RUN npm run build
