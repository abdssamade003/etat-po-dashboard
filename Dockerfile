# Use nginx lightweight web server
FROM nginx:alpine

# Remove default nginx page
RUN rm -rf /usr/share/nginx/html/*

# Copy your HTML application
COPY Dongfeng-Parts-AI-preview_1.html /usr/share/nginx/html/index.html

# Expose HTTP port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
