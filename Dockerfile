FROM oven/bun
COPY package.json package.json
RUN bun install
COPY . .
CMD [ "bun" , "index.js" ]