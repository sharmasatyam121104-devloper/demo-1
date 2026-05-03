# 🚀 EC2 + Node.js Backend + Nginx + Domain + SSL Setup Guide

This guide explains how to deploy a Node.js backend on AWS EC2, connect a custom domain, and secure it with SSL.

---

## 🟢 1. Launch EC2 Instance

* OS: Ubuntu
* Configure Security Group:

  * SSH (22) → My IP
  * HTTP (80) → Anywhere
  * HTTPS (443) → Anywhere

---

## 🔐 2. Connect to EC2 (Using PuTTY)

1. Convert `.pem` to `.ppk` using PuTTYgen
2. Open PuTTY
3. Enter:

```text
Host Name: ubuntu@<EC2-PUBLIC-IP>
```

4. Go to:

```text
Connection → SSH → Auth → Load .ppk file
```

5. Click **Open**

---

## ⚙️ 3. Update System

```bash
sudo apt update && sudo apt upgrade -y
```

---

## 🟩 4. Install Node.js (LTS)

```bash
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs
```

Verify:

```bash
node -v
npm -v
```

---

## 📦 5. Install Git

```bash
git --version
# If not installed:
sudo apt install git -y
```

---

## 📁 6. Clone Project

```bash
sudo mkdir -p /var/www/app
sudo chown -R ubuntu:ubuntu /var/www/app

cd /var/www
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>
```

---

## 📦 7. Install Dependencies

```bash
npm install
```

---

## 🔐 8. Create Environment File

```bash
nano .env
```

Example:

```
PORT=8080
MONGO_URI=your_mongodb_url
```

---

## ▶️ 9. Run Backend

```bash
node server.js
```

Test:

```
http://<EC2-PUBLIC-IP>:8080
```

---

## 🔁 10. Run with PM2

```bash
sudo npm install -g pm2
pm2 start server.js
pm2 save
pm2 startup
```

---

## 🌐 11. Install Nginx

```bash
sudo apt install nginx -y
sudo systemctl start nginx
sudo systemctl enable nginx
```

---

## ⚙️ 12. Configure Nginx

```bash
sudo nano /etc/nginx/sites-available/default
```

Paste:

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:8080;
    }
}
```

Restart:

```bash
sudo systemctl restart nginx
```

---

## 🌍 13. Domain Setup

* Point your domain to EC2 Public IP using DNS (A Record)

Example:

```
yourdomain.com → <EC2-IP>
www.yourdomain.com → <EC2-IP>
```

---

## 🔐 14. Install SSL (Certbot)

```bash
sudo apt install certbot python3-certbot-nginx -y
```

Run:

```bash
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

Steps:

* Enter Email
* Accept Terms (Y)
* Choose Redirect (Option 2)

---

## 🔄 15. Auto Renew SSL

Check timer:

```bash
systemctl list-timers | grep certbot
```

Test renewal:

```bash
sudo certbot renew --dry-run
```

---

## 🎉 Final Output

* https://yourdomain.com → Backend running
* SSL Enabled 🔒
* Auto-renew configured

---

## 🧠 Architecture Flow

Client → Domain → Nginx → Node.js (PM2) → Database

---

## 🔥 Notes

* Never commit `.env` to GitHub
* Use strong credentials
* Keep only required ports open

---

## 💡 Author

Satyam Sharma 🚀
