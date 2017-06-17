FROM node:onbuild
RUN npm run build
EXPOSE 3000
