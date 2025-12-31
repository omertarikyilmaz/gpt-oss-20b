# Medya Takip Merkezi (MTM) - Llama 3.3 70B Service

This project provides a premium, AI-powered chat interface for MTM, powered by the **Llama 3.3 70B** model running on **Ollama**. Optimized for NVIDIA Grace Blackwell (ARM64) architecture.

## Features
- **MTM Premium UI**: Glassmorphic, modern chat interface with "Düşünce Süreci" (thought process) support.
- **Llama 3.3 70B**: State-of-the-art open model with massive 70B parameter reasoning capabilities.
- **ARM64 Native**: Powered by Ollama, fully compatible with Grace CPU and NVIDIA GPU.
- **Dockerized**: Easy deployment with Docker Compose.

## Quick Start

1. **Clone the project** to your local environment.
2. **Transfer to Server**: Copy the project folder to your server.
3. **Run with Docker Compose**:
   ```bash
   docker compose up --build -d
   ```
   *Note: On first run, it will automatically download the Llama 3.3 70B model (approx. 40GB). This may take some time depending on internet speed.*

## Access
- **URL**: `http://<YOUR_SERVER_IP>:3000`

## Architecture
- **Backend**: Ollama serving `llama3.3:70b` at port 11434.
- **Frontend**: Vite + React served via Nginx at port 3000.
