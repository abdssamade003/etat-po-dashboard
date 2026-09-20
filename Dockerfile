FROM nginx:alpine

# Copie les fichiers statiques du dashboard
COPY index.html /usr/share/nginx/html/index.html
COPY Dongfeng-Logo__1_.png /usr/share/nginx/html/Dongfeng-Logo__1_.png

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
