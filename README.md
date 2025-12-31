# GPT-OSS-20B for Medya Takip Merkezi (MTM)

This project provides a premium web interface and an optimized inference backend for the OpenAI `gpt-oss-20b` model, specifically designed for NVIDIA Grace Blackwell (GB10) servers.

## Features
- **MTM Premium UI**: Glassmorphic, modern chat interface with "Düşünce Süreci" (thought process) support.
- **vLLM Inference**: Optimized for Blackwell architecture with MXFP4 quantization support.
- **Harmony Format**: Native handling of the harmony response format.
- **Dockerized**: Easy deployment with Docker Compose.

## Hardware Requirements
- NVIDIA GB10 (Grace Blackwell) or any GPU with 16GB+ VRAM (for MXFP4).
- 128GB Unified Memory (optimized path).

## Quick Start

1. **Clone the project** to your local environment.
2. **Transfer to Server**: Copy the project folder to your GB10 server.
3. **Run with Docker Compose**:
   ```bash
   docker compose up --build -d
   ```

## Local Network Access
Once the containers are running, people in your local network can access the MTM interface via:
- **URL**: `http://<YOUR_SERVER_IP>:3000`

Replace `<YOUR_SERVER_IP>` with the actual IP address of your Grace Blackwell server (e.g., `192.168.1.50`).

## Optimization Notes
- **vLLM Engine**: Configured with `--gpu-memory-utilization 0.95` and optimized for Blackwell kernels.
- **Quantization**: Uses native MXFP4 support for the MoE weights as per OpenAI's design.
- **Unified Memory**: The backend is configured to leverage the High Bandwidth Memory of the GB10 for maximum token throughput.

## Environment Variables
- `VITE_API_URL`: The URL of the vLLM API (default: `http://localhost:8000/v1`).

---
Developed for **Medya Takip Merkezi (MTM)**.
