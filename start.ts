import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';

const execAsync = promisify(exec);

async function checkPort(port: number): Promise<boolean> {
  try {
    const { stdout } = await execAsync(`netstat -ano | findstr :${port}`);
    return stdout.length > 0;
  } catch (error) {
    return false;
  }
}

async function killProcessOnPort(port: number): Promise<void> {
  try {
    const { stdout } = await execAsync(`netstat -ano | findstr :${port}`);
    const match = stdout.match(/LISTENING\s+(\d+)/);
    if (match) {
      const pid = match[1];
      await execAsync(`taskkill /F /PID ${pid}`);
      console.log(`Killed process ${pid} using port ${port}`);
    }
  } catch (error) {
    console.error(`Error killing process on port ${port}:`, error);
  }
}

async function start() {
  try {
    // Check and free port 3000 if needed
    if (await checkPort(3000)) {
      console.log('Port 3000 is in use, attempting to free it...');
      await killProcessOnPort(3000);
    }

    // Generate SSL certificates
    console.log('Generating SSL certificates...');
    await execAsync('node src/lib/generateCert.mjs');
    console.log('SSL certificates generated successfully');

    // Start webhook server
    console.log('Starting webhook server...');
    const webhookServer = exec('node src/lib/webhookServer.ts');
    webhookServer.stdout?.on('data', (data) => console.log(data));
    webhookServer.stderr?.on('data', (data) => console.error(data));

    // Start Next.js development server
    console.log('Starting Next.js development server...');
    const nextServer = exec('npm run dev');
    nextServer.stdout?.on('data', (data) => console.log(data));
    nextServer.stderr?.on('data', (data) => console.error(data));

    // Handle process termination
    process.on('SIGINT', () => {
      console.log('Shutting down...');
      webhookServer.kill();
      nextServer.kill();
      process.exit(0);
    });

  } catch (error) {
    console.error('Error starting application:', error);
    process.exit(1);
  }
}

start(); 