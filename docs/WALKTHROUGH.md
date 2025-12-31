# Deployment Walkthrough - Llama 3.3 70B for MTM

The system has been successfully migrated to **Ollama** to ensure native performance on your NVIDIA GB10 Grace Blackwell server.

## Hardware Analysis: GB10 vs Llama 3.3 70B

Your server specifications are ideal for this workload:
- **Server**: NVIDIA GB10 (Grace Blackwell Superchip)
- **Memory**: 128 GB Unified Memory
- **Model Size**: Llama 3.3 70B (4-bit Quantized) ≈ **39-43 GB** system memory.

**Verdict**: ✅ **Perfect Fit**. 
The model will occupy roughly 35-40% of your total unified memory, leaving ample room (80GB+) for the system, long context windows (KV cache), and concurrent users. You do not need to do anything manually; Ollama automatically uses the optimized 4-bit quantization which allows this 70B model to run blazing fast on your hardware.

## Deployment Steps

1.  **Pull Updates**:
    ```bash
    git pull origin main
    ```

2.  **Start Services**:
    ```bash
    docker compose up --build -d
    ```
    *First-time startup note*: The `mtm-model-puller` container will automatically start downloading the 40GB model file. This runs in the background.

3.  **Access Interface**:
    - **URL**: `http://<YOUR_IP>:3000`
    - The interface is now connected to the local `llama3.3:70b` model.

## Interface Features
- **Premium Design**: Dark, glassmorphic UI branded for MTM.
- **Thought Process**: Hidden by default but expandable for deep reasoning data (supported by future reasoning models).
- **Status Indicator**: Shows "Llama 3.3 70B Online" when connected.
