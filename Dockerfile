FROM node:23.9.0 

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json tsconfig.json ./
RUN npm install --legacy-peer-deps

# Bundle app source
COPY . .

# Run your build process.
RUN npm run build



# FROM node:23.9.0-alpine as production

# WORKDIR /usr/src/app
# ENV NODE_ENV=production
# COPY --from=build /usr/src/app/dist ./dist
# COPY --from=build /usr/src/app/package*.json ./
# COPY --from=build /usr/src/app/node_modules ./node_modules
# COPY --from=build /usr/src/app/tsconfig.json ./
# # COPY --from=build /usr/src/app/public ./public


# Expose the port the app runs on
EXPOSE 3000

# Start the app
CMD ["npm", "run", "dev"]

