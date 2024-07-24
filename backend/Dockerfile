# syntax=docker/dockerfile:1

ARG NODE_VERSION=20.15.1
FROM node:${NODE_VERSION}-alpine

ENV NODE_ENV=production
ENV JWT_SECRET=your_jwt_secret

WORKDIR /usr/src/app

# Download dependencies as a separate step to take advantage of Docker's caching.
# Leverage a cache mount to /root/.npm to speed up subsequent builds.
# Leverage bind mounts to package.json and package-lock.json to avoid having to copy them into
# this layer.
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev

# Copy the rest of the source files into the image.
COPY . .

# Ensure the node user owns the entire project directory
RUN chown -R node:node /usr/src/app && \
    chmod -R 755 /usr/src/app

# Run the application as a non-root user.
USER node

# Expose the port that the application listens on.
EXPOSE 3000

# Run the application.
CMD ["npm", "start"]
