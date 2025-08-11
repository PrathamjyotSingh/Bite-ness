# 🍽️ Bite-ness
A TikTok-style short-video app for discovering nearby food spots.

## Overview
Bite-ness combines the fun of short-form videos with local restaurant discovery.  
Users can scroll through vertical food clips, view restaurant details, and seamlessly move from "watch" to "visit" or "order."

## Features
- 🎥 Vertical short-video feed
- 📍 Location-based recommendations
- 🍜 Restaurant details overlay
- 🔍 Search & filters (cuisine, price, open now)
- ❤️ Likes, comments, and bookmarks
- 📤 Upload videos for restaurants or dishes

## Tech Stack
- **Frontend:** React Native (Expo) / Flutter
- **Backend:** Node.js + Express / FastAPI
- **Database:** PostgreSQL + PostGIS
- **Storage:** AWS S3 / GCP Storage
- **Other:** Firebase Auth, FFmpeg, CDN for video delivery

## Getting Started
```bash
# Clone the repo
git clone https://github.com/yourusername/bite-ness.git
cd bite-ness

# Install dependencies
cd app && npm install
cd ../backend && npm install
